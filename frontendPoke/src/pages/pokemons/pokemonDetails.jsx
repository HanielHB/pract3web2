import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Spinner, ProgressBar, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";

const PokemonDetails = () => {
    const { id } = useParams(); // Obtener el ID del Pokémon desde la URL
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPokemonDetails();
    }, []);

    const getPokemonDetails = () => {
        axios.get(`http://localhost:3000/pokemons/${id}`)
            .then(res => {
                setPokemon(res.data);
                setLoading(false);
            }).catch(error => {
                console.error("Error al obtener los detalles del Pokémon:", error);
                setLoading(false);
            });
    };

    if (loading) return <Spinner animation="border" variant="primary" />;

    return (
        <>
            <NavMenu />
            <Container className="mt-3">
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Img 
                                variant="top" 
                                src={`http://localhost:3000/pokemon/${pokemon.id}.jpg`} 
                                alt={`Imagen de ${pokemon.nombre}`} 
                            />
                            <Card.Body>
                                <Card.Title>{pokemon.nombre}</Card.Title>
                                <Card.Text><strong>Número de Pokédex:</strong> {pokemon.nroPokedex}</Card.Text>
                                <Card.Text><strong>Descripción:</strong> {pokemon.descripción}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Base Stats</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Stat</th>
                                            <th>Valor</th>
                                            <th>Barra</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>HP</td>
                                            <td>{pokemon.hp}</td>
                                            <td>
                                                <ProgressBar now={pokemon.hp} max={255} label={`${pokemon.hp}`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ataque</td>
                                            <td>{pokemon.attack}</td>
                                            <td>
                                                <ProgressBar now={pokemon.attack} max={255} variant="warning" label={`${pokemon.attack}`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Defensa</td>
                                            <td>{pokemon.defense}</td>
                                            <td>
                                                <ProgressBar now={pokemon.defense} max={255} variant="danger" label={`${pokemon.defense}`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ataque Especial</td>
                                            <td>{pokemon.spattack}</td>
                                            <td>
                                                <ProgressBar now={pokemon.spattack} max={255} variant="info" label={`${pokemon.spattack}`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Defensa Especial</td>
                                            <td>{pokemon.spdefense}</td>
                                            <td>
                                                <ProgressBar now={pokemon.spdefense} max={255} variant="primary" label={`${pokemon.spdefense}`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Velocidad</td>
                                            <td>{pokemon.speed}</td>
                                            <td>
                                                <ProgressBar now={pokemon.speed} max={255} variant="success" label={`${pokemon.speed}`} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <h5>Total: {pokemon.hp + pokemon.attack + pokemon.defense + pokemon.spattack + pokemon.spdefense + pokemon.speed}</h5>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PokemonDetails;
