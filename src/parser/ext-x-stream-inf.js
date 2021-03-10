const attrParser = require('./libs/attr');
function streamInf(str) {
  const data = attrParser(str);

  'bandwidth' in data && (data.bandwidth = parseInt(data.bandwidth));
  'averageBandwidth' in data &&
    (data.averageBandwidth = parseInt(data.averageBandwidth));
  if ('resolution' in data) {
    const match = Array.from(data.resolution.matchAll(/^(\d+)(?:x(\d+))?$/));
    if (match.length === 0) {
      throw new Error(`RESOLUTION attribute value (${data.resolution}) doesn't match pattern <width>[x<height>]`);
    } else {
      // there could be only one match in whole string, as we used anchors
      const res = match[0];
      // drop whole match, leave only capturing groups
      res.splice(0,1);
      if (res[1] === undefined) {
        data.resolution = parseInt(res[0]);
      } else {
        data.resolution = res.map(m => parseInt(m));
      }
    }
  }
  'frameRate' in data && (data.frameRate = parseFloat(data.frameRate));

  'codecs' in data && (data.codecs = data.codecs.split(';'));
  return data;
}

module.exports = streamInf;
