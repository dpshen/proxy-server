var WebSocketServer = require('ws').Server;
var config = require('../config');
var ws = new WebSocketServer({ port: config.socket_port});
var colors = require("colors");

ws.on('connection', function(socket){
    console.log("connect:"+socket.request.headers.host);
    socket.on('proxy', function(data){
        ws.broadcast(data);
        //socket.emit('message',data);
        console.log(data.url);
        //console.log('websocket:',data.res);
        //console.log(socket.remoteAddress);
    });
    socket.on('disconnect', function(){
        //console.log("disconnect:"+socket.request.host);
    });
});

ws.broadcast = function broadcast(data) {
    ws.clients.forEach(function each(client) {
        client.send(data);
    });
};

//module.exports = io;
