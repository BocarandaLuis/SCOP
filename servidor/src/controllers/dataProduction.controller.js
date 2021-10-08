import dataProductionQuery from '../helpers/dataProduction'
import db from '../database'
import { dateTime } from '../models/DateTime'

export const insertDataProduction = async (req, res) => {
    try {
        console.log("insertDataProduction")
        const { productionList } = req.body
        console.log(req.body)
        let total = 0
        const d = dateTime('date')
        if(productionList == 0) return res.status(403).json({ status:403, message: "Ha ocurrido un problema, la lista esta vacía" })
        for(let i=0; i<productionList.length; i++){
           total = total + parseFloat(productionList[i].quantity)
        }
        console.log("total: ", total)
        console.log("apunto de hacer insert de produccion")
        const resInsertProd = await db.query(`${dataProductionQuery.insertProduction} RETURNING id_produccion`, [req.id_us, d, total])
         for(let i=0; i<productionList.length; i++){
            console.log("productionList: ", productionList)
            await db.query(`${dataProductionQuery.insertDetailProduction}`, 
                [resInsertProd.rows[0].id_produccion, productionList[i].extArea.id_zona_ext, productionList[i].product.id_prod, productionList[i].quantity])
        }
         

        res.status(200).json({ status:200, message: "Se ha guardado correctamente" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status:500, message: "Ha ocurrido un error" })
    }
}