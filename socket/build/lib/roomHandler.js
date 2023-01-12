"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveRoomHandler = exports.joinRoomHander = exports.updateRoomHandler = exports.createRoomHandler = void 0;
const __1 = require("..");
const functions_1 = require("./functions");
const createRoomHandler = (socket) => {
    socket.on("create room", (roomId, mode) => {
        if (__1.io.sockets.adapter.rooms.get(roomId)) {
            socket.emit("room already exist");
        }
        else {
            const toType = (0, functions_1.shuffleList)(mode).join(" ");
            __1.rooms[roomId] = {
                players: [],
                toType,
                inGame: false,
                winner: null,
            };
            socket.emit("words generated", __1.rooms[roomId].toType);
            socket.emit("create room success", roomId);
            // console.log(roomId);
            // console.log(io.sockets.adapter.rooms.get(roomId));
            // const sockets = Array.from(io.sockets.sockets).map((socket) => socket[0]);
            // console.log("room created: ", socket.rooms);
        }
    });
};
exports.createRoomHandler = createRoomHandler;
const updateRoomHandler = (socket) => {
    socket.on("room update", (user) => {
        const { roomId } = user;
        if (!__1.rooms[roomId])
            return;
        const players = __1.rooms[roomId].players;
        __1.rooms[roomId].players = players.map((player) => (player.id !== user.id ? player : user));
        __1.io.in(roomId).emit("room update", __1.rooms[roomId].players);
        // start game
        // const allPlayersReady = rooms[roomId].players.every((player) => player.isReady);
        // if (allPlayersReady) {
        // 	io.in(roomId).emit("start game");
        // 	rooms[roomId].inGame = true;
        // } else {
        // 	rooms[roomId].inGame = false;
        // }
    });
};
exports.updateRoomHandler = updateRoomHandler;
const joinRoomHander = (socket) => {
    socket.on("join room", ({ roomId, user }) => {
        socket.emit("end game");
        const room = __1.rooms[roomId];
        if (!room) {
            socket.emit("room invalid");
            return;
        }
        else if (__1.rooms[roomId].inGame) {
            socket.emit("room in game");
            return;
        }
        else {
            __1.rooms[roomId].players = [...__1.rooms[roomId].players, user];
            __1.playerRooms[socket.id] = [roomId];
        }
        socket.join(roomId);
        socket.emit("words generated", __1.rooms[roomId].toType);
        __1.io.in(roomId).emit("room update", __1.rooms[roomId].players);
        // socket.to(roomId).emit("notify", `${user.username} is here.`);
        __1.io.in(roomId).emit("receive chat", { username: user.username, value: "joined", id: user.id, type: "notification" });
        // console.log("join", rooms);
    });
};
exports.joinRoomHander = joinRoomHander;
const leaveRoomHandler = (socket) => {
    socket.on("leave room", (user) => {
        const { roomId } = user;
        const players = __1.rooms[roomId];
        if (!players)
            return;
        __1.rooms[roomId].players = players.players.filter((player) => {
            if (player.id === user.id) {
                // socket.to(roomId).emit("leave room", player.username);
                __1.io.in(roomId).emit("receive chat", { username: player.username, value: "left", id: player.id });
            }
            return player.id !== user.id;
        });
        __1.io.in(roomId).emit("room update", __1.rooms[roomId].players);
        if (__1.rooms[roomId].players.length === 0) {
            delete __1.rooms[roomId];
        }
        // console.log("leave ", rooms);
    });
};
exports.leaveRoomHandler = leaveRoomHandler;
