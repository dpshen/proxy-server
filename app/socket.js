var io = require('socket.io')();
var config = require('../config');

io.on('connection', function(socket){
    console.log("connect:"+socket.request.headers.host);
    socket.on('proxy', function(data){
        console.log(data);
    });
    socket.on('disconnect', function(){
        console.log("disconnect:"+socket.request.host);
    });
});
io.listen(config.socket_port);

//module.exports = io;
