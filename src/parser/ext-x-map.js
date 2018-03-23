const X_BYTERANGE = require('./ext-x-byterange');
const attrParser = require('./libs/attr');

function map(str) {
  const data = attrParser(str);
  if (data['byterange']) data['byterange'] = X_BYTERANGE(data['byterange']);

  return data
}

module.exports = map;
