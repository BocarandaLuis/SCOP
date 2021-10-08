import { Router } from "express";
import * as dataProductionCtrl from '../controllers/dataProduction.controller'
import * as authJwt from '../middlewares/authJwt'

const router = Router()


// router.post('/',[authJwt.verifyToken, authJwt.isSystemSupervisor], dataProductionCtrl.getDataProduction)
router.post('/insertDataProduction',[authJwt.verifyToken, authJwt.isSystemSupervisor], dataProductionCtrl.insertDataProduction)


export default router


