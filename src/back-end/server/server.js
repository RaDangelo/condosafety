// set up
const app = require('express')(),
    config = require('../config/database'),
    io = require('socket.io'),
    DocumentPath = 'C:/condosafety',
    BaudRate = 9600;

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

var fs = require("fs");
var readline = require('readline');
var rl = readline.createInterface({
    input: fs.createReadStream('server_config.txt'),
    output: process.stdout,
    terminal: false
})

rl.on('line', function (line) {
    console.log(line);
})

// port
var server = app.listen(config.dev.port, () => {
    console.log("Listening ..");
});

var socketServer = io(server);

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var loginRoute = require('../api/login.rest')(passport);
app.use('/', loginRoute);

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

//initialize serial port initialization

var serialport = require('serialport'), // include the serialport package
    SerialPort = serialport.SerialPort,    // make a local instance of serial port package
    portName = process.argv[2], // retrieve the port name from the command line argument
    portConfig = {
        //baudRate: 9600,
        baudRate: BaudRate,
        // call myPort.on('data') when a newline is received:
        parser: serialport.parsers.ReadLine
    };

// open the serial port
var myPort = new serialport('COM3', portConfig);
//set up server and socketServer listener functions:
//app.use(express.static('d:/sp')); // serve files from the public folder
// app.use(express.static(DocumentPath)); // serve files from the public folder
//app.use(express.static('c:/xampp/htdocs'));
app.get('/:name', serveFiles); // listener for all static file requests
socketServer.on('connection', openSocket);     // listener for websocket data


function serveFiles(request, response) {
    var fileName = request.params.name; // get the file name from the request
    response.sendFile(fileName);  // send the file
    //res.sendFile('d:/sp/'+fileName , { root : __dirname});
}

function openSocket(socket) {
    console.log('new user address: ' + socket.handshake.address);
    // send something to the web client with the data:
    socket.emit('message', 'Server listening on address : ' + socket.handshake.address);
    // this function runs if there's input from the client:
    socket.on('message', function (data) {
        myPort.write(data); // send the data to the serial device
    });

    // this function runs if there's input from the serialport:
    myPort.on('data', function (data) {
        socket.emit('message', data); // send the data to the client
    });
}