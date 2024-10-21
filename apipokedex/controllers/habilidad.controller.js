const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

// Obtener todas las habilidades
exports.listHabilidades = async (req, res) => {
    try {
        const habilidades = await db.habilidad.findAll({
            include: [
                {
                    model: db.pokemon, 
                    as: 'pokemons', 
                    through: { attributes: [] } // Excluir atributos de la tabla intermedia
                }
            ]
        });
        res.json(habilidades);
    } catch (error) {
        sendError500(res, error);
    }
};

// Obtener una habilidad por ID
exports.getHabilidadById = async (req, res) => {
    const { id } = req.params;
    try {
        const habilidad = await getHabilidadOr404(id, res);
        if (!habilidad) return;
        res.json(habilidad);
    } catch (error) {
        sendError500(res, error);
    }
};

// Crear una nueva habilidad
exports.createHabilidad = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) return;

    try {
        const nuevaHabilidad = await db.habilidad.create(req.body);
        res.status(201).json(nuevaHabilidad);
    } catch (error) {
        sendError500(res, error);
    }
};

// Actualizar parcialmente una habilidad (PATCH)
exports.updateHabilidadPatch = async (req, res) => {
    const { id } = req.params;
    try {
        const habilidad = await getHabilidadOr404(id, res);
        if (!habilidad) return;

        habilidad.nombre = req.body.nombre || habilidad.nombre;
        await habilidad.save();

        res.json(habilidad);
    } catch (error) {
        sendError500(res, error);
    }
};

// Actualizar completamente una habilidad (PUT)
exports.updateHabilidadPut = async (req, res) => {
    const { id } = req.params;
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) return;

    try {
        const habilidad = await getHabilidadOr404(id, res);
        if (!habilidad) return;

        habilidad.nombre = req.body.nombre;
        await habilidad.save();

        res.json(habilidad);
    } catch (error) {
        sendError500(res, error);
    }
};

// Eliminar una habilidad
exports.deleteHabilidad = async (req, res) => {
    const { id } = req.params;
    try {
        const habilidad = await getHabilidadOr404(id, res);
        if (!habilidad) return;

        await habilidad.destroy();
        res.json({ msg: 'Habilidad eliminada correctamente' });
    } catch (error) {
        sendError500(res, error);
    }
};

// Función para obtener una habilidad o devolver 404 si no existe
async function getHabilidadOr404(id, res) {
    const habilidad = await db.habilidad.findByPk(id, {
        include: [
            {
                model: db.pokemon,
                as: 'pokemons',
                through: { attributes: [] }
            }
        ]
    });

    if (!habilidad) {
        res.status(404).json({ msg: 'Habilidad no encontrada' });
        return null;
    }
    return habilidad;
}
