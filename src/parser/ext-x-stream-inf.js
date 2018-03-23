const attrParser = require('./libs/attr');
function streamInf(str) {
  const data = attrParser(str);

  'bandwidth' in data && (data.bandwidth = parseInt(data.bandwidth));
  'averageBandwidth' in data &&
    (data.averageBandwidth = parseInt(data.averageBandwidth));
  'resolution' in data && (data.resolution = parseInt(data.resolution));
  'frameRate' in data && (data.frameRate = parseFloat(data.frameRate));

  'codecs' in data && (data.codecs = data.codecs.split(';'));
  return data;
}

module.exports = streamInf;
