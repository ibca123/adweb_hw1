var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    path = require('path');

server.listen(8080);
console.log('Running at port 8080...');


app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client/index.html');
});
app.use('/js', express.static(__dirname + '/client/build/js'));
app.use('/css', express.static(__dirname + '/client/build/css'));

var lastData = '';

io.sockets.on('connection', function(socket) {
    socket.on('input', function(data) {
    	lastData = data;
    	console.log('Data change:' + lastData);
        socket.broadcast.emit('update', data);
    });
    console.log("New client, send:" + lastData);
    socket.broadcast.emit("update", lastData);
});
