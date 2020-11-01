
const fs = require("fs");
const urlParse = require("url").parse;
const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
var bencoding = require('bencoding');

const Buff = fs.readFileSync("initial.torrent")

// gives buffer data
console.log(Buff);
console.log(Buff.toString('utf8'));

//gives the bencode(data format)
console.log("here is bencode");
const torrentBen = bencoding.decode(Buff.toString('utf8'));
console.log(torrentBen);

//to get the url
const url = urlParse(Buff.toString('utf8'));
console.log("here is the url");
console.log(url);

const socket = dgram.createSocket('udp4');
const myMsg = Buffer.from('hello?', 'utf8');

socket.send(myMsg, 0, myMsg.length, 6969, url.host, () => {});

socket.on('message', msg => {
  console.log('message is', msg);
});