"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectHandler = void 0;
const __1 = require("..");
const disconnectHandler = (socket) => {
    socket.on("disconnect", () => {
        // disconnected client id
        // console.log("disconnected");
        const sockets = Array.from(__1.io.sockets.sockets).map((socket) => socket[0]);
        __1.io.to("public").emit("online users", sockets.length);
        // the rooms player is currently in
        const disconnectPlayerFrom = __1.playerRooms[socket.id];
        if (!disconnectPlayerFrom)
            return;
        disconnectPlayerFrom.forEach((roomId) => {
            if (!__1.rooms[roomId])
                return;
            const players = __1.rooms[roomId].players;
            __1.rooms[roomId].players = players.filter((player) => {
                if (player.id === socket.id) {
                    // io.in(roomId).emit("leave room", player.username);
                    __1.io.in(roomId).emit("receive chat", { username: player.username, value: "left", id: player.id });
                }
                return player.id !== socket.id;
            });
            __1.io.in(roomId).emit("room update", __1.rooms[roomId].players);
            if (__1.rooms[roomId].players.length === 0) {
                delete __1.rooms[roomId];
            }
        });
        // remove player
        delete __1.playerRooms[socket.id];
        // console.log("disconnect", rooms);
        // console.log(io.sockets.adapter.rooms);
    });
};
exports.disconnectHandler = disconnectHandler;
