import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller'
import * as verifySignup from "../middlewares/verifySignup";
import * as authJwt from '../middlewares/authJwt'

const router = Router()


router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, authJwt.verifyToken, authJwt.isAdmin], authCtrl.signup)
        
router.post('/signin',[authJwt.checkDuplicateSession], authCtrl.signin)  
router.post('/logout',[authJwt.verifyToken], authCtrl.logout)  



export default router


