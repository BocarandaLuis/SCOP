const dataWeighing = {
    insertWeighing:`INSERT INTO pesaje(id_us, fecha, total)VALUES ($1, $2, $3)`,
    insertDetailWeighing:`INSERT INTO detalle_pesaje(id_pesaje, id_zona_ext, id_prod, cant)
        VALUES ($1, $2, $3, $4)`,
    getDataWeighing:`SELECT P.total, ZE.nombre_zona_ext, PR.nombre_prod, DP.cant FROM pesaje AS P 
    INNER JOIN detalle_pesaje AS DP ON P.id_pesaje=DP.id_pesaje
    INNER JOIN zona_extraccion AS ZE ON DP.id_zona_ext=ZE.id_zona_ext
    INNER JOIN producto AS PR ON DP.id_prod=PR.id_prod 
    WHERE P.fecha=$1`

}

export default dataWeighing