import express from "express"
const router=express.Router();
 import * as auth from "../controllers/auth.js";
 import {requireSignin} from "../middlewares/auth.js"



router.get('/',requireSignin,auth.welcome)
router.post("/pre-register",auth.preRegister) //Until they validiate with comformation email
router.post("/register",auth.register)
router.post("/login",auth.login)
router.post('/forgot-password',auth.forgotPassword)
router.post('/access-account',auth.accessaccount)
router.get('/refresh-token',auth.refreshToken)
router.get('/current-user',requireSignin,auth.currentuser)
router.get('/profile/:username',auth.publicProfile)
router.put('/update-password',requireSignin,auth.updatePassword)
router.put('/update-profile',requireSignin,auth.updateProfile)



export default router