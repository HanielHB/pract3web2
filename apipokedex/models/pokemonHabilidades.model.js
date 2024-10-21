module.exports = (sequelize, Sequelize) => {
    const PokemonHabilidades = sequelize.define('pokemon_habilidades', {
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
        habilidadId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'habilidads', // Nombre de la tabla relacionada
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    }, {
        timestamps: false, // Deshabilitar columnas createdAt y updatedAt
        tableName: 'pokemon_habilidades' // Aseguramos el nombre correcto de la tabla
    });

    return PokemonHabilidades;
};
