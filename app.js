var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var config = require('./config');

var app = express();
var server = http.createServer(app);
io = io.listen(server);

// all environments
app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/bootstrap/dist')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
} else if ('production' === app.get('env')) {
    io.set('log level', 0);
}

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

var rooms = {};

io.sockets.on('connection', function(socket) {
    socket.emit('connection');
    socket.on('setRoom', function(data) {
        if (!(data.room in rooms)) {
            rooms[data.room] = [];
        }
        rooms[data.room].push(socket);
    });
});

app.get('/', routes.index);

app.get('/:room', routes.room);

app.post('/:room', function(req, res) {
    var room = req.params.room;
    if (room in rooms) {
        rooms[req.params.room].forEach(function(socket) {
            socket.emit('post', {
                headers: req.headers,
                body: req.body
            });
        });
        res.send(200);
    } else {
        res.send(404);
    }
});

app.delete('/:room', function(req, res) {
    var room = req.params.room;
    if (room in rooms) {
        rooms[req.params.room].forEach(function(socket) {
            socket.disconnect();
        });
        delete rooms[room];
        res.send(200);
    } else {
        res.send(404);
    }
});
