import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link, useNavigate } from "react-router-dom";


const ListaPokemon = () => {
    const [listaPokemon, setListaPokemon] = useState([]);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        getListaPokemon();
        document.title = "Lista de Pokémon";
    }, []);

    const getListaPokemon = () => {
        axios.get('http://localhost:3000/pokemons/')
            .then(res => {
                setListaPokemon(res.data);
            }).catch(error => {
                console.error("Error al obtener la lista de Pokémon:", error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este Pokémon?");
        if (!confirm) return;

        axios.delete(`http://localhost:3000/pokemons/${id}`)
            .then(res => {
                console.log(res.data);
                getListaPokemon(); // Refresca la lista después de eliminar
            }).catch(error => {
                console.error("Error al eliminar el Pokémon:", error);
            });
    };

    const verDetalles = (id) => {
        navigate(`/pokemons/${id}`); // Redirigir a la página de detalles
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Pokémon</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Número de Pokédex</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaPokemon.map(pokemon => (
                                            <tr key={pokemon.id}>
                                                <td>
                                                    <img 
                                                        src={`http://localhost:3000/pokemon/${pokemon.id}.jpg`} 
                                                        alt={`Imagen de ${pokemon.nombre}`} 
                                                        width="100" 
                                                        onClick={() => verDetalles(pokemon.id)} // Redirigir al hacer clic en la imagen
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </td>
                                                <td>{pokemon.id}</td>
                                                <td>
                                                    <span 
                                                        onClick={() => verDetalles(pokemon.id)} 
                                                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                                    >
                                                        {pokemon.nombre}
                                                    </span>
                                                </td>
                                                <td>{pokemon.nroPokedex}</td>
                                                <td>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => eliminar(pokemon.id)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListaPokemon;
