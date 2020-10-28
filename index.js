
const fs = require("fs");
const torrent = fs.readFileSync("initial.torrent")

// gives buffer data
console.log(torrent);

//gives the bencode
console.log(torrent.toString('utf8'));