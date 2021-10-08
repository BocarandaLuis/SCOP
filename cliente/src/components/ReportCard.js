import {
    Button,
    Form,
    Card,
    Col,
    Container,
    Row
} from 'react-bootstrap'

import Select from 'react-select'

const options = [
    { value: 'general', label: 'General' },
]

export default function ReportCard({ onChange, onClick }) {



    return (
        <>
            <Card className="card-shadow report-card-size card-repor-border">
                <Card.Body>
                    <Container className="mt-4">
                        <Row>
                            <Col lg={12} className="" >
                                <Form className="form">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="subtitle">Tipo de reporte</Form.Label>
                                        <Select
                                            className="select-size-1"
                                            options={options}
                                            onChange={(value) => onChange("select", value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Row className="mt-5">
                                <Col lg={4} className="" >
                                    <Form className="form">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="subtitle">Hora</Form.Label>
                                            <Form.Control
                                                type="time"
                                                min="0"
                                                name='date_of_birth'
                                                onChange={(value) => onChange("time", value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col lg={3} />
                                <Col lg={5} className="" >
                                    <Form className="form">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="subtitle">Fecha</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name='date_of_birth'
                                                onChange={(value) => onChange("date", value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col lg={12} className="text-end">
                                    <Button onClick={() => onClick()}>Buscar</Button>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </>
    )

}