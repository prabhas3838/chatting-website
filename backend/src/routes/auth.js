import express from "express";
import { login, signup,logout, updateProfilePic } from "../controllers/authcontroller.js";
import { protectroute } from "../middlewhere/auth.middlewhere.js";
import { arcjetProtection } from "../middlewhere/arcjet.middlewhere.js";
import User from "../models/user.js";

const router=express.Router();


router.post("/signup", arcjetProtection, signup);
router.post("/login", arcjetProtection, login); // Fixed: Changed GET to POST
router.post("/logout", logout);

router.put("/update-profile",arcjetProtection,protectroute,updateProfilePic);

router.get(
    "/check",
    arcjetProtection,
    protectroute,
    async (req, res) => {
      const user = await User.findById(req.user._id).select("-password");
  
      res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilepic: user.profilepic,
      });
    }
  );
  







export default router;