module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/evoluciones.controller.js");

    // Rutas para Evoluciones
    router.get('/', controller.listEvoluciones);                     // Listar todas las evoluciones
    router.get('/:id', controller.getEvolucionesByPokemonId);        // Obtener evoluciones por ID de Pokémon
    router.post('/', controller.createEvolucion);                    // Crear nueva evolución
    router.delete('/:id', controller.deleteEvolucion);               // Eliminar una evolución

    app.use('/evoluciones', router);
};
