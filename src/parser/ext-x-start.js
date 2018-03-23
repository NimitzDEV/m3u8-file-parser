const attrParser = require('./libs/attr');

function start(str) {
  const data = attrParser(str, true);

  'timeOffset' in data && (data.timeOffset = parseFloat(data.timeOffset));

  return data;
}

module.exports = start;
