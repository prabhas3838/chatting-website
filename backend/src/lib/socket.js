import { Server } from "socket.io";
import http from "http";
import express from "express";

import { socketAuthMiddleware } from "../middlewhere/socketAuthMiddlewhere.js";

import dotenv from "dotenv";
const app=express();    

const server=http.createServer(app);
const io=new Server(server,{cors:{
    origin:process.env.CLIENT_URL,
    methods:["GET","POST"],
    credentials:true,
}});


io.use(socketAuthMiddleware);

const usersocketMap={};

io.on("connection",(socket)=>{
    console.log(`New client connected: ${socket.id}, User: ${socket.user.fullname}`);

    usersocketMap[socket.userId]=socket.id;

    io.emit("getonlineusers",Object.keys(usersocketMap));

    socket.on("disconnect",()=>{   
        console.log(`Client disconnected: ${socket.id}, User: ${socket.user.fullname}`);
        delete usersocketMap[socket.userId];
        io.emit("getonlineusers",Object.keys(usersocketMap));
    });
});

export { io, app, server };