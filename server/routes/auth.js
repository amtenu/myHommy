import express from "express"
const router=express.Router();
 import * as auth from "../controllers/auth.js";
 import {requireSignin} from "../middlewares/auth.js"



router.get('/',requireSignin,auth.welcome)
router.post("/pre-register",auth.preRegister) //Until they validiate with comformation email
router.post("/register",auth.register)
router.post("/login",auth.login)
router.post('/forgotpassword',auth.forgotPassword)
router.post('/accessaccount',auth.accessaccount)
router.get('/referesh-token',auth.refereshToken)
router.get('/current-user',auth.currentuser)


export default router