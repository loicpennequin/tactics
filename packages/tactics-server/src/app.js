import express from 'express';
import http from 'http';
import initializers from './initializers';
import config from './config';

const app = express();
const httpServer = http.createServer(app);

app.start = async cb => {
    await initializers(app, httpServer);

    httpServer.listen(config.PORT || 8000, () => {
        cb();
    });
};

export default app;
