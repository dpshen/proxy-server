var io = require('socket.io')();
var colors = require("colors");
var config = require('../config');

io.on('connection', function(socket){
    console.log("connect:"+socket.request.headers.host);
    socket.on('proxy', function(data){
        socket.emit('message',data);
        console.log(data.url);
        //console.log('websocket:',data.res);
        //console.log(socket.remoteAddress);
    });
    socket.on('disconnect', function(){
        //console.log("disconnect:"+socket.request.host);
    });
});
io.listen(config.socket_port, function(err, data){
    if (err) {
        console.log(err)
    }
    console.log(data)
});

//module.exports = io;
