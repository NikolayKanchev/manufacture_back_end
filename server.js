const http = require('http');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT;

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    console.log("Socket joined", socket.id);
    
    // sends out to all the clients
    io.emit("outgoing data", { num: '9' });

    socket.on("join", (data) => {
        io.emit("on join", data)
    })

    socket.on("question", (data)=>{
        console.log(data);
        
        // sends out to all the clients
        io.emit("get question", data);
    });

    // socket.on("I'm thinking about this", data => {
    //     console.log(data);

        // sends out to all the clients
        // io.emit("Someone said", { message: escape(data.message) });

        // only sends to the client itself
        // socket.emit("Someone said", data);
        
        //socket.broadcast sends to all clients but the client itself

        // sends to all clients but the client itself
        // socket.broadcast.emit("Someone said", data);
    // });
    
    socket.on("disconnect", () => {
        console.log("Socket - ", socket.id, " - left!");
    });
});

server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on Port:", PORT);
});