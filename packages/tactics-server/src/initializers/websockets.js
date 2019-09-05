import socketio from 'socket.io';
import cookieParser from 'socket.io-cookie-parser';
import logger from '../services/loggerService';
import websocketsService from '../services/websocketsService';
import config from '../config';
import { socketEvents as events } from 'tactics-common';

export default function(server) {
    const io = socketio.listen(server);
    io.use(cookieParser(config.SESSION.SECRET));

    io.on(events.CONNECT, socket => {
        websocketsService.onConnect(socket);

        socket.on(events.DISCONNECT, () => {
            websocketsService.onDisconnect(socket);
        });
    });

    logger.info('Websockets ready.');
}
