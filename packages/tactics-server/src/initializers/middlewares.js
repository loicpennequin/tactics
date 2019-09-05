import compression from 'compression';
import enforce from 'express-sslify';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logRequest from '../middlewares/logRequest';
import express from 'express';
import websiteApp from 'tactics-website';

export default function(app) {
    if (process.env.NODE_ENV === 'production') {
        app.use(enforce.HTTPS({ trustProtoHeader: true }));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(compression());
    app.use(helmet());
    app.use(logRequest);
    app.use('/', websiteApp);
    app.use('/', express.static('public'));
}
