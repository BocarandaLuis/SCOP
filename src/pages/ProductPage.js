
import React, { useState, useEffect } from 'react'
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


import ModalDataEditProduct from '../components/modals/ModalDataEditProduct'
import { getProduct, updateProduct } from '../api/product'

export default function ProductPage() {
    const [productList, setProductList] = useState([])
    const [product, setProduct] = useState(null)
    const [show, setShow] = useState(false);

    useEffect(async () => {
        const res = await getProduct()
        if (res.status != 200) return alert(res.message)
        setProductList(res.body)
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleEdit = async (element, index) => {


        const d = productList.map((data, i) => (
            i == index
                ? element  
                : data      
        ))

        const res = await updateProduct(element)
        if (res.status != 200) return alert(res.message)
        alert(res.message)
        setProductList(d)
    }

    const handleDelete = (element, index) => {
        const changedCart = productList.filter((product, i) => i !== index)
        setProductList(changedCart)
    }

    const handleChange = (element, i) => {
        setProduct({
            ...product,
            ["element"]: element,
            ["i"]: i
        })

    }

    return (
        <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
            <Container className="mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th>Precio Bs</th>
                            <th>Precio USD</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((element, i) => {
                            return <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{element.nombre_prod}</td>
                                <td>{parseFloat(element.precio_bs).toFixed(2)}</td>
                                <td>{parseFloat(element.precio_usd).toFixed(2)}</td>
                                <td className="d-flex justify-content-center align-items-center">
                                    <Button
                                        className="mx-2"
                                        onClick={() => { handleChange(element, i); handleShow() }}
                                    >
                                        Editar
                                    </Button>
                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </Table>
            </Container>
            {show &&
                <ModalDataEditProduct
                    show={show}
                    onHide={handleClose}
                    product={product}
                    handleEdit={handleEdit}
                />
            }

        </div>
    )
}