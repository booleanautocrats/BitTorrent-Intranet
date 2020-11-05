const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;

const url = urlParse(torrent.announce.toString('utf8'));

module.exports.getPeer = (torrent, callback)=>
{
    const socket = dgram.createSocket('ud4');
    udpSend(socket, buildConnRequest(),url);
    socket.on('message', respose=>{
        if (responseType(response)==='connect'){
            const connDetail= parseConnResponse(response);
            const announceRequest = buildAnnounceRequest(connDetail.connectionId);
            udpSend(socket,announceRequest,url);
        }
        else if(responseType(response)==='announce'){
            const announceResponse = parseAnnounceResponse(response)
            callback(announceResponse.peers);
        }
    });
};


function udpSend(socket, message, url, callback=()=>{}){
    socket.send(message,0, message.length, url.port,url.host,callback);
}

function buildConnRequest(){

}
function responseType(){

}
function parseConnResponse(){

}
function buildAnnounceRequest(){

}

function parseAnnounceResponse(){

}