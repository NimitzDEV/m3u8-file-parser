const M3U8FileParser = require('../../index');
const fs = require('fs');
const content = fs.readFileSync('../example.m3u8', { encoding: 'utf-8'});

const reader = new M3U8FileParser();
reader.read(content);
console.log(reader.getResult());
