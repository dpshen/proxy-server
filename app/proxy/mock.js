// DB Connection
var mongoose = require('mongoose');

var dbAddr = require('../../config').dbAddr;

mongoose.connect(dbAddr);

exports.needMock = function (ip, url) {
    console.log(ip, url);
    //return true;
    return false;
};

exports.mockReq = function (ip, url, response) {
    //response.write();
    console.log(ip, url);
    response.end("mock data!");
};

