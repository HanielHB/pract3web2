const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

// Obtener todos los tipos
exports.listTipos = async (req, res) => {
    try {
        const tipos = await db.tipo.findAll({
            include: [
                {
                    model: db.pokemon, 
                    as: 'pokemons', 
                    through: { attributes: [] } // Excluir atributos de la tabla intermedia
                }
            ]
        });
        res.json(tipos);
    } catch (error) {
        sendError500(res, error);
    }
};

// Obtener un tipo por ID
exports.getTipoById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) return;
        res.json(tipo);
    } catch (error) {
        sendError500(res, error);
    }
};

// Crear un nuevo tipo
exports.createTipo = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) return;

    try {
        const nuevoTipo = await db.tipo.create(req.body);
        res.status(201).json(nuevoTipo);
    } catch (error) {
        sendError500(res, error);
    }
};

// Actualizar parcialmente un tipo (PATCH)
exports.updateTipoPatch = async (req, res) => {
    const { id } = req.params;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) return;

        tipo.nombre = req.body.nombre || tipo.nombre;
        await tipo.save();

        res.json(tipo);
    } catch (error) {
        sendError500(res, error);
    }
};

// Actualizar completamente un tipo (PUT)
exports.updateTipoPut = async (req, res) => {
    const { id } = req.params;
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) return;

    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) return;

        tipo.nombre = req.body.nombre;
        await tipo.save();

        res.json(tipo);
    } catch (error) {
        sendError500(res, error);
    }
};

// Eliminar un tipo
exports.deleteTipo = async (req, res) => {
    const { id } = req.params;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) return;

        await tipo.destroy();
        res.json({ msg: 'Tipo eliminado correctamente' });
    } catch (error) {
        sendError500(res, error);
    }
};

// Función para obtener un tipo o devolver 404 si no existe
async function getTipoOr404(id, res) {
    const tipo = await db.tipo.findByPk(id, {
        include: [
            {
                model: db.pokemon,
                as: 'pokemons',
                through: { attributes: [] }
            }
        ]
    });

    if (!tipo) {
        res.status(404).json({ msg: 'Tipo no encontrado' });
        return null;
    }
    return tipo;
}
