// DB Connection
var mongoose = require('mongoose');

var dbAddr = require('../../config').dbAddr;

mongoose.connect(dbAddr);

exports.needMock = function(cid,url){
    console.log(cid, url);
    return false;
};

exports.mockReq = function(performRequest,remoteRequest){
    performRequest(remoteRequest);
};

