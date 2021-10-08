import React from 'react'

import {
	Modal,
	Container,
	Table,
	Row,
	Col
} from 'react-bootstrap'

export default function TableDataWeighingReport(data) {
	let d = data.data.data
	let total = data.data.total
	return (
		<>
			<Container className="scroll">
				<div>
					

					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Zona de extracción</th>
								<th>Producto</th>
								<th>Cantidad</th>
							</tr>
						</thead>
						<tbody>
							{d.map((value, i) => {
								return (<tr key={i}>

									<td>{i + 1}</td>
									<td>{value.nombre_zona_ext}</td>
									<td>{value.nombre_prod}</td>
									<td>{value.cant}</td>
								</tr>)
								})
							}
						</tbody>
					</Table>
					<Row className=" mx-1 d-flex justify-content-end align-items-center " style={{ background: "#CACFD2" }}>
                        <Col lg={10} />
                        <Col> <h5>{total}</h5></Col>
                    </Row>
				</div>
			</Container>
		</>
	)
}