const payment = {
    getProductionAmount:`SELECT DPO.id_prod, P.nombre_prod, P.precio_bs, P.precio_usd,
    	SUM(P.precio_bs) AS mont_bs, SUM(P.precio_usd) AS mont_usd ,SUM(cant) AS cant
        FROM detalle_produccion_obrero AS DPO
        INNER JOIN producto AS P ON P.id_prod = DPO.id_prod
    	INNER JOIN produccion_obrero AS PO on DPO.id_prod_ob = PO.id_prod_ob
        WHERE DPO.id_prod_ob=$1 AND PO.status = false GROUP BY DPO.id_prod, nombre_prod, precio_bs, precio_usd`,
    
    insertPayment:`INSERT INTO pago(id_us, id_prod_ob, fe_hr, total_bs, total_usd, status)VALUES ($1, $2, $3, $4, $5, $6)`,
    insertDetailPayment:`INSERT INTO detalle_pago(id_pago, id_prod, cant, mont_bs, mont_usd, total_bs, total_usd)
	    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    // getPayment: `SELECT fe_hr, total_bs, total_usd from pago WHERE fe_hr BETWEEN $1 AND $2`
    getPayment: `SELECT P.id_pago, P.id_prod_ob, P.fe_hr, P.total_bs, P.total_usd, 
        PO.cant_total, PO.fe_inicio, PO.id_obrero, 
        O.co_ob, O.nombre1, O.nombre2, O.apellido1, O.apellido2, O.ci FROM pago AS P
        INNER JOIN produccion_obrero AS PO ON P.id_prod_ob=PO.id_prod_ob
        INNER JOIN obrero AS O ON PO.id_obrero=O.id_obrero
        WHERE fe_hr BETWEEN $1 AND $2`,
    getPaymentDetail:`SELECT DP.id_pago, DP.id_prod, DP.cant, DP.total_bs, DP.total_usd, P.nombre_prod FROM detalle_pago AS DP
        INNER JOIN producto AS P ON DP.id_prod=P.id_prod
        WHERE id_pago=$1`
}

export default payment



// WHERE id_obrero=$1 AND fe_inicio BETWEEN $2 AND $3`,