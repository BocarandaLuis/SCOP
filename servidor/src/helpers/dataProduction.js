const dataProduction = {
    insertProduction:`INSERT INTO produccion(id_us, fecha, total)VALUES ($1, $2, $3)`,
    insertDetailProduction:`INSERT INTO detalle_produccion(id_produccion, id_zona_ext, id_prod, cant)
        VALUES ($1, $2, $3, $4)`
}

export default dataProduction