import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config';

const app = express();
const PUBLIC_PATH = path.join(__dirname, '../public');

app.use('/', express.static(PUBLIC_PATH));

if (process.env.NODE_ENV === 'development') {
    const cfg = webpackConfig({ NODE_ENV: process.env.NODE_ENV });
    const options = cfg.devServer;
    webpackDevServer.addDevServerEntrypoints(cfg, options);
    const compiler = webpack(cfg);
    const server = new webpackDevServer(compiler, options);

    server.listen(8001, () => {
        console.log('Dev server listening on port 8001.');
    });
}

export default app;
