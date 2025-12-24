import express from "express";
import { login, signup,logout, updateProfilePic } from "../controllers/authcontroller.js";
import { protectroute } from "../middlewhere/auth.middlewhere.js";
import { arcjetProtection } from "../middlewhere/arcjet.middlewhere.js";

const router=express.Router();


router.get("/signup" ,arcjetProtection,signup);

router.get("/login",arcjetProtection, login);

router.get("/logout", logout);

router.put("/update-profile",arcjetProtection,protectroute,updateProfilePic);

router.get("/check",arcjetProtection,protectroute,(req,res)=>{res.status(200).json(req.user)});







export default router;