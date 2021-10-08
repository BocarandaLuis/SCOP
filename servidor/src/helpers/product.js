const product = {
    getProduct:`SELECT * FROM producto ORDER BY id_prod ASC`,
    updateProduct:`UPDATE producto SET precio_bs=$1, precio_usd=$2 WHERE id_prod=$3`
}

export default product