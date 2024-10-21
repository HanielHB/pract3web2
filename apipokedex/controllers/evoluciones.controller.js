const db = require("../models");
const { sendError500, isRequestValid } = require("../utils/request.utils");

// Listar todas las evoluciones
exports.listEvoluciones = async (req, res) => {
    try {
        const evoluciones = await db.evoluciones.findAll({
            include: [
                { 
                    model: db.pokemon, 
                    as: 'evolucionaA' // La evolución a la que apunta 
                }
            ]
        });
        res.json(evoluciones);
    } catch (error) {
        sendError500(res, error);
    }
};

// Obtener todas las evoluciones de un Pokémon específico
exports.getEvolucionesByPokemonId = async (req, res) => {
    const { id } = req.params;
    try {
        const evoluciones = await db.evoluciones.findAll({
            where: { pokemonId: id },
            include: [{ 
                model: db.pokemon, 
                as: 'evolucionaA' 
            }]
        });

        if (!evoluciones || evoluciones.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron evoluciones para este Pokémon.' });
        }

        res.json(evoluciones);
    } catch (error) {
        sendError500(res, error);
    }
};

// Crear una nueva evolución
exports.createEvolucion = async (req, res) => {
    const requiredFields = ['pokemonId', 'evolucionId', 'nivelEvolucion'];
    if (!isRequestValid(requiredFields, req.body, res)) return;

    try {
        const nuevaEvolucion = await db.evoluciones.create(req.body);
        res.status(201).json(nuevaEvolucion);
    } catch (error) {
        sendError500(res, error);
    }
};

// Eliminar una evolución específica
exports.deleteEvolucion = async (req, res) => {
    const { id } = req.params;
    try {
        const evolucion = await db.evoluciones.findByPk(id);
        if (!evolucion) {
            return res.status(404).json({ msg: 'Evolución no encontrada.' });
        }

        await evolucion.destroy();
        res.json({ msg: 'Evolución eliminada correctamente.' });
    } catch (error) {
        sendError500(res, error);
    }
};
