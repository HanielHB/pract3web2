const db = require("../models");
const { sendError500, isRequestValid } = require("../utils/request.utils");

// Obtener todas las habilidades de todos los Pokémon
exports.listPokemonHabilidades = async (req, res) => {
    try {
        const pokemonHabilidades = await db.pokemon_habilidades.findAll({
            include: [
                { model: db.pokemon, as: 'pokemon' },
                { model: db.habilidad, as: 'habilidad' }
            ]
        });
        res.json(pokemonHabilidades);
    } catch (error) {
        sendError500(res, error);
    }
};

// Obtener las habilidades de un Pokémon específico
exports.getHabilidadesByPokemonId = async (req, res) => {
    const { id } = req.params;
    try {
        const habilidades = await db.pokemon_habilidades.findAll({
            where: { pokemonId: id },
            include: [{ model: db.habilidad, as: 'habilidad' }]
        });

        if (!habilidades || habilidades.length === 0) {
            return res.status(404).json({ msg: 'Habilidades no encontradas para este Pokémon' });
        }

        res.json(habilidades);
    } catch (error) {
        sendError500(res, error);
    }
};

// Crear una nueva relación entre Pokémon y Habilidad
exports.createPokemonHabilidad = async (req, res) => {
    const requiredFields = ['pokemonId', 'habilidadId'];
    if (!isRequestValid(requiredFields, req.body, res)) return;

    try {
        const nuevaRelacion = await db.pokemon_habilidades.create(req.body);
        res.status(201).json(nuevaRelacion);
    } catch (error) {
        sendError500(res, error);
    }
};

// Eliminar una relación específica entre Pokémon y Habilidad
exports.deletePokemonHabilidad = async (req, res) => {
    const { id } = req.params;
    try {
        const relacion = await db.pokemon_habilidades.findByPk(id);
        if (!relacion) {
            return res.status(404).json({ msg: 'Relación no encontrada' });
        }

        await relacion.destroy();
        res.json({ msg: 'Relación eliminada correctamente' });
    } catch (error) {
        sendError500(res, error);
    }
};
