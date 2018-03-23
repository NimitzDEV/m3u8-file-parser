const attrParser = require('./libs/attr');

function mediaGroup(str) {
  const data = {
    'groupId': 'default',
  };

  attrParser(str, true, data);

  return data;
}

module.exports = mediaGroup;
