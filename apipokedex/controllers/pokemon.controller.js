const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

// Obtener todos los Pokémon
exports.listPokemon = async (req, res) => {
    try {
        const pokemons = await db.pokemon.findAll({
            include: [
                { 
                    model: db.tipo, 
                    as: 'tipos', 
                    through: { attributes: [] } 
                },
                { 
                    model: db.habilidad, 
                    as: 'habilidades', 
                    through: { attributes: [] } 
                },
                { 
                    model: db.evoluciones, 
                    as: 'evoluciones', 
                    include: [
                        { 
                            model: db.pokemon, 
                            as: 'evolucionaA', // La evolución a la que apunta 
                            attributes: ['id', 'nombre', 'nroPokedex']
                        }
                    ]
                }
            ],
            order: [['nroPokedex', 'ASC']]
        });

        res.json(pokemons);
    } catch (error) {
        sendError500(res, error);
    }
};

// Obtener un Pokémon por ID
exports.getPokemonById = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemons = await getPokemonOr404(id, res);
        if (!pokemons) {
            return;
        }
        res.json(pokemons);
    } catch (error) {
        sendError500(error);
    }
}

// Crear un nuevo Pokémon
exports.createPokemon = async (req, res) => {
    const requiredFields = [
        'nombre', 'nroPokedex', 'descripción', 
        'hp', 'attack', 'defense', 'spattack', 
        'spdefense', 'speed'
    ];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const pokemon = {
            nombre: req.body.nombre,
            nroPokedex: req.body.nroPokedex,
            descripción: req.body.descripción,
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed
        };

        const nuevoPokemon = await db.pokemon.create(pokemon);
        res.status(201).json(nuevoPokemon);
    } catch (error) {
        sendError500(res, error);
    }
};


// Actualizar parcialmente un Pokémon (PATCH)
exports.updatePokemonPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        pokemon.nombre = req.body.nombre || pokemon.nombre;
        pokemon.nroPokedex = req.body.nroPokedex || pokemon.nroPokedex;
        pokemon.descripción = req.body.hp || pokemon.descripción;
        pokemon.hp = req.body.hp || pokemon.hp;
        pokemon.attack = req.body.attack || pokemon.attack;
        pokemon.defense = req.body.defense || pokemon.defense;
        pokemon.spattack = req.body.spattack || pokemon.spattack;
        pokemon.spdefense = req.body.spdefense || pokemon.spdefense;
        pokemon.speed = req.body.speed || pokemon.speed;
        
        await db.pokemon.update(pokemon, {
            where: { id: id }
        });
        res.json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}


exports.updatePokemonPut = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        const requiredFields = ['nombre', 'nroPokedex', 'descripción','hp', 'attack', 'defense', 'spattack', 'spdefense', 'speed'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        
        pokemon.nombre = req.body.nombre
        pokemon.nroPokedex = req.body.nroPokedex
        pokemon.descripción = req.body.descripción
        pokemon.hp = req.body.hp
        pokemon.attack = req.body.attack
        pokemon.defense = req.body.defense
        pokemon.spattack = req.body.spattack
        pokemon.spdefense = req.body.spdefense
        pokemon.speed = req.body.speed

        await db.pokemon.update(pokemon, {
            where: { id: id }
        });
        res.json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}



// Eliminar un Pokémon
exports.deletePokemon = async (req, res) => {
    const { id } = req.params;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) return;

        await pokemon.destroy();
        res.json({ msg: 'Pokémon eliminado correctamente' });
    } catch (error) {
        sendError500(res, error);
    }
};

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.fotoPerfil;
        const fileName = pokemon.id + '.jpg';
        file.mv(`public/pokemon/${fileName}`);
        await pokemon.save();
        res.json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}

// Función para obtener un Pokémon o devolver 404 si no existe
async function getPokemonOr404(id, res) {
    const pokemon = await db.pokemon.findByPk(id);
    if (!pokemon) {
        res.status(404).json({
            msg: 'Pokemon no encontrada'
        });
        return;
    }
    return pokemon;
}

