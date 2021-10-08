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



import ModalEditDataProduction from './modals/ModalEditDataProduction'

export default function ProductionDataTable({
	data, handleChange, handleEdit, handleDelete, extracArea, produts, box }) {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Container className="mt-5 scroll2">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Zona de extracción</th>
							<th>Tipo de producto</th>
							<th>Cantidad</th>
						</tr>
					</thead>
					<tbody>
						{data.map((element, i) => {
							return <tr key={i}>
								<td>{i + 1}</td>
								<td>{element.extArea.label}</td>
								<td>{element.product.label}</td>
								<td>{element.quantity}</td>
								<td className="d-flex justify-content-center align-items-center">
									<Button
										className="mx-2"
										onClick={() => { handleChange(element, i); handleShow() }}
									>
										Editar
									</Button>
									<Button
										onClick={() => handleDelete(element, i)}
									>
										Eliminar
									</Button>
								</td>
							</tr>
						})
						}
					</tbody>
				</Table>
			</Container>

			{show &&
				<ModalEditDataProduction
					show={show}
					onHide={handleClose}
					box={box}
					extracArea={extracArea}
					produts={produts}
					handleEdit={handleEdit}
				/>
			}

		</>
	)
}