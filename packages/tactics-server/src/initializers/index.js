import passport from './passport';
import graphql from './graphql';
import middlewares from './middlewares';
import authentication from './authentication';
import websockets from './websockets';

export default function initialize(app, server) {
    middlewares(app);
    passport(app);
    authentication(app);
    graphql(app);
    websockets(server);
}
