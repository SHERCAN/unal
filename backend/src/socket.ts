import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

let io: Server;

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: '*', // Adjust for production
            methods: ['GET', 'POST']
        },
        transports: ['websocket', 'polling']
    });

    io.on('connection', (socket) => {
        console.log(`🔌 Client connected: ${socket.id}`);

        socket.on('disconnect', (reason) => {
            console.log(`🔌 Client disconnected: ${socket.id} (Reason: ${reason})`);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        console.warn('⚠️ getIO called before initialization');
    }
    return io;
};

export const notifyProgressUpdate = (userId: string) => {
    if (io) {
        console.log(`📢 [Socket] Emitting progressUpdate for student: ${userId}`);
        io.emit('progressUpdate', { userId, timestamp: new Date().toISOString() });
    } else {
        console.error('❌ [Socket] Failed to emit: io is not initialized');
    }
};
