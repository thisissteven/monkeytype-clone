"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGameHander = exports.endGameHander = void 0;
const __1 = require("..");
const functions_1 = require("./functions");
const endGameHander = (socket) => {
    socket.on("end game", (roomId, mode) => {
        const toType = (0, functions_1.shuffleList)(mode).join(" ");
        __1.rooms[roomId] = {
            players: __1.rooms[roomId].players,
            toType,
            inGame: false,
            winner: socket.id,
        };
        // console.log(socket.id);
        // io.in(roomId).emit("winner", rooms[roomId].winner);
        __1.io.in(roomId).emit("end game", socket.id);
    });
};
exports.endGameHander = endGameHander;
const startGameHander = (socket) => {
    socket.on("start game", (roomId) => {
        __1.io.in(roomId).emit("words generated", __1.rooms[roomId].toType);
        __1.io.in(roomId).emit("start game");
        __1.rooms[roomId].inGame = true;
    });
};
exports.startGameHander = startGameHander;
