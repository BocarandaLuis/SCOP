import db from '../database'
import productQuery from '../helpers/product'


export const getProduct = async (req, res) => {
    try {
        console.log("getProduct")
        const productList = await db.query(`${productQuery.getProduct}`, [])
        console.log("productList: ", productList.rows )
            res.status(200).json({status:200, message:"Resultado exitoso", body: productList.rows})


    } catch (error) {
        console.log(error)
        res.status(500).json({ status:500, message: "Ha ocurrido un error" })
    }
}


export const updateProduct = async (req, res) => {
    try {
        console.log("updateProduct")
        const {id_prod, precio_bs, precio_usd} = req.body
        await db.query(`${productQuery.updateProduct}`, [precio_bs, precio_usd, id_prod])
            res.status(200).json({status:200, message:"Resultado exitoso"})


    } catch (error) {
        console.log(error)
        res.status(500).json({ status:500, message: "Ha ocurrido un error" })
    }
}
