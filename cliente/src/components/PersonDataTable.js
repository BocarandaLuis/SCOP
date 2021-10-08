import {
    Button,
    Form,
    Col,
    Row,
    Container
} from 'react-bootstrap'

export default function PersonDataTable(worker) {
    let data = worker.worker
    const fullname = `${data.nombre1} ${data.nombre2} ${data.apellido1} ${data.apellido2} `
    const ci = `${data.ci}`
    const workStation = data.nombre_ptrabajo
    let codeWorker = data.co_ob.split("-")
    codeWorker = codeWorker[1]

    return (
        <div className="container font-bold mt-2 d-flex justify-content-center align-items-center">
            <Container>
                <Row>
                    <Col lg={1} className="s-max-xs" />
                    <Col lg={2} className="s-max-xs d-flex justify-content-center align-items-center">
                        <svg width="12em" height="12em" viewBox="0 0 16 16" className="s-max-xs bi bi-person-circle text-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col lg={6} xs={8} className="d-flex flex-column justify-content-center align-items-center">
                        <Form.Label className="title" >{fullname}</Form.Label>
                        <Form.Label className="subtitle">C.I: {ci}</Form.Label>
                        <Form.Label className="subtitle">Area de Trabajo: {workStation}</Form.Label>
                        <Form.Label className="label-code">Codigo: {codeWorker}</Form.Label>
                    </Col>
                    <Col lg={3} xs={4} >
                        <Form.Label className=" count-total d-flex justify-content-center align-items-center bg-info" >{parseFloat(worker.total).toFixed(1)}</Form.Label>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}