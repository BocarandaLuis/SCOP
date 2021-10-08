import React, { useState } from 'react'

import {
    Button,
    Form,
    Card,
    Col,
    Container,
    Row,
    FormControl,
    InputGroup,
    Table
} from 'react-bootstrap'

import Select from 'react-select'



export default function Guidelines({ onChange, inserTable, extracArea, produts, sendData }) {

    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col lg={1} />
                    <Col lg={7}>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon2">Zona de extracción</InputGroup.Text>
                            <Select
                                className="select-size-1"
                                options={extracArea}
                                onChange={(value) => onChange("extArea", value)}
                            />
                        </InputGroup>

                    </Col>
                    <Col lg={4} />
                </Row>
                <Row className="mt-4">
                    <Col lg={1} />
                    <Col lg={7}>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon2">Tipo de producto</InputGroup.Text>
                            <Select
                                className="select-size-1"
                                options={produts}
                                onChange={(value) => onChange("product", value)}
                            />
                        </InputGroup>

                    </Col>
                    <Col lg={4} />
                </Row>
                <Row className="mt-5" >
                    <Col />
                    <Col lg={3} >
                        <InputGroup>
                            <InputGroup.Text id="basic-addon2">Cantidad</InputGroup.Text>
                            <Form.Control
                                type="number"
                                onChange={(value) => onChange("quantity", value.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col lg={1} />
                </Row>
                <Row className="mt-5" >
                    <Col />
                    <Col lg={2} >
                        <Button onClick={() => inserTable()}>Insertar</Button>
                    </Col>
                    <Col lg={1} >
                        <Button onClick={() => sendData()}>Guardar</Button>
                    </Col>
                    <Col lg={1} />
                </Row>
            </Container>
        </>
    )
}