module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/habilidad.controller.js");

    // Rutas para Habilidades
    router.get('/', controller.listHabilidades);                // Obtener todas las habilidades
    router.get('/:id', controller.getHabilidadById);             // Obtener una habilidad por ID
    router.post('/', controller.createHabilidad);                // Crear una nueva habilidad
    router.put('/:id', controller.updateHabilidadPut);           // Actualizar completamente una habilidad
    router.patch('/:id', controller.updateHabilidadPatch);       // Actualizar parcialmente una habilidad
    router.delete('/:id', controller.deleteHabilidad);           // Eliminar una habilidad

    // Registrar el router con el prefijo /habilidades
    app.use('/habilidades', router);
};
