import db from '../database'
import paymentQuery from '../helpers/payment'
import workerQuery from '../helpers/worker'
import { dateTime } from '../models/DateTime'
import { orderDate, orderDatePayment } from '../models/DateTime'
import { productsPerJob } from '../models/WorkerState'

export const getProductionAmount = async (req, res) => {
    try {
        const { id_obrero } = req.body
        let cantidad_total = 0
        let total_bs = 0
        let total_usd = 0
        const d = await dateTime("date")
        const resWorker = await db.query(`${workerQuery.getWorker}`, [id_obrero])
        if (resWorker.rows.length == 0) return res.status(403).json({ status:403, message: "El obrero descrito no se encuentra registrado" })
        const resIdWorkerProduction = await db.query(`${workerQuery.getIdProdObByIdWorker}`, [id_obrero, `${d} 00:00:00`, `${d} 23:59:59`])
        
        if (resIdWorkerProduction.rows.length == 0) return res.status(403).json({ status:403, message: "No se obtuvo registro de produccion" })
        const resProductionAmount = await db.query(`${paymentQuery.getProductionAmount}`, [resIdWorkerProduction.rows[0].id_prod_ob])
        
        for(let i=0; i< resProductionAmount.rows.length; i++){
            cantidad_total = cantidad_total + parseFloat(resProductionAmount.rows[i].cant)
            total_bs = total_bs + parseFloat(resProductionAmount.rows[i].mont_bs)
            total_usd = total_usd + parseFloat(resProductionAmount.rows[i].mont_usd)
        }    

        res.status(200).json({
            status:200,
            message: "Se obtuvo el registro satisfactoriamente",
            body: {
                worker: resWorker.rows[0], 
                listProductionAmount:[{
                    production: resProductionAmount.rows,
                    id_prod_ob: resIdWorkerProduction.rows[0].id_prod_ob,
                    date: d,
                    cant: cantidad_total, 
                    mont_bs:total_bs, 
                    mont_usd: total_usd
                    }],
            }
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAllProductionAmount = async (req, res) => {
    try {
        const { id_obrero } = req.body
        let list = []
        const resWorker = await db.query(`${workerQuery.getWorker}`, [id_obrero])
        if (resWorker.rows.length == 0) return res.status(403).json({ status:403, message: "El obrero descrito no de encuentra registrado" })
        const resIdWorkerProduction = await db.query(`${workerQuery.getAllProdObByIdWorker}`, [id_obrero])
        if (resIdWorkerProduction.rows.length == 0) return res.status(403).json({ status:403, message: "No se obtuvo registro de producción" })
        for (let index = 0; index < resIdWorkerProduction.rows.length; index++) {
            const resProductionAmount = await db.query(`${paymentQuery.getProductionAmount}`, [resIdWorkerProduction.rows[index].id_prod_ob])
            let date = orderDate(`${resIdWorkerProduction.rows[index].fe_inicio}`)
            let totalAmountBS = 0, totalAmountUSD = 0, totalQuantity = 0;
            for (let j = 0; j < resProductionAmount.rows.length; j++) {
                totalAmountBS = totalAmountBS + parseFloat(resProductionAmount.rows[j].mont_bs)
                totalAmountUSD = totalAmountUSD + parseFloat(resProductionAmount.rows[j].mont_usd)
                totalQuantity = totalQuantity + parseFloat(resProductionAmount.rows[j].cant)
            }
            list.push({
                
                production: resProductionAmount.rows,
                date: date,
                id_prod_ob: resIdWorkerProduction.rows[index].id_prod_ob,
                mont_bs: totalAmountBS,
                mont_usd: totalAmountUSD,
                cant: totalQuantity
            })
        }

        res.status(200).json({
            status:200,
            message: "Se obtuvo el registro satisfactoriamente",
            body: {
                worker: resWorker.rows[0],
                listProductionAmount: list,
            }
        })

        // res.status(200).json({ message: "respuesta" })
    } catch (error) {
        console.log(error)
        res.status(500).json({status:500, message: "Ha ocurrido un error" })
    }
}


export const paymentExecution = async (req, res) => {
    try {
        const { id_obrero, date, id_prod_ob, mont_usd, mont_bs, cant, production} = req.body
            const id_pago = await db.query(`${paymentQuery.insertPayment} RETURNING id_pago`, [req.id_us, id_prod_ob, dateTime(), mont_bs, mont_usd, true])
            for (let j = 0; j < production.length; j++) {
                await db.query(`${paymentQuery.insertDetailPayment}`, [
                    id_pago.rows[0].id_pago, production[j].id_prod, production[j].cant, production[j].precio_bs, 
                    production[j].precio_usd, production[j].mont_bs, production[j].mont_usd])
                await db.query(`${workerQuery.updateStatusProductionWorker}`, [id_prod_ob])
            }
        res.status(200).json({status: 200, message:"Ejecución de pago exitoso"})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 200, message: "Ha ocurrido un error" })
    }
}


export const getPayment = async(req, res) =>{
     try {
        const {date} = req.body
        let paymentList = []
        const resPayment = await db.query(`${paymentQuery.getPayment}`,[`${date||dateTime("date")} 00:00:00`, `${date||dateTime("date")} 23:59:59`])
        if(resPayment.rows.length == 0) return res.status(403).json({status: 403, message: `No hay registrado de pago para la fecha ${date||dateTime("date")}`})


        for(let i=0; i<resPayment.rows.length; i++){
            let paymentDetail = []
            let id_pago = resPayment.rows[i].id_pago
            resPayment.rows[i].fe_hr = orderDatePayment(resPayment.rows[i].fe_hr)
            resPayment.rows[i].fe_inicio = orderDate(resPayment.rows[i].fe_inicio)
            
            const resPaymentDetail = await db.query(`${paymentQuery.getPaymentDetail}`,[id_pago])
            paymentDetail = resPaymentDetail.rows
            paymentList.push({worker: resPayment.rows[i], paymentDetail: paymentDetail})
        }
        for(let i=0; i<resPayment.rows.length; i++){
            resPayment.rows[i].fe_hr = orderDatePayment(resPayment.rows[i].fe_hr)
        }
        res.status(200).json({status: 200, message:"Petición realizada con exito", body: paymentList})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, message: "Ha ocurrido un error" })
    }
}