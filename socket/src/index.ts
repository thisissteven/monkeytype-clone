import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { PlayerState, RoomState, SendChat } from "./lib/types";
import { createRoomHandler, joinRoomHander, leaveRoomHandler, updateRoomHandler } from "./lib/roomHandler";
import { disconnectHandler } from "./lib/disconnectHandler";
import { endGameHander, startGameHander } from "./lib/gameHandler";

const port = process.env.PORT || 8080;
const app = express();
app.use(cors);

const server = http.createServer(app);
export const io = new Server(server, {
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

export const playerRooms: PlayerState = {};

// rooms will consist of key value pair, key being room id, pair being users inside that room and their corresponding data
export const rooms: RoomState = {};

io.on("connection", (socket) => {
	// console.log(io.sockets.adapter.rooms);
	// console.log(sockets);
	// console.log(socket.rooms);
	// console.log("connected");
	socket.join("public");
	const sockets = Array.from(io.sockets.sockets).map((socket) => socket[0]);
	io.to("public").emit("online users", sockets.length);

	// send online users
	socket.on("get online users", () => {
		const sockets = Array.from(io.sockets.sockets).map((socket) => socket[0]);
		io.to("public").emit("online users", sockets.length);
	});

	// chat handlers
	socket.on("send chat", ({ username, value, roomId, id }: SendChat) => {
		console.log(roomId);
		io.to(roomId).emit("receive chat", { username, value, id, type: "message", roomId });
	});

	// handle user disconnect
	disconnectHandler(socket);

	// game handlers
	startGameHander(socket);
	endGameHander(socket);

	// room handlers
	joinRoomHander(socket);
	leaveRoomHandler(socket);
	createRoomHandler(socket);
	updateRoomHandler(socket);
});

server.listen(port, () => {
	console.log(`Listening to server on port ${port}`);
});
