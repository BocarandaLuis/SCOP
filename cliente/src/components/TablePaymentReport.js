import React from 'react'

import {
	Modal,
	Container,
	Table
} from 'react-bootstrap'

export default function TablePaymentReport(data) {
	return (
		<>
			<Container className="scroll">
				<div>


					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Codigo</th>
								<th>Obrero</th>
								<th>Fecha de pago</th>
								<th>Fecha de producción</th>
								<th colSpan="2">Producto</th>

								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{data.data.map((value, i) => {
								return (<tr key={i}>

									<td>{i + 1}</td>
									<td>{value.worker.co_ob}</td>
									<td>
										{value.worker.nombre1} {' '}
										{value.worker.nombre2} {' '}
										{value.worker.apellido1} {' '}
										{value.worker.apellido2}
									</td>
									<td>{value.worker.fe_hr}</td>
									<td>{value.worker.fe_inicio}</td>

									<td>{`${value.paymentDetail[0].nombre_prod} : ${value.paymentDetail[0].cant}`}</td>
									<td>{value.paymentDetail[1] && `${value.paymentDetail[1].nombre_prod}  ${value.paymentDetail[1].cant}`} </td>
									<td>{value.worker.total_bs}</td>
								</tr>)
							})
							}
						</tbody>
					</Table>
				</div>
			</Container>
		</>
	)
}