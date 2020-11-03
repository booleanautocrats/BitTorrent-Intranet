const bencode = require('bencode');
const fs = require("fs");
const urlParse = require("url").parse;
const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
var bencoding = require('bencoding');

const Buff = fs.readFileSync("initial.torrent")

// gives buffer data
console.log("Buffer data");
console.log(Buff);
const torrent = Buff.toString('utf-8');
console.log("torrent data");
console.log(torrent);


//gives the bencode(data format)
console.log("here is bencode");
const torrentBen = bencoding.decode(torrent);
console.log(torrentBen);


//to get the url
const url = urlParse(torrent);
console.log("here is the url");
console.log(url);

const socket = dgram.createSocket('udp4');
const myMsg = Buffer.from('hello?', 'utf8');

socket.send(myMsg, 0, myMsg.length, 6969, url.host, () => {});

socket.on('message', msg => {
  console.log('message is', msg);
});