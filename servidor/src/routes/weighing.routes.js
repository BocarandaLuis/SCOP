import { Router } from "express";
import * as weighingCtrl from '../controllers/weighing.controller'
import * as authJwt from '../middlewares/authJwt'

const router = Router()


router.post('/',[authJwt.verifyToken, authJwt.isWeightSupervisor], weighingCtrl.getDataWeighing)
router.post('/insertDataWeighing',[authJwt.verifyToken, authJwt.isWeightSupervisor], weighingCtrl.insertDataWeighing)


export default router


