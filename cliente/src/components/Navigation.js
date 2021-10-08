import React, { useEffect, useState } from 'react'

import {
    Navbar,
    Nav,
    NavDropdown,
    Container,
    InputGroup,
    FormControl,
    Button,
    Form
} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import useAuth from '../auth/useAuth'
import CheckBox from './CheckBox'

export default function Navigation({ onChange, onSearch, onProductionAmount, idWorker }) {
    const { logout, user } = useAuth()
    const [rol, setRol] = useState(0)
    useEffect(() => {
        user.rol.map((element) => {
            setRol(element)
        })
    }, [])

 
    return (
        <>
            {rol == 4 || rol == 1 || rol == 2
                ? <Navbar className="nav-s-max-sx" bg="dark" variant="dark">
                    <Container>
                        <Nav className="me-auto">
                            <Form className="d-flex" onSubmit={onSearch}>
                                <FormControl
                                    type="search"
                                    placeholder="Buscar obrero"
                                    className="mr-2"
                                    aria-label="Search"
                                    value={idWorker?.id_obrero}
                                    onChange={(ev) => onChange("input", ev.target.value)}
                                />
                            </Form>
                            <Nav.Link to='/login' onClick={logout}>Cerrar sesión</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                : null
            }
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark" className="s-max-xs">
                <Container>
                    <Navbar.Brand>Promacol</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="d-flex justify-content-end" id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link as={NavLink} to='/dashboard' >Home</Nav.Link>
                            {rol == 1
                                ? <> <Nav.Link as={NavLink} to='/signupEmployee'>Registo de empleado</Nav.Link> </>
                                : null
                            }
                            {rol == 4 || rol == 1
                                ? <>
                                    <Nav.Link as={NavLink} to='/signupWorker'>Registo de obrero</Nav.Link>
                                    <Nav.Link as={NavLink} to='/insertData'>Inserción de datos</Nav.Link>
                                    <Nav.Link as={NavLink} to='/report'>Reporte de estado</Nav.Link>
                                    <Form className="d-flex" onSubmit={onSearch}>
                                        <FormControl
                                            type="search"
                                            placeholder="Buscar obrero"
                                            className="mr-2"
                                            aria-label="Search"
                                            onChange={(ev) => onChange("input", ev.target.value)}
                                        />
                                    </Form>
                                </>
                                : null
                            }
                            {rol == 3 &&
                                <>
                                    <Nav.Link as={NavLink} to='/product'>Producto</Nav.Link>
                                    <Nav.Link as={NavLink} to='/reportPayment'>Reporte de pagos</Nav.Link>
                                    <Form className="d-flex" onSubmit={onProductionAmount}>
                                        <FormControl
                                            type="search"
                                            placeholder="Buscar obrero"
                                            className="mr-2"
                                            aria-label="Search"
                                            onChange={(ev) => onChange("input", ev.target.value)}
                                        />
                                    </Form>
                                </>
                            }
                            {rol == 5 &&
                                <>
                                    <Nav.Link as={NavLink} to='/weighing'>Inserción de datos</Nav.Link>
                                    <Nav.Link as={NavLink} to='/reportDataWeighing'>Reporte</Nav.Link>
                                </>
                            }

                            <Nav.Link to='/login' onClick={logout}>Cerrar sesión</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
