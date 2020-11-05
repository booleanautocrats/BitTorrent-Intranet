const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;
const crypto = require('crypto');
const torrentParser = require('./torrent-parser');
const util = require('./util');

module.exports.getPeer = (torrent, callback)=>
{
    const socket = dgram.createSocket('ud4');
    const url = urlParse(torrent.announce.toString('utf8'));
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


//building messages
function buildConnRequest(){
    //message size 16 bytes 8 byte connection Id, 4 byte action, 4 byte trasaction Id
    const buff = Buffer.alloc(16);
    console.log(buff);

    //create 8 byte data with offset 0 connection Id
    buff.writeUInt32BE(0x417,0);
    buff.writeUInt32BE(0x27101980,4);
    console.log(buff);

    //action (always zero for connection req)
    buff.writeUInt32BE(0,8);

    //transaction Id
    crypto.randomBytes(4).copy(buff,12);
    console.log(buff);
}


function responseType(){

}

//parsing connection response
// 4 byte action,4 byte transaction ID, 8 byte Conn ID
function parseConnResponse(response){
    return{
        //offset 0
        action: resp.readUInt32BE(0),
        //offset 4
        transactionId: resp.readUInt32BE(4),
        // offset 8
        connectionId: resp.slice(8)
    }

}
function buildAnnounceRequest(){
    const buf = Buffer.allocUnsafe(98);

  // connection id
  connId.copy(buf, 0);
  // action
  buf.writeUInt32BE(1, 8);
  // transaction id
  crypto.randomBytes(4).copy(buf, 12);
  // info hash
  torrentParser.infoHash(torrent).copy(buf, 16);
  // peerId
  util.genId().copy(buf, 36);
  // downloaded
  Buffer.alloc(8).copy(buf, 56);
  // left
  torrentParser.size(torrent).copy(buf, 64);
  // uploaded
  Buffer.alloc(8).copy(buf, 72);
  // event
  buf.writeUInt32BE(0, 80);
  // ip address
  buf.writeUInt32BE(0, 80);
  // key
  crypto.randomBytes(4).copy(buf, 88);
  // num want
  buf.writeInt32BE(-1, 92);
  // port
  buf.writeUInt16BE(port, 96);

  return buf;

}

function parseAnnounceResponse(){

}

buildConnRequest();