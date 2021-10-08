import React from 'react'
import {
    NavDropdown,
    Form
} from 'react-bootstrap'

export default function CheckBox() {
    const handleChange = (evt) => {
    }

    return (
        <>
            <NavDropdown title="Tarjetas de conteo" >

                <Form.Group controlId="1">
                    <Form.Check type="checkbox" label="Jumbo" id="1" name="1" onChange={(event) => handleChange(event)} />
                </Form.Group>
                <Form.Group controlId="2">
                    <Form.Check type="checkbox" label="Lump" id="2" name="2" onChange={(event) => handleChange(event)} />
                </Form.Group>
                <Form.Group controlId="3">
                    <Form.Check type="checkbox" label="Claw" id="3" name="2" onChange={(event) => handleChange(event)} />
                </Form.Group>
                <Form.Group controlId="4">
                    <Form.Check type="checkbox" label="Cocktail" id="4" name="4" onChange={(event) => handleChange(event)} />
                </Form.Group>
                <Form.Group controlId="5">
                    <Form.Check type="checkbox" label="R/Lump" id="5" name="5" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </NavDropdown>
        </>
    )
}