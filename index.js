const express = require("express");
const app = express();
const {PORT}=require("./config/index");
const socketIO = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIO(server);
require('./sockets')(io);




app.use(express.static("./public/"));



server.listen(PORT,()=>{

    console.log(`Aplication running on port: ${PORT}`);

})
