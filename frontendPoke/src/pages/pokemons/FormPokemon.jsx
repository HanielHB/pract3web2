import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormActor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Estado para el campo name del actor
    const [nombre, setNombre] = useState('');
    const [nroPokedex, setNroPokedex] = useState('');
    const [descripción, setDescripcion] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [spattack, setSpattack] = useState('');
    const [spdefense, setSpDefense] = useState('');
    const [speed, setSpeed] = useState('');

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getPokemonById();
    }, [id]);

    const getPokemonById = () => {
        axios.get(`http://localhost:3000/pokemons/${id}`)
            .then(res => {
                const pokemon = res.data;
                setNombre(pokemon.nombre);
                setNroPokedex(pokemon.nroPokedex);
                setDescripcion(pokemon.descripción);
                setHp(pokemon.hp);
                setAttack(pokemon.attack);
                setDefense(pokemon.defense);
                setSpattack(pokemon.spattack);
                setSpDefense(pokemon.spdefense);
                setSpeed(pokemon.speed);
            }).catch(error => {
                console.log(error);
            });
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const pokemon = { nombre, nroPokedex, descripción, hp, attack, defense, spattack, spdefense, speed };

        if (id) {
            editActor(pokemon);
        } else {
            insertActor(pokemon);
        }
    };

    const editActor = (pokemon) => {
        axios.put(`http://localhost:3000/pokemons/${id}`, pokemon)
            .then(res => {
                console.log(res.data);
                navigate('/pokemons');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertActor = (pokemon) => {
        axios.post('http://localhost:3000/pokemons', pokemon)
            .then(res => {
                console.log(res.data);
                navigate('/pokemons');
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Formulario Pokemon</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Nombre del Pokemon:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Número de Pokédex:</Form.Label>
                                        <Form.Control required value={nroPokedex} type="text" onChange={(e) => setNroPokedex(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un número de Pokédex.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Descripción:</Form.Label>
                                        <Form.Control required value={descripción} type="text" onChange={(e) => setDescripcion(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una descripción.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>HP:</Form.Label>
                                        <Form.Control required value={hp} type="text" onChange={(e) => setHp(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un HP.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Attack:</Form.Label>
                                        <Form.Control required value={attack} type="text" onChange={(e) => setAttack(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un Attack.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Defense:</Form.Label>
                                        <Form.Control required value={defense} type="text" onChange={(e) => setDefense(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un Defense.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>SpAttack:</Form.Label>
                                        <Form.Control required value={spattack} type="text" onChange={(e) => setSpattack(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un SpAttack.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>SpDefense:</Form.Label>
                                        <Form.Control required value={spdefense} type="text" onChange={(e) => setSpDefense(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un SpDefense.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Speed:</Form.Label>
                                        <Form.Control required value={speed} type="text" onChange={(e) => setSpeed(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un Speed.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Actor</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormActor;
