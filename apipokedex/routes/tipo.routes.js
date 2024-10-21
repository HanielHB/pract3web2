module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/tipo.controller.js");

    // Rutas para Tipos
    router.get('/', controller.listTipos);                // Obtener todos los tipos
    router.get('/:id', controller.getTipoById);           // Obtener un tipo por ID
    router.post('/', controller.createTipo);              // Crear un nuevo tipo
    router.put('/:id', controller.updateTipoPut);         // Actualizar completamente un tipo
    router.patch('/:id', controller.updateTipoPatch);     // Actualizar parcialmente un tipo
    router.delete('/:id', controller.deleteTipo);         // Eliminar un tipo

    // Registrar el router con el prefijo /tipos
    app.use('/tipos', router);
};
