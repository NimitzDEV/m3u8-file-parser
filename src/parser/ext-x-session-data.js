const attrParser = require('./libs/attr');
function sessionData(str) {
  return attrParser(str);
}

module.exports = sessionData;
