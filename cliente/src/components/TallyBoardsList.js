import {
    Button,
    Form,
    Card,
    Col,
    Container,
    Row
} from 'react-bootstrap'

export default function TallyBoardsList(data) {
    
    const d = data.board
    const single = data.singleCount?.cant || 0
    const group = data.groupCount?.cant || 0
    return (
        <>
            <div className="mt-1 d-flex justify-content-center align-items-center">
                <Card className="card-size card-shadow">
                    <Card.Title className="title-board mt-2  text-center txt-shadow-simple">{d.name_prod}</Card.Title>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col lg={12} xs={4} onClick={() => data.handleShow()} className="mb-1 d-flex flex-column align-items-end justify-content-center temp-count container-shadow" >
                                    <Form.Label className="title-board txt-center">{parseFloat(single).toFixed(1) || 0.0}</Form.Label>
                                </Col>
                                <Col lg={12} xs={4} className="mb-1 d-flex flex-column align-items-end justify-content-center pers-count container-shadow"  >
                                    <Form.Label className="title-board  txt-center">{parseFloat(d.cant).toFixed(1)}</Form.Label>
                                </Col>
                                <Col lg={12} xs={4} className="mb-1  d-flex flex-column align-items-end justify-content-center total-count container-shadow">
                                    <Form.Label className="title-board txt-center">{parseFloat(group).toFixed(1)}</Form.Label>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="mt-1">
                            <Row>
                                <Col className="d-flex align-items-center justify-content-center">
                                    <Button className="btn-info" onClick={() => data.count(-1, d.cant, data.index)}>-</Button>
                                    <Button className="mx-1 btn-info" onClick={() => data.count(-0.5, d.cant, data.index)}>-1/2</Button>
                                    <Button className="mx-1 btn-info" onClick={() => data.count(0.5, d.cant, data.index)}>+1/2</Button>
                                    <Button className="btn-info" onClick={() => data.count(1, d.cant, data.index)}>+</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}


