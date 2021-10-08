import workerQuery from '../helpers/worker'
import db from '../database'

export const checkDuplicateIcOrEmailWorker = async (req, res, next) => {
    try {
      const worker = await db.query(`${workerQuery.getWorkerByIc}`, [req.body.ci])
      if (worker.rows.length > 0) return res.status(400).json({ message: "La cedula de identidad ya existe" })
      next()
    } catch (error) {
      console.error(error)
      res.status(403).json({response:"Ha ocurrido un error al verificar "})
    }
  }