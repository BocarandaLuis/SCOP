import React from 'react'
import {
	Modal,
	Container,
	Table
} from 'react-bootstrap'

export default function TableReport(data) {
	let d = data.data

	return (
		<>
			<Container className="scroll">

				{d.map((value, i) => {
					return (
						<div key={i}>
							<h3>{value.sala}</h3>

							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Codigo</th>
										<th>Obrero</th>
										{
											value.product.map((prod, j) => {
												return <th key={j}>{prod.name_prod}</th>
											})
										}
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{value.workerList.map((workers, x) => {
										return <tr key={x}>
											<td>{x + 1}</td>
											<td>{workers.worker.co_ob}</td>
											<td>
												{workers.worker.nombre1} {' '}
												{workers.worker.nombre2} {' '}
												{workers.worker.apellido1} {' '}
												{workers.worker.apellido2}
											</td>
											{
												workers.production.map((product, q) => {
													return <td key={q}>
														{product.cant}
													</td>
												})
											}
											<td>{workers.worker.cant_total}</td>
										</tr>
									})
									}
								</tbody>
							</Table>
						</div>
					)
				})}
			</Container>
		</>
	)
}