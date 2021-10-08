const reportWorker = {
	// getAllWorkerProduction:`SELECT id_prod_ob, id_obrero, co_ob, id_ptrabajo, nombre1, nombre2, apellido1, 
	// apellido2, cant_total FROM produccion_obrero AS PO
	// INNER JOIN obrero AS O ON PO.id_obrero = O.id_obrero
	// INNER JOIN puesto_trabajo AS PT ON PT.id_ptrabajo = O.id_ptrabajo
	// WHERE PO.fe_inicio BETWEEN $1 AND $2 GROUP BY PO.id_prod_ob`,

	getAllWorkerProduction: `SELECT PO.id_prod_ob, PO.id_obrero, O.co_ob, O.id_ptrabajo, PT.nombre_ptrabajo, O.nombre1, O.nombre2, O.apellido1, 
	O.apellido2, S.nombre_sala, PO.cant_total FROM produccion_obrero AS PO
	INNER JOIN obrero AS O ON PO.id_obrero = O.id_obrero
	INNER JOIN puesto_trabajo AS PT ON PT.id_ptrabajo = O.id_ptrabajo
	INNER JOIN sala AS S ON S.id_sala = O.id_sala
	WHERE S.id_sala=$1 AND PO.fe_inicio BETWEEN $2 AND $3
	GROUP BY PO.id_prod_ob, PO.id_obrero, O.co_ob, O.id_ptrabajo, PT.nombre_ptrabajo,  S.nombre_sala,
	O.nombre1, O.nombre2, O.apellido1, O.apellido2, S.id_sala
	ORDER BY S.id_sala`,
	// getAttendanceReport: `SELECT co_ob, nombre1, nombre2, apellido1, apellido2, ci, nombre_sala, nombre_ptrabajo
	// 	FROM 
	// 	`

}

export default reportWorker