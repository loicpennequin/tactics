import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';

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

export default app;
