"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rooms = exports.playerRooms = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const roomHandler_1 = require("./lib/roomHandler");
const disconnectHandler_1 = require("./lib/disconnectHandler");
const gameHandler_1 = require("./lib/gameHandler");
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(cors_1.default);
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://mtype.vercel.app",
            "https://monkeytype-clone.vercel.app",
            "https://typez.vercel.app",
        ],
        methods: ["GET", "POST"],
    },
});
exports.playerRooms = {};
// rooms will consist of key value pair, key being room id, pair being users inside that room and their corresponding data
exports.rooms = {};
exports.io.on("connection", (socket) => {
    // console.log(io.sockets.adapter.rooms);
    // console.log(sockets);
    // console.log(socket.rooms);
    // console.log("connected");
    socket.join("public");
    const sockets = Array.from(exports.io.sockets.sockets).map((socket) => socket[0]);
    exports.io.to("public").emit("online users", sockets.length);
    // send online users
    socket.on("get online users", () => {
        const sockets = Array.from(exports.io.sockets.sockets).map((socket) => socket[0]);
        exports.io.to("public").emit("online users", sockets.length);
    });
    // chat handlers
    socket.on("send chat", ({ username, value, roomId, id }) => {
        console.log(roomId);
        exports.io.to(roomId).emit("receive chat", { username, value, id, type: "message", roomId });
    });
    // handle user disconnect
    (0, disconnectHandler_1.disconnectHandler)(socket);
    // game handlers
    (0, gameHandler_1.startGameHander)(socket);
    (0, gameHandler_1.endGameHander)(socket);
    // room handlers
    (0, roomHandler_1.joinRoomHander)(socket);
    (0, roomHandler_1.leaveRoomHandler)(socket);
    (0, roomHandler_1.createRoomHandler)(socket);
    (0, roomHandler_1.updateRoomHandler)(socket);
});
server.listen(port, () => {
    console.log(`Listening to server on port ${port}`);
});
