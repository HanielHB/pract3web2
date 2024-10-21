module.exports = (sequelize, Sequelize) => {
    const Evoluciones = sequelize.define("evoluciones", {
        pokemonId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemons', // Referencia a la tabla 'pokemons'
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        evolucionId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemons', // Referencia a la tabla 'pokemons'
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        nivelEvolucion: {
            type: Sequelize.INTEGER,
            allowNull: true // Puede ser null si no depende de nivel
        }
    }, {
        timestamps: false,
        tableName: 'evoluciones'
    });

    return Evoluciones;
};
