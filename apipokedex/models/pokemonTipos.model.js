module.exports = (sequelize, Sequelize) => {
    const PokemonTipos = sequelize.define('pokemon_tipos', {
        pokemonId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemons', // Nombre de la tabla relacionada
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        tipoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'tipos', // Nombre de la tabla relacionada
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    }, {
        timestamps: false, // Deshabilitar columnas createdAt y updatedAt
        tableName: 'pokemon_tipos' // Asegurar el nombre correcto de la tabla
    });

    return PokemonTipos;
};
