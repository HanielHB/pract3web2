module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pokemonTipos.controller.js");

    // Rutas para Pokemon_Tipos
    router.get('/', controller.listPokemonTipos);               // Listar todas las relaciones
    router.get('/pokemon/:id', controller.getTiposByPokemonId); // Obtener tipos por Pokémon
    router.post('/', controller.createPokemonTipo);             // Crear una nueva relación
    router.delete('/:id', controller.deletePokemonTipo);        // Eliminar una relación por ID

    // Registrar el router con el prefijo /pokemon_tipos
    app.use('/pokemon_tipos', router);
};
