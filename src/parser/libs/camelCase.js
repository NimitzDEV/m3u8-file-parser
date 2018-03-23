const CHAR = require('../constants/chars');

function camelCase(value) {
  let newVal = '';
  let code = 0;
  value = value.toLowerCase();
  for (let pos = 0; pos < value.length; pos++) {
    code = value[pos].charCodeAt(0);
    if (code === CHAR.MINUS) {
      newVal += (value[++pos] || '').toUpperCase();
      continue;
    }
    newVal += value[pos];
  }
  return newVal;
}

module.exports = camelCase;
