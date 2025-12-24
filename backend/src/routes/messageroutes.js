import express from "express"
import { getAllContacts } from "../controllers/messagecontroller.js"
import { protectroute } from "../middlewhere/auth.middlewhere.js";
import { getMessagesByUserId } from "../controllers/messagecontroller.js";
import { sendMessage } from "../controllers/messagecontroller.js";
import { getChatPatners } from "../controllers/messagecontroller.js";
import { arcjetProtection } from "../middlewhere/arcjet.middlewhere.js";

const router=express.Router()

router.use(arcjetProtection,protectroute);

router.get("/contacts",getAllContacts);
router.get("/chats",getChatPatners);
router.get("/:id",getMessagesByUserId);

router.post("/send/:id",sendMessage);


//router.post("/send/:id",sendMessage);
export default router;
