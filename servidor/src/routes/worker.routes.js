import { Router } from "express";
import * as workerCtrl from '../controllers/worker.controller'
import * as authJwt from '../middlewares/authJwt'
import * as verifySignupWorker from '../middlewares/verifySignupWorker'

const router = Router()


router.post('/signup', [verifySignupWorker.checkDuplicateIcOrEmailWorker, authJwt.verifyToken, authJwt.isSystemSupervisor], workerCtrl.signupWorker)
router.post('/getWorker', [authJwt.verifyToken, authJwt.isSystemSupervisor], workerCtrl.getWorker)
router.post('/producedUnitsCounter', [authJwt.verifyToken, authJwt.isAnalyst], workerCtrl.producedUnitsCounter)
router.post('/getWorkerProduction', [authJwt.verifyToken, authJwt.isAnalyst], workerCtrl.getWorkerProduction)
// router.post('/signin', authCtrl.signin)



export default router

 
