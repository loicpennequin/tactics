import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config';

const app = express();
const PUBLIC_PATH = path.join(__dirname, '../public');

app.use('/', express.static(PUBLIC_PATH));

if (process.env.NODE_ENV === 'development') {
    const cfg = webpackConfig({
        __DEV__: process.env.NODE_ENV === 'development',
        __PORT__: process.env.PORT
    });

    const options = cfg.devServer;
    webpackDevServer.addDevServerEntrypoints(cfg, options);
    const compiler = webpack(cfg);
    const server = new webpackDevServer(compiler, options);

    server.listen(8001, () => {
        console.log('Dev server listening on port 8001.');
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'home.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'signup.html'));
});

export default app;
