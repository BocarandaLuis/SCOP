import React, { useState, useEffect } from 'react'
import {
	Button,
	Modal,
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


export default function ModalEditProduct({ product, show, onHide, handleEdit }) {
	const [box, setBox] = useState(product.element)

	return (
		<>
			<Modal
				show={show}
				onHide={onHide}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Editar datos de producción
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Form>
							<Form.Group className="mb-3" controlId="">
								<Form.Label className="subtitle">Producto</Form.Label>
								<Form.Control
									disabled
									type="text"
									value={box.nombre_prod}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="">
								<Form.Label className="subtitle">Precio Bs</Form.Label>
								<Form.Control
									autoComplete="off"
									min={0}
									type="number"
									value={box.precio_bs}
									onChange={(value) => setBox({ ...box, ["precio_bs"]: value.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="">
								<Form.Label className="subtitle">Precio USD</Form.Label>
								<Form.Control
									autoComplete="off"
									min={0}
									type="number"
									value={box.precio_usd}
									onChange={(value) => setBox({ ...box, ["precio_usd"]: value.target.value })}
								/>
							</Form.Group>
						</Form>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit" onClick={() => { handleEdit(box, product.i); onHide() }} >
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}