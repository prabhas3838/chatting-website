import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import messagesRoutes from "../src/routes/messageroutes.js"

import { connectDB } from "./lib/db.js";
dotenv.config();
const PORT=process.env.PORT;

const app = express();
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());

//app.get("/api/auth/signup", (req, res) => {res.send("signup ROUTE");});

//app.get("/api/auth/login", (req, res) => {res.send("LOGIN ROUTE");});

//app.get("/api/auth/logout", (req, res) => {res.send("LOGout route");});

app.use("/api/auth",authRoutes);
app.use("/api/messages",messagesRoutes);
//make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
})
