var WebSocketServer = require('ws').Server;
var config = require('../../config');
var ws = new WebSocketServer({ port: config.socket_port});

ws.on('connection', function(socket){
    console.log(socket._socket.remoteAddress);
    socket.on('message', function(data){
        ws.broadcast(data);
    });
    socket.on('disconnect', function(){
        console.log("disconnect:"+socket);
    });
});

ws.broadcast = function broadcast(data) {
    ws.clients.forEach(function each(client) {
        client.send(data);
    });
};

//module.exports = io;
