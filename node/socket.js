const { Server } = require('socket.io');

const initializeWebSocket = (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);
        
        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

module.exports = initializeWebSocket;
