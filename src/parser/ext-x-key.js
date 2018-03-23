const attrParser = require('./libs/attr');

function key(str) {
  return attrParser(str);
}

module.exports = key;
