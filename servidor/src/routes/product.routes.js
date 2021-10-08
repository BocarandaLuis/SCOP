import { Router } from "express";
import * as productCtrl from '../controllers/product.controller'
import * as authJwt from '../middlewares/authJwt'

const router = Router()


router.post('/',[authJwt.verifyToken, authJwt.isCashier], productCtrl.getProduct)
router.post('/updateProduct',[authJwt.verifyToken, authJwt.isCashier], productCtrl.updateProduct)


export default router


