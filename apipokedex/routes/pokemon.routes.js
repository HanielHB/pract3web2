module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pokemon.controller.js");

    // Rutas para Pokémon
    router.get('/', controller.listPokemon);                 // Obtener todos los Pokémon
    router.get('/:id', controller.getPokemonById);            // Obtener un Pokémon por ID
    router.post('/', controller.createPokemon);               // Crear un nuevo Pokémon
    router.put('/:id', controller.updatePokemonPut);          // Actualizar completamente un Pokémon
    router.patch('/:id', controller.updatePokemonPatch);      // Actualizar parcialmente un Pokémon
    router.delete('/:id', controller.deletePokemon);          // Eliminar un Pokémon
    router.post('/:id/foto', controller.uploadPicture);

    // Registrar el router con el prefijo /pokemons
    app.use('/pokemons', router);
};
