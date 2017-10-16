// set up
const app = require('express')(),
    config = require('../config/database');

require('../config/express.config')(app);
require('../config/mongoose.config')(config);

// Configuring Passport (jogar p classe separada)
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({ secret: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// port
app.listen(config.dev.port, () => {
    console.log("Listening ..");
});


// var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
// app.use(methodOverride());


// config
// var conn = mongoose.connections;
// var Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
// var gfs = Grid(conn[0].db);

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var loginRoute = require('../api/login.rest')(passport);
app.use('/', loginRoute);


// headers cors


// apis
require('../api/visitor.rest')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// module.exports = app;
