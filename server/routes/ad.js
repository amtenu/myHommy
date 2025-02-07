import express from "express"
const router=express.Router();
 import * as ad from "../controllers/ad.js";
 import {requireSignin} from "../middlewares/auth.js"

 router.post('/upload-image',requireSignin,ad.uploadImage)
 router.post(('/delete-image'),requireSignin,ad.deleteImage)
 router.post('/ad',requireSignin,ad.create)
 router.get('/ads',ad.ads);
 router.get('/ad/:slug',ad.read)

 //wishlists

 router.post("/wishlist",requireSignin,ad.addToWishlist)
 router.delete("/wishlist/:adId",requireSignin,ad.removeFromWishlist)

 //contact

 router.post("/contact-seller",requireSignin,ad.contactSeller)

 //queries

 router.get("/user-ads/:page",requireSignin,ad.userAds)
 router.get('/enquiried-properties',requireSignin,ad.enquiriedProperties)
 router.get('/wishListed',requireSignin,ad.wishListed)

 //edit

 router.put("/ad/:_id",requireSignin,ad.updateAd)

 //delete ad

 router.delete("/ad/:_id",requireSignin,ad.remove)
 
 //search
 router.get("/search",ad.search)



 export default router