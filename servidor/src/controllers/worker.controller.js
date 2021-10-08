import workerQuery from '../helpers/worker'
// import productQuery from '../helpers/product'
import db from '../database'
import { dateTime, orderDate, orderDate2 } from '../models/DateTime'
import { productsPerJob } from '../models/WorkerState'

export const signupWorker = async (req, res) => {
    try {
        console.log("signupWorker")
        console.log("req: ", req.body)
        let co_ob;
        const { ptrabajo, nombre1, nombre2, apellido1, apellido2, ci, tlf, email, fe_nacimiento, direccion } = req.body
        const worker_count = await db.query(`${workerQuery.getWorkerCount}`)
        const new_id = parseInt(worker_count.rows[0].count) + 1
        const new_worker_count = new_id
        co_ob = `OB-${new_worker_count}`
        const ins =  await db.query(`${workerQuery.signupWorker}`, [new_id, ptrabajo.id_ptrabajo, ptrabajo.id_ptrabajo, co_ob, nombre1, nombre2, apellido1, apellido2, ci, tlf, email, dateTime("date"), direccion, true])
        console.log("ins: ", ins)
        let body = {
            co_ob, 
            nombre1, 
            nombre2, 
            apellido1, 
            apellido2, 
            ci
        }
        res.status(200).json({ status: 200, message: "Se ha registrado un nuevo obrero", body })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}

export const producedUnitsCounter = async (req, res) => {
    try {
        const { cant, id_prod, id_obrero } = req.body
        const fehr = await dateTime()
        let id_prod_ob = await db.query(`${workerQuery.getIdProdObByIdWorker}`, [id_obrero, `${dateTime("date")} 00:00:00`, `${dateTime("date")} 23:59:59`])
        if (id_prod_ob.rows.length == 0) {
            id_prod_ob = null
        } else { id_prod_ob = id_prod_ob.rows[0].id_prod_ob }
        if (!id_prod_ob) {
            let cant_total = cant
            console.log("1")
            console.log("fecha: ", fehr)
            let resIdProduction = await db.query(`${workerQuery.insertProductionRecord} RETURNING id_prod_ob`, [id_obrero, cant_total, fehr, false])
            console.log("2")
            await db.query(`${workerQuery.producedUnitsCounter}`, [resIdProduction.rows[0].id_prod_ob, req.id_us, id_prod, cant, fehr])
            res.status(200).json({ status: 200, message: "Registro satisfactorio" })
            return
        } else {

            let resWorkerProduction = await db.query(`${workerQuery.getWorkerProductionByIdWorker}`, [id_obrero, `${dateTime("date")} 00:00:00`, `${dateTime("date")} 23:59:59`])
            let cant_total = parseFloat(resWorkerProduction.rows[0].cant_total) + cant
            
            console.log("3")
            await db.query(`${workerQuery.updateProductionRecord}`, [cant_total, id_prod_ob])
            console.log("4")
            await db.query(`${workerQuery.producedUnitsCounter}`, [id_prod_ob, req.id_us, id_prod, cant, fehr])
            res.status(200).json({ status: 200, message: "Registro satisfactorio" })
            return
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, message: "Ha ocurrdio un error" })
    }
}

export const getWorkerProduction = async (req, res) => {
    try {

        const d = await dateTime("date")
        const { id_obrero } = req.body
        let id_prod_ob = null
        let total = 0;
        const resWorker = await db.query(`${workerQuery.getWorker}`, [id_obrero])
        if (resWorker.rows.length == 0) {
            res.status(403).json({ status: 403, message: "No se obtuvo ningun resultado" });
            return;
        }
        const id_ptrabajo = resWorker.rows[0].id_ptrabajo
        let productionByWorker = productsPerJob(id_ptrabajo)

        const resProduction = await db.query(`${workerQuery.getWorkerProductionByIdWorker}`, [id_obrero, `${d} 00:00:00`, `${d} 23:59:59`])

        if (resProduction.rows.length > 0) {
            id_prod_ob = resProduction.rows[0].id_prod_ob
            const resWorkerProductionDetail = await db.query(`${workerQuery.getWorkerProductionDetail}`, [resProduction.rows[0].id_prod_ob])
            const detalle = resWorkerProductionDetail.rows
            detalle.forEach(data => {
                productsPerJob(id_ptrabajo).forEach((product, index) => {
                    if (data.id_prod == product.id_prod) {
                        productionByWorker[index].cant = data.sum
                        total = total + parseFloat(data.sum)
                    }
                })
            });

        }

        res.status(200).json({
            status: 200, meesage: "Ok",
            body: {
                obrero: resWorker.rows[0],
                productionByWorker,
                total: total,
                id_prod_ob: id_prod_ob
            }
        })
        // res.status(403).json({ status:403, message: `No tiene registro de producción para la fecha ${await dateTime("date")}` })

        // res.json("todo bien")
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}


export const getWorker = async (req, res) => {
    try {
        console.log("getWorker")
        const { parameter } = req.body
        let resWorker;
        if(parameter>999999){
            resWorker = await db.query(`${workerQuery.getWorkerByIc}`, [parameter])
        }
        if(parameter>0 && parameter<999999){
            resWorker = await db.query(`${workerQuery.getWorkerById}`, [parameter])
        }
        if(!(parameter>0)){
            resWorker = await db.query(`${workerQuery.getWorkerById}`, [parameter])
        }

        // const worker_count = await db.query(`${workerQuery.getWorkerCount}`)
        // await db.query(`${workerQuery.signupWorker}`, [id_ptrabajo, id_ptrabajo, co_ob, nombre1, nombre2, apellido1, apellido2, ci, tlf, email, dateTime("date"), direccion, true])
        let body = {
            co_ob:resWorker.rows[0].co_ob,
            nombre1:resWorker.rows[0].nombre1,
            nombre2:resWorker.rows[0].nombre2,
            apellido1:resWorker.rows[0].apellido1,
            apellido2:resWorker.rows[0].apellido2,
            tlf:resWorker.rows[0].tlf,
            fe_nacimiento:orderDate2(resWorker.rows[0].fe_nacimiento),
            ci:resWorker.rows[0].ci,
            ptrabajo:{ id_ptrabajo: resWorker.rows[0].id_ptrabajo, label: resWorker.rows[0].nombre_ptrabajo },
        }
        console.log(resWorker.rows[0])
        res.status(200).json({ status: 200, message: "Ok", body: body })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}