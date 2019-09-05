import serviceFactory from '../factories/serviceFactory';
import jwt from 'jsonwebtoken';

class WebsocketsService {
    constructor() {
        this._sockets = [];
    }

    _cleanup(id) {
        this._sockets = this._sockets.filter(s => s.userId !== id);
    }

    onConnect(socket) {
        const userId = (jwt.decode(socket.request.cookies.jwt) || {}).sub;
        this._cleanup(userId);
        this._sockets.push({ socketId: socket.id, userId });
    }

    onDisconnect(socket) {
        this._cleanup(userId);
        const userId = (jwt.decode(socket.request.cookies.jwt) || {}).sub;
    }
}

export default serviceFactory('databaseService', new WebsocketsService());
