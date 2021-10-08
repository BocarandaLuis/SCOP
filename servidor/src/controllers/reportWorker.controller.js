import db from '../database'
import workerQuery from '../helpers/worker'
import reportWorker from '../helpers/reportWorker'
import { dateTime, orderDate } from '../models/DateTime'
import { productsPerJob } from '../models/WorkerState'

export const getReportWorkerProduction = async (req, res) => {
    try {
        const {date, time} = req.body
        let d = date || null
        if(!date) d = await dateTime("date")
        let groups = []
        for(let j=1; j<7; j++){
            const resProduction = await db.query(`${reportWorker.getAllWorkerProduction}`, [ j,`2021-10-04 00:00:00`, `2021-10-04 23:59:59`])
            if(resProduction.rows.length > 0){
                let workerList = []
                let size = resProduction.rows.length
                let list = resProduction.rows
                let nombre_sala = resProduction.rows[0].nombre_sala
                for(let i=0; i<size; i++) {
                let productionByWorker = JSON.parse(JSON.stringify(productsPerJob(list[i].id_ptrabajo)))

                    let id_prod_ob = list[i].id_prod_ob
                    const resWorkerProductionDetail = await db.query(`${workerQuery.getWorkerProductionDetail}`, [id_prod_ob])
                    const detalle = resWorkerProductionDetail.rows
                    detalle.forEach(data => {

                        productsPerJob(list[i].id_ptrabajo).forEach((product, index) => {
                            if (data.id_prod == product.id_prod) {
                                productionByWorker[index].cant = data.sum
                            }
                        })
                    })

                    workerList.push({worker: list[i], production: productionByWorker})

                }    
                    groups.push({sala: nombre_sala, workerList, product: productsPerJob(list[0].id_ptrabajo)})
            }

        }    
            if(groups.length == 0) return res.status(403).json({status:403, message:`No hay reporte de producción para la fecha ${d}`}) 
            
            res.status(200).json({status:200, message:"Resultado exitoso", body: groups})


    } catch (error) {
        console.log(error)
        res.status(500).json({ status:500, message: "Ha ocurrido un error" })
    }
}
