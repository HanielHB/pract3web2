module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pokemonHabilidades.controller.js");

    // Rutas para Pokemon_Habilidades
    router.get('/', controller.listPokemonHabilidades);               // Listar todas las relaciones
    router.get('/pokemon/:id', controller.getHabilidadesByPokemonId);  // Obtener habilidades por Pokémon
    router.post('/', controller.createPokemonHabilidad);               // Crear una nueva relación
    router.delete('/:id', controller.deletePokemonHabilidad);          // Eliminar una relación por ID

    // Registrar el router con el prefijo /pokemon_habilidades
    app.use('/pokemon_habilidades', router);
};
