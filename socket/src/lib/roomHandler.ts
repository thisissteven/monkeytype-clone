import { Socket } from "socket.io";
import { io, playerRooms, rooms } from "..";
import { shuffleList } from "./functions";
import { Player } from "./types";

export const createRoomHandler = (socket: Socket) => {
	socket.on("create room", (roomId: string, mode: "words" | "sentences" | "numbers") => {
		if (io.sockets.adapter.rooms.get(roomId)) {
			socket.emit("room already exist");
		} else {
			const toType = shuffleList(mode).join(" ");
			rooms[roomId] = {
				players: [],
				toType,
				inGame: false,
				winner: null,
			};

			socket.emit("words generated", rooms[roomId].toType);
			socket.emit("create room success", roomId);
			// console.log(roomId);
			// console.log(io.sockets.adapter.rooms.get(roomId));
			// const sockets = Array.from(io.sockets.sockets).map((socket) => socket[0]);
			// console.log("room created: ", socket.rooms);
		}
	});
};

export const updateRoomHandler = (socket: Socket) => {
	socket.on("room update", (user: Player) => {
		const { roomId } = user;
		if (!rooms[roomId]) return;
		const players = rooms[roomId].players;
		rooms[roomId].players = players.map((player) => (player.id !== user.id ? player : user));
		io.in(roomId).emit("room update", rooms[roomId].players);

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

export const joinRoomHander = (socket: Socket) => {
	socket.on("join room", ({ roomId, user }: { roomId: string; user: Player }) => {
		socket.emit("end game");
		const room = rooms[roomId];
		if (!room) {
			socket.emit("room invalid");
			return;
		} else if (rooms[roomId].inGame) {
			socket.emit("room in game");
			return;
		} else {
			rooms[roomId].players = [...rooms[roomId].players, user];
			playerRooms[socket.id] = [roomId];
		}

		socket.join(roomId);
		socket.emit("words generated", rooms[roomId].toType);
		io.in(roomId).emit("room update", rooms[roomId].players);
		// socket.to(roomId).emit("notify", `${user.username} is here.`);
		io.in(roomId).emit("receive chat", { username: user.username, value: "joined", id: user.id, type: "notification" });
		// console.log("join", rooms);
	});
};

export const leaveRoomHandler = (socket: Socket) => {
	socket.on("leave room", (user: Player) => {
		const { roomId } = user;
		const players = rooms[roomId];
		if (!players) return;
		rooms[roomId].players = players.players.filter((player) => {
			if (player.id === user.id) {
				// socket.to(roomId).emit("leave room", player.username);
				io.in(roomId).emit("receive chat", { username: player.username, value: "left", id: player.id });
			}
			return player.id !== user.id;
		});

		io.in(roomId).emit("room update", rooms[roomId].players);
		if (rooms[roomId].players.length === 0) {
			delete rooms[roomId];
		}
		// console.log("leave ", rooms);
	});
};
