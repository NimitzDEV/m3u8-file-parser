const CHAR_CODE = require('../constants/chars');
const REGEX_QUOTE = /\"/g;
const camelCase = require('./camelCase');

const BOOLEAN_MAP = {
  YES: true,
  NO: false,
};

function booleanTranslator(value) {
  if (value in BOOLEAN_MAP) return BOOLEAN_MAP[value];
  return value;
}

function attrParser(str, translateBoolean = false, ref) {
  let code = 0;
  let token = '';
  let value = '';

  const data = ref || {};

  for (let pos = 0; pos < str.length; pos++) {
    code = str[pos].charCodeAt(0);

    switch (code) {
      case CHAR_CODE.SPACE:
        token = '';
        continue;
      case CHAR_CODE.EQUAL:
        value = token;
        token = '';
        continue;
      case CHAR_CODE.COMMA:
        value = camelCase(value);
        if (value)
          if (translateBoolean) data[value] = booleanTranslator(token);
          else data[value] = token;
        value = '';
        token = '';
        continue;
      case CHAR_CODE.QUOTE:
        REGEX_QUOTE.lastIndex = pos + 1;
        const match = REGEX_QUOTE.exec(str);
        const v = str.slice(pos + 1, match.index);
        value && (data[camelCase(value)] = v);
        pos = match.index + 1;
        continue;
      default:
        token += str[pos];
    }
  }

  if (token && value) data[camelCase(value)] = token;

  return data;
}

module.exports = attrParser;
