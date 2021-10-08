import { Router } from "express";
import * as reportWorker from '../controllers/reportWorker.controller'
import * as authJwt from '../middlewares/authJwt'

const router = Router()


router.post('/',[authJwt.verifyToken, authJwt.isSystemSupervisor], reportWorker.getReportWorkerProduction)
// router.post('/',[authJwt.verifyToken, authJwt.isSystemSupervisor])
// router.post('/',[authJwt.verifyToken])



// verificar si ya a iniciado sesion, para evitar multiples sesiones con el mismo usuario
// router.post('/signin', authCtrl.signin)  



export default router


