const worker = {
    getWorkerByIc: `SELECT O.id_obrero, O.nombre1, O.nombre2, O.apellido1, O.apellido2, O.ci, O.co_ob, O.tlf, O.fe_nacimiento, O.id_ptrabajo, PT.nombre_ptrabajo 
        FROM obrero AS O INNER JOIN puesto_trabajo AS PT ON O.id_ptrabajo=PT.id_ptrabajo WHERE O.ci=$1`,
    getWorkerById: `SELECT O.id_obrero, O.nombre1, O.nombre2, O.apellido1, O.apellido2, O.ci, O.co_ob, O.tlf, O.fe_nacimiento, O.id_ptrabajo, PT.nombre_ptrabajo
     FROM obrero AS O INNER JOIN puesto_trabajo AS PT ON O.id_ptrabajo=PT.id_ptrabajo WHERE O.id_obrero=$1`,
    signupWorker:`INSERT INTO obrero(
        id_obrero, id_sala, id_ptrabajo, co_ob, nombre1, nombre2, apellido1, apellido2, ci, tlf, email, fe_nacimiento, direccion, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
	getWorkerCount: `SELECT count(*) FROM obrero`,
    getWorker: `SELECT O.id_obrero, O.co_ob, O.id_ptrabajo, PT.nombre_ptrabajo, O.nombre1, O.nombre2, O.apellido1, O.apellido2, ci FROM obrero AS O
    INNER JOIN puesto_trabajo AS PT ON O.id_ptrabajo = PT.id_ptrabajo WHERE O.id_obrero=$1`,
    // produccion de los obreros
    producedUnitsCounter: `INSERT INTO detalle_produccion_obrero(id_prod_ob, id_us, id_prod, cant, fe_hr) VALUES ($1, $2, $3, $4, $5)`,
    getWorkerProductionByIdWorker: `SELECT id_prod_ob, cant_total, fe_inicio FROM produccion_obrero WHERE id_obrero=$1 AND fe_inicio BETWEEN $2 AND $3`,
    getIdProdObByIdWorker: `SELECT id_prod_ob, fe_inicio FROM produccion_obrero WHERE id_obrero=$1 AND fe_inicio BETWEEN $2 AND $3`,
    getAllProdObByIdWorker: `SELECT id_prod_ob, fe_inicio FROM produccion_obrero WHERE id_obrero=$1 AND status=false`,
    insertProductionRecord: `INSERT INTO produccion_obrero (id_obrero, cant_total, fe_inicio, status) VALUES($1, $2, $3, $4)`,
    updateProductionRecord: `UPDATE produccion_obrero SET cant_total=$1 WHERE id_prod_ob=$2`,
    getWorkerProductionDetail: `SELECT DPO.id_prod, P.nombre_prod, SUM(cant) FROM detalle_produccion_obrero AS DPO
        INNER JOIN producto AS P ON P.id_prod = DPO.id_prod
        WHERE DPO.id_prod_ob=$1 GROUP BY DPO.id_prod, nombre_prod`,
    updateStatusProductionWorker:`UPDATE produccion_obrero SET status=true WHERE id_prod_ob=$1`
}


export default worker