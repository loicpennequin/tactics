import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';
import webpackHotMiddleware from 'webpack-hot-middleware';
const app = express();
const PUBLIC_PATH = path.join(__dirname, '../public');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/'));
app.use('/assets', express.static(PUBLIC_PATH));

app.get('/', function(req, res) {
    res.render('home');
});
app.get('/signup', function(req, res) {
    res.render('signup');
});

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig({ NODE_ENV: process.env.NODE_ENV }));
    app.use(webpackDevMiddleware(compiler, { quiet: true, stats: 'minimal' }));
    app.use(webpackHotMiddleware(compiler));
    app.listen(8001, () => {
        console.log('Dev server listening on port 8001.');
    });
}
export default app;
