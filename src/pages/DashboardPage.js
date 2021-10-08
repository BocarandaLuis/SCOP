import React, { useState } from 'react'
import PersonDataTable from '../components/PersonDataTable'
import CountBoard from '../components/CountBoard'
import Navigation from '../components/Navigation'
import useAuth from "../auth/useAuth";
import { getWorkerProduction, producedUnitsCounter } from '../api/worker'
import { getProductionAmount, getAllProductionAmount, paymentExecution } from '../api/payment'
import { save, getSingleCount, deteleSingleCount, saveGroupCount, getGroupCount, deteleGroupCount } from '../helpers/singleCount'
import { confirmAlert } from 'react-confirm-alert';

import {
    Button,
    Form,
    Col,
    Row,
    Container,
    Table,
    Modal
} from 'react-bootstrap'


export default function DashboardPage() {
    const auth = useAuth()
    const [statusWorker, setStatusWorker] = useState(false)
    const [worker, setWorker] = useState(null)
    const [idWorker, setIdWorker] = useState('')
    const [singleCount, setSingleCount] = useState()
    const [productAmount, setProductAmount] = useState(null)
    const [groupCount, setGroupCount] = useState(null)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = async (name, value) => {
        console.log("value: ", value)
        setIdWorker({ id_obrero: value });

    }

    const handleDelete = () => {
        let str = idWorker.id_obrero
        let value = str.substring(0, str.length - 1);
        setIdWorker({ id_obrero: value });

    }


    const handleChangeCount = async (value, cant, index) => {

        let changedWorker = worker
        if (changedWorker.productionByWorker[index].cant == 0 && value < 0) {
            alert("El valor actual es cero")
            return
        }
        changedWorker.productionByWorker[index].cant = parseFloat(changedWorker.productionByWorker[index].cant) + (value)
        changedWorker.total = parseFloat(changedWorker.total) + (value)

        let data = {
            id_prod_ob: changedWorker.id_prod_ob,
            cant: value,
            id_prod: changedWorker.productionByWorker[index].id_prod,
            id_obrero: changedWorker.obrero.id_obrero
        }

        const res = await producedUnitsCounter(data)
        if (res.status == 200) {
            await setWorker({
                ...worker,
                ["total"]: changedWorker.total,
                ["productionByWorker"]: changedWorker.productionByWorker
            });
            let pack = save({
                idWorker: idWorker.id_obrero,
                value: value,
                index: index,
                productionByWorker: JSON.parse(JSON.stringify(changedWorker.productionByWorker)),
                groupCount: {}
            })
            setSingleCount(pack)
    
            let pack2 = saveGroupCount({
                listProduct: JSON.parse(JSON.stringify(changedWorker.productionByWorker)),
                id_prod: data.id_prod,
                value: value
            })
    
            setGroupCount(pack2)
        }
        else {
            alert(res.message)
        }
      

    }

    const handleProductionAmount = async (e) => {
        e.preventDefault();
        console.log("idWossssssrker: ", idWorker)
        const res = await getAllProductionAmount(idWorker)
        console.log("res: ", res)
        if (res.status == 200) {
            setProductAmount(res.body)
        }
        else {
            alert(res.message)
        }
    }

    const handlePaymentExecution = async () => {
        let produccion = []
        for (let i = 0; i < productAmount.listProductionAmount.length; i++) {
            const res = await paymentExecution({
                ...productAmount.listProductionAmount[i],
                ...idWorker,
            })
            if (res.status == 200) {
                setProductAmount(null)
            }
            else {
                alert(res.message)
            }
        }
    }
    const cleanSingleCount = () => {
        deteleSingleCount()
        let p = JSON.parse(JSON.stringify(worker.productionByWorker))
        let d = getSingleCount(idWorker.id_obrero, p)

        setSingleCount(d)
        let d2 = getGroupCount(JSON.parse(JSON.stringify(p)))
        setGroupCount(d2)
    }



    const handleSearchWorker = async (e) => {
        e.preventDefault();
        if (idWorker.id_obrero === '') {
            alert("Por favor llene el campo de texto")
            setStatusWorker(false)
            return
        }
        const res = await getWorkerProduction(idWorker)
        if (res.status == 200) {
            await setWorker(res.body);
            if (statusWorker == false) {
                setStatusWorker(!statusWorker)
            }
            let p = JSON.parse(JSON.stringify(res.body.productionByWorker))
            let d = getSingleCount(idWorker.id_obrero, p)
            setSingleCount(d)
            let d2 = getGroupCount(JSON.parse(JSON.stringify(p)))
            setGroupCount(d2)
        }
        else {
            setStatusWorker(false)
            alert(res.message)
        }

    }

    return (
        <div>

            <Navigation
                onChange={handleChange}
                onSearch={handleSearchWorker}
                onProductionAmount={handleProductionAmount}
                idWorker={idWorker}
            />
            {statusWorker && (<>

                <PersonDataTable
                    worker={worker.obrero}
                    total={worker.total}
                />
                <CountBoard
                    production={worker.productionByWorker}
                    count={handleChangeCount}
                    singleCount={singleCount || []}
                    handleShow={handleShow}
                    groupCount={groupCount || []}
                />
                <footer className="footer-s-max-xs page-footer font-small purple fixed-bottom bg-light" >
                    <div className="footer-copyright d-flex justify-content-center align-items-center">
                        <Row className="my-1">
                            <Col xs={9}>
                                <Col className="mb-1">
                                    <Button className="" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>0</Button>
                                    <Button className="mx-1" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>1</Button>
                                    <Button className="" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>2</Button>
                                    <Button className="mx-1" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>3</Button>
                                    <Button className="" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>4</Button>
                                </Col>

                                <Col>
                                    <Button className="" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>5</Button>
                                    <Button className="mx-1" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>6</Button>
                                    <Button className="" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>7</Button>
                                    <Button className="mx-1" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>8</Button>
                                    <Button className="" variant="primary" onClick={(ev) => handleChange("board", ev.target.innerHTML)}>9</Button>
                                </Col>
                            </Col>
                            <Col xs={3} className="text-end">

                                <Button className="mb-1" variant="primary" onClick={handleDelete}>Del</Button>
                                <Form>
                                    <Button className="" variant="primary" type="submit" onClick={handleSearchWorker}>Send</Button>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </footer>
            </>)
            }
            {/* {!productAmount && (
                <>
                    
                </>)
            } */}


            {productAmount && (
                <>
                    <div className="container font-bold mt-2 d-flex justify-content-center align-items-center">
                        <Container>
                            <Row>
                                <Col lg={2} />
                                <Col lg={2} className="d-flex justify-content-center align-items-center">
                                    <svg width="12em" height="12em" viewBox="0 0 16 16" className="bi bi-person-circle text-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                        <path d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                                    </svg>
                                </Col>
                                <Col lg={6} className="d-flex flex-column justify-content-center align-items-center">
                                    <Form.Label className="title" >
                                        {productAmount.worker.nombre1}{' '}
                                        {productAmount.worker.nombre2}{' '}
                                        {productAmount.worker.apellido1}{' '}
                                        {productAmount.worker.apellido2}
                                    </Form.Label>
                                    <Form.Label className="subtitle">C.I: {productAmount.worker.ci}</Form.Label>
                                    <Form.Label className="subtitle">Area de Trabajo: {productAmount.worker.nombre_ptrabajo}</Form.Label>
                                    <Form.Label className="label-code">Codigo: {productAmount.worker.co_ob}</Form.Label>
                                </Col>
                                <Col lg={2} />
                            </Row>
                        </Container>
                    </div>
                    <div className="scroll2">
                        {productAmount.listProductionAmount.map((p, x) => {
                            return <Container className="mt-5" key={x}>
                                <div>
                                    <h3>{p.date}</h3>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th>Precio Bs</th>
                                                <th>Precio USD</th>
                                                <th>Monto Bs</th>
                                                <th>Monto USD</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                p.production.map((prod, j) => {
                                                    return <tr key={j}>
                                                        <td>{prod.nombre_prod}</td>
                                                        <td>{prod.cant}</td>
                                                        <td>{prod.precio_bs}</td>
                                                        <td>{prod.precio_usd}</td>
                                                        <td>{prod.mont_bs}</td>
                                                        <td>{prod.mont_usd}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                    <Row className=" mx-1 d-flex justify-content-end align-items-center " style={{ background: "#CACFD2" }}>
                                        <Col lg={2} >
                                            <h4>Total:</h4>
                                        </Col>
                                        <Col><h5>{p.cant}</h5></Col>
                                        <Col lg={4} />
                                        <Col> <h5>{p.mont_bs}</h5></Col>
                                        <Col> <h5>{p.mont_usd}</h5></Col>
                                    </Row>
                                </div>
                            </Container>
                        })
                        }
                    </div>
                    <footer className="page-footer font-small purple pt-4 fixed-bottom" style={{ background: "#CACFD2" }} >
                        <div className="footer-copyright mb-4 text-center d-flex justify-content-center align-items-center">
                            <Form>
                                <Button className="p-3" variant="primary" onClick={() => handlePaymentExecution()} >
                                    Ejecutar Pago
                                </Button>
                            </Form>
                        </div>
                    </footer>
                </>

            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar Registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>Estas seguro?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => { cleanSingleCount(); handleClose() }}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}








