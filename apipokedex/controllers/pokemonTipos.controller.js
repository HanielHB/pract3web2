const db = require("../models");
const { sendError500, isRequestValid } = require("../utils/request.utils");

// Obtener todas las relaciones entre Pokémon y Tipos
exports.listPokemonTipos = async (req, res) => {
    try {
        const pokemonTipos = await db.pokemon_tipos.findAll({
            include: [
                { model: db.pokemon, as: 'pokemon' },
                { model: db.tipo, as: 'tipo' }
            ]
        });
        res.json(pokemonTipos);
    } catch (error) {
        sendError500(res, error);
    }
};

// Obtener los tipos de un Pokémon específico por su ID
exports.getTiposByPokemonId = async (req, res) => {
    const { id } = req.params;
    try {
        const tipos = await db.pokemon_tipos.findAll({
            where: { pokemonId: id },
            include: [{ model: db.tipo, as: 'tipo' }]
        });

        if (!tipos || tipos.length === 0) {
            return res.status(404).json({ msg: 'Tipos no encontrados para este Pokémon' });
        }

        res.json(tipos);
    } catch (error) {
        sendError500(res, error);
    }
};

// Crear una nueva relación entre Pokémon y Tipo
exports.createPokemonTipo = async (req, res) => {
    const requiredFields = ['pokemonId', 'tipoId'];
    if (!isRequestValid(requiredFields, req.body, res)) return;

    try {
        const nuevaRelacion = await db.pokemon_tipos.create(req.body);
        res.status(201).json(nuevaRelacion);
    } catch (error) {
        sendError500(res, error);
    }
};

// Eliminar una relación específica entre Pokémon y Tipo
exports.deletePokemonTipo = async (req, res) => {
    const { id } = req.params;
    try {
        const relacion = await db.pokemon_tipos.findByPk(id);
        if (!relacion) {
            return res.status(404).json({ msg: 'Relación no encontrada' });
        }

        await relacion.destroy();
        res.json({ msg: 'Relación eliminada correctamente' });
    } catch (error) {
        sendError500(res, error);
    }
};
