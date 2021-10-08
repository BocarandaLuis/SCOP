import React from 'react'
import useAuth from "../auth/useAuth";
import { useHistory, useLocation } from "react-router-dom";
import {
    Button,
    Form
} from 'react-bootstrap'

import '../styles/loginStyles.css';

export default function LoginPage() {
    const auth = useAuth()
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = React.useState({
        username: '',
        contraseña: '',
    });
    const handleChange = (name, event) => {
        setUser({ ...user, [name]: event.target.value });
    }


    const perviousObjectURL = location.state?.from

    const handleLogin = () => {
        auth.login(user);
    }

    return (
        <div className="container contenedor d-flex justify-content-center align-items-center">
            <Form className="form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="label">Nombre de usuario</Form.Label>
                    <Form.Control
                        type="email"
                        onChange={(text) => handleChange('username', text)}
                        autoComplete="off"
                    />
                    <Form.Text className="text-muted">
                        Escribe su nombre de usuario para su posterior ingreso a su cuenta!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="label">Contaseña</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(text) => handleChange('contraseña', text)}
                    />
                </Form.Group>

                <Button className="mt-4 mx-5 p-3 " variant="primary" onClick={handleLogin}>
                    Iniciar Sesión
                </Button>
            </Form>
        </div>
    )
}
