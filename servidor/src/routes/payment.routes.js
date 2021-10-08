import { Router } from "express";
import * as paymentCtrl from '../controllers/payment.controller'
import * as authJwt from '../middlewares/authJwt'

const router = Router()


router.post('/',[authJwt.verifyToken, authJwt.isCashier], paymentCtrl.getProductionAmount)
router.post('/getList',[authJwt.verifyToken, authJwt.isCashier], paymentCtrl.getAllProductionAmount)
router.post('/paymentExecution',[authJwt.verifyToken, authJwt.isCashier], paymentCtrl.paymentExecution)
router.post('/getPayment',[authJwt.verifyToken, authJwt.isCashier], paymentCtrl.getPayment)
        


// verificar si ya a iniciado sesion, para evitar multiples sesiones con el mismo usuario
// router.post('/signin', authCtrl.signin)  



export default router


