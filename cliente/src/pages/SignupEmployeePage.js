import React, { useState } from 'react'
import {
    Button,
    Form,
    Row,
    Col,
} from 'react-bootstrap'
import Select from 'react-select'
import '../styles/loginStyles.css';
import { signupEmployee } from '../api/employee';

const initial = {
    username: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    contraseña: '',
    rol: { id_rol: '', label: '' },
}

const options = [
    { id_rol: '2', label: 'Analista de sistema' },
    { id_rol: '3', label: 'Cajero' },
    { id_rol: '4', label: 'Supervisor de sistema' },
    { id_rol: '5', label: 'Supervisor de peso' },
]
export default function SignupEmployeePage() {
    const [employee, setEmployee] = useState(initial);

    const handleChange = (name, value) => {
        setEmployee({ ...employee, [name]: value });
    }

    const handleSignEmployee = async () => {
        const res = await signupEmployee(employee)
        if (res.status != 200) return alert(res.message)
        alert(res.message)
        setEmployee(initial)

    }

    return (
        <div className="container contenedor-signup-worker d-flex justify-content-center align-items-center">
            <Form className="form">
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label">Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                value={employee.username}
                                onChange={(ev) => handleChange('username', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label">Primer nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={employee.nombre1}
                                onChange={(ev) => handleChange('nombre1', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label">Segundo nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={employee.nombre2}
                                onChange={(ev) => handleChange('nombre2', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label">Primer apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={employee.apellido1}
                                onChange={(ev) => handleChange('apellido1', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label">Segundo Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={employee.apellido2}
                                onChange={(ev) => handleChange('apellido2', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label">Contraceña</Form.Label>
                            <Form.Control
                                type="password"
                                value={employee.contraseña}
                                onChange={(ev) => handleChange('contraseña', ev.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="subtitle">Rol</Form.Label>
                            <Select
                                className="select-size-1"
                                options={options}
                                value={{ label: employee.rol.label }}
                                onChange={(value) => handleChange("rol", value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button className="mt-4 mx-5 p-3 " variant="primary" onClick={handleSignEmployee}>
                    Registrar
                </Button>
            </Form>
        </div>
    )
}
