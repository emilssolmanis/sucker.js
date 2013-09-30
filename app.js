/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var config = require('./config');

var app = express();
var server = http.createServer(app);
io = io.listen(server);
// default to ERROR
io.set('log level', 0);

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
}

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', routes.index);
app.post('/', function(req, res) {
    io.sockets.emit('post', {
        headers: req.headers,
        data: req.body
    });
    res.send(200);
});
