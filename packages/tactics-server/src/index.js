require('@babel/polyfill');
require('@babel/register')({
    extends: './.babelrc',
    ignore: [/node_modules/]
});

const { default: config } = require('./config');
const { default: app } = require('./app.js');
app.start(() => {
    console.log(`Server ready on port ${config.PORT}`);
});
