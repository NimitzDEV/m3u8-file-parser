const M3U8FileParser = require('../src/reader');
const assert = require('assert');

console.log('Running EXTINF bug test...');

const parser = new M3U8FileParser();
const m3u8Content = `
#EXTM3U
#EXTINF:10, Sample Title
https://example.com/sample1.mp3

#EXTINF:10 key="value, with comma", key2="value2", Sample Title 2
https://example.com/sample2.mp3
`;

parser.read(m3u8Content);
const result = parser.getResult();

const segment2 = result.segments[1];
assert.strictEqual(segment2.inf.duration, 10, 'Duration should be 10');
assert.strictEqual(segment2.inf.title, 'Sample Title 2', 'Title should be "Sample Title 2"');
assert.strictEqual(segment2.inf.key, 'value, with comma', 'key attribute should be parsed correctly');
assert.strictEqual(segment2.inf.key2, 'value2', 'key2 attribute should be parsed correctly');

console.log('EXTINF bug test passed!');
