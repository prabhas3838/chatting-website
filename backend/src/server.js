import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import messagesRoutes from "../src/routes/messageroutes.js"
dotenv.config();
const PORT=process.env.PORT;

const app = express();

//app.get("/api/auth/signup", (req, res) => {res.send("signup ROUTE");});

//app.get("/api/auth/login", (req, res) => {res.send("LOGIN ROUTE");});

//app.get("/api/auth/logout", (req, res) => {res.send("LOGout route");});

app.use("/api/auth",authRoutes);
app.use("/api/messages",messagesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})
