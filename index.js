'use strict';
const fs = require('fs');
const bencode = require('bencode');
const tracker = require('./tracker');

// decoding buffer
const torrent = bencode.decode(fs.readFileSync('demo.torrent'));

//get the peers
tracker.getPeer(torrent,peers=>{
  console.log("list of peers are ", peers);
});