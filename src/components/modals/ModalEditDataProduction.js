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


export default function ModalEditDataProduction(data) {
	const [box, setBox] = useState(data.box.element || null)
	const [index, setIndex] = useState(data.box.i)
	return (
		<>
			<Modal
				show={data.show}
				onHide={data.onHide}
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
							<Form.Group className="mb-3" controlId="zone">
								<Form.Label className="subtitle">Zona de extracción</Form.Label>
								<Select
									className="select-size-1"
									options={data.extracArea}
									value={{ label: box.extArea?.label }}
									onChange={(value) => setBox({ ...box, ["extArea"]: value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="product">
								<Form.Label className="subtitle">Tipo de reporte</Form.Label>
								<Select
									className="select-size-1"
									options={data.produts}
									value={{ label: box.product?.label }}
									onChange={(value) => setBox({ ...box, ["product"]: value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label className="subtitle">Cantidad</Form.Label>
								<Form.Control
									autoComplete="off"
									min={0}
									type="number"
									value={box.quantity || null}
									onChange={(value) => setBox({ ...box, ["quantity"]: value.target.value })}
								/>
							</Form.Group>
						</Form>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit" onClick={() => { data.handleEdit(box, index); data.onHide() }} >
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}