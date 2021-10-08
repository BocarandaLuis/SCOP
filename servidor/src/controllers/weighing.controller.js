import weighingQuery from '../helpers/weighing'
import db from '../database'
import { dateTime } from '../models/DateTime'

export const insertDataWeighing = async (req, res) => {
    try {
        console.log("insertDataWeighing")
        const { weighingList } = req.body
        console.log(req.body)
        let total = 0
        const d = dateTime('date')
        if(weighingList == 0) return res.status(403).json({ status:403, message: "Ha ocurrido un problema, la lista esta vacía" })
        for(let i=0; i<weighingList.length; i++){
           total = total + parseFloat(weighingList[i].quantity)
        }
        console.log("total: ", total)
        console.log("apunto de hacer insert de produccion")
        const resInsertWeighing = await db.query(`${weighingQuery.insertWeighing} RETURNING id_pesaje`, [req.id_us, d, total])
         console.log("res: ", resInsertWeighing)
         for(let i=0; i<weighingList.length; i++){
            console.log("weighingList: ", weighingList)
            await db.query(`${weighingQuery.insertDetailWeighing}`, 
                [resInsertWeighing.rows[0].id_pesaje, 
                weighingList[i].extArea.id_zona_ext, 
                weighingList[i].product.id_prod, 
                weighingList[i].quantity])
        }
         

        res.status(200).json({ status:200, message: "Se ha guardado correctamente la lista de productos pesados" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status:500, message: "Ha ocurrido un error" })
    }
}


export const getDataWeighing = async(req, res) =>{
    try{
        console.log("getDataWeighing");
        const {date, time} = req.body
        let d = date || null;
        let data = []
        if(!date) d = await dateTime("date")
        console.log("fecha: ", d)
        const resReportWeighing = await db.query(`${weighingQuery.getDataWeighing}`, [d])
        
        if(resReportWeighing.rows.length>0){
            let total = resReportWeighing.rows[0].total
            for(let i=0; i < resReportWeighing.rows.length; i++){
                let cant = resReportWeighing.rows[i].cant
                let nombre_prod = resReportWeighing.rows[i].nombre_prod
                let nombre_zona_ext = resReportWeighing.rows[i].nombre_zona_ext
                data.push({cant: cant, nombre_prod: nombre_prod, nombre_zona_ext: nombre_zona_ext})
            }
            res.status(200).json({ status:200, message: "Ok", body: {data, total: total}})
            return 
        }
        res.status(403).json({ status:403, message: `No se hay registro para la fecha ${d}`})


    }catch(error){
        console.log(error)
        res.status(500).json({ status:500, message: "Ha ocurrido un error" })
    }
}
