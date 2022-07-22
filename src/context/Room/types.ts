import { Socket } from 'socket.io-client';

export type Player = {
  username: string;
  id: string;
  status: {
    wpm: number;
    progress: number;
  };
};

export type RoomState = {
  roomId: string | null;
  user: Player;
  players: Player[];
  socket: Socket;
  isPlaying: boolean;
  isRoomOwner: boolean;
};

export type RoomContextValues = {
  room: RoomState;
  dispatch: React.Dispatch<Action>;
};

export type Action =
  | { type: 'SET_ROOM_ID'; payload: string }
  | { type: 'SET_USER_ID'; payload: string }
  | {
      type: 'SET_STATUS';
      payload: {
        wpm: number;
        progress: number;
      };
    }
  | { type: 'ADD_PLAYERS'; payload: Player }
  | { type: 'SET_IS_PLAYING'; payload: boolean }
  | { type: 'SET_ROOM_OWNER'; payload: boolean };
