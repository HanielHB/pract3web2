module.exports = app => {
    require('./pokemon.routes')(app);
    require('./habilidad.routes')(app);
    require('./tipo.routes')(app);
    require('./pokemonHabilidades.routes')(app);
    require('./pokemonTipos.routes')(app);
    require('./evoluciones.routes')(app);
    
}