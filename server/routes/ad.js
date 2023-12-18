import express from "express"
const router=express.Router();
 import * as ad from "../controllers/ad.js";
 import {requireSignin} from "../middlewares/auth.js"

 router.post('/upload-image',requireSignin,ad.uploadImage)
 router.post(('/delete-image'),requireSignin,ad.deleteImage)
 router.post('/ad',requireSignin,ad.create)

 export default router