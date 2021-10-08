import React, { useState } from 'react'
import {
    Button,
    Form,
    Row,
    Col,
    FormControl
} from 'react-bootstrap'
import Select from 'react-select'
import '../styles/loginStyles.css';
import { getWorker, signupWorker } from '../api/worker';

const initial = {
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    ci: '',
    tlf: '',
    fe_nacimiento: '',
    direccion: '',
    ptrabajo: { id_ptrabajo: '', label: '' },
    co_ob: ''
}

const options = [
    { id_ptrabajo: '1', label: 'Cangrejero' },
    { id_ptrabajo: '2', label: 'Colmillero' },
    { id_ptrabajo: '3', label: 'Revisador de carne blanca' },
    { id_ptrabajo: '4', label: 'Revisador de carne negra' },
    { id_ptrabajo: '5', label: 'Revisador de carne jumbo' },
    { id_ptrabajo: '6', label: 'Desconchador' },
]
export default function SignupWorkerPage() {
    const [worker, setWorker] = useState(initial);
    const [seachWorker, setSeachWorker] = useState(null)

    const handleChange = async (name, value) => {
        setWorker({
            ...worker,
            [name]: value
        });
    }

    const handleChangeSearch = async (event) => {
        setSeachWorker({ parameter: event.target.value });
    }

    const handleSignWorker = async () => {
        const res = await signupWorker(worker)
        if (res.status != 200) return console.error(res.message)
        alert(`${res.message} - CODIGO: ${res.body.co_ob}`)
        setWorker(initial)
    }


    const handleSearchWorker = async (e) => {
        e.preventDefault();
        if (seachWorker === '' || seachWorker == null) {
            alert("Por favor escriba el id, número de cedula o nombre del obrero ")
            return
        }
        const res = await getWorker(seachWorker)
        if (res.status == 200) {
            setWorker(res.body);
        }
        else {
            alert(res.message)
        }

    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="mt-3" style={{ width: "40%" }}>
                <SearchWorker
                    handleSearchWorker={handleSearchWorker}
                    onChange={handleChangeSearch}
                />
            </div>
            <div className="container contenedor-signup-worker mt-5">
                <FormSignupWorker
                    handleChange={handleChange}
                    handleSignWorker={handleSignWorker}
                    worker={worker}
                />
            </div>
        </div>
    )

}

const SearchWorker = ({ handleSearchWorker, onChange }) => {
    return (
        <>
            <Form className="" onSubmit={handleSearchWorker}>
                <Form.Label className="label">Buscar obrero</Form.Label>
                <FormControl
                    type="search"
                    placeholder="Buscar obrero"
                    className=""
                    aria-label="Search"
                    onChange={(text) => onChange(text)}
                />
            </Form>
        </>
    )
}

const FormSignupWorker = ({ handleChange, handleSignWorker, worker }) => {
    return (
        <>
            <Form className="form">
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="label">Codigo</Form.Label>
                            <Form.Control
                                type="text"
                                value={worker.co_ob}
                                onChange={(ev) => handleChange('co_ob', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="label">Primer nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={worker.nombre1}
                                onChange={(ev) => handleChange('nombre1', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="label">Segundo nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={worker.nombre2}
                                onChange={(ev) => handleChange('nombre2', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="label">Primer apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={worker.apellido1}
                                onChange={(ev) => handleChange('apellido1', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="label">Segundo Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={worker.apellido2}
                                onChange={(ev) => handleChange('apellido2', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="label">Cedula de identidad</Form.Label>
                            <Form.Control
                                type="number"
                                value={worker.ci}
                                onChange={(ev) => handleChange('ci', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="label">Numero de telefono</Form.Label>
                            <Form.Control
                                type="number"
                                value={worker.tlf}
                                onChange={(ev) => handleChange('tlf', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="label">Fecha de nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                value={worker.fe_nacimiento}
                                onChange={(ev) => handleChange('fe_nacimiento', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="subtitle">Puesto de trabajo</Form.Label>
                            <Select
                                className="select-size-1"
                                options={options}
                                value={{ label: worker.ptrabajo.label }}
                                onChange={(value) => handleChange("ptrabajo", value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button className="mt-4 mx-5 p-3 " variant="primary" onClick={() => handleSignWorker()}>
                    Registrar
                </Button>
            </Form>

        </>
    )
}
