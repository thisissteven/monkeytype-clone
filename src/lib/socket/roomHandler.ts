import { Socket } from 'socket.io-client';
import { v4 } from 'uuid';

export const createRoom = (socket: Socket) => {
  const id = v4().slice(0, 6);
  // check whether id exists yet or not
  socket.emit('create room', id);
};
