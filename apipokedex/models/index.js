const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.pokemon = require('./pokemon.model.js')(sequelize, Sequelize);
db.tipo = require('./tipo.model.js')(sequelize, Sequelize);
db.habilidad = require('./habilidad.model.js')(sequelize, Sequelize);
db.pokemon_habilidades = require('./pokemonHabilidades.model.js')(sequelize, Sequelize);
db.pokemon_tipos = require('./pokemonTipos.model.js')(sequelize, Sequelize);
db.evoluciones = require('./evoluciones.model.js')(sequelize, Sequelize);

// Relaciones N:M - Un Pokémon puede tener varios tipos, y un tipo puede pertenecer a varios Pokémon
db.pokemon.belongsToMany(db.tipo, { 
    through: db.pokemon_tipos, 
    as: "tipos", 
    foreignKey: "pokemonId" 
});
db.tipo.belongsToMany(db.pokemon, { 
    through: db.pokemon_tipos, 
    as: "pokemons", 
    foreignKey: "tipoId" 
});

// Relaciones N:M - Un Pokémon puede tener varias habilidades, y una habilidad puede pertenecer a varios Pokémon
db.pokemon.belongsToMany(db.habilidad, { 
    through: db.pokemon_habilidades, 
    as: "habilidades", 
    foreignKey: "pokemonId" 
});
db.habilidad.belongsToMany(db.pokemon, { 
    through: db.pokemon_habilidades, 
    as: "pokemons", 
    foreignKey: "habilidadId" 
});

// Nueva relación para manejar evoluciones
db.pokemon.hasMany(db.evoluciones, { 
    foreignKey: "pokemonId", 
    as: "evoluciones"
});
db.evoluciones.belongsTo(db.pokemon, { 
    foreignKey: "evolucionId", 
    as: "evolucionaA" 
});

module.exports = db;
