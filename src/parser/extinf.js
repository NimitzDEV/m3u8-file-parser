const REGEX_QUOTE = /\"/g;
const REGEX_NONE_WORD = /\W/g;
const CHAR_CODE = require('./constants/chars');
const camelCase = require('./libs/camelCase');

function extinf(str) {
  let findingHeader = true;
  let hadHeader = false;
  let attr = '';
  let token = '';

  let extData = {
    duration: '',
    title: '',
  };

  // reset regex
  REGEX_QUOTE.lastIndex = 0;
  REGEX_NONE_WORD.lastIndex = 0;

  // read track length first
  let tmpPos = 0;
  let code = str[tmpPos].charCodeAt(0);

  // read out
  // '-': minus sign
  // 0-9: numbers
  // '.': dot
  while (
    (code >= CHAR_CODE.NUMBER_START && code <= CHAR_CODE.NUMBER_STOP) ||
    code === CHAR_CODE.MINUS ||
    code === CHAR_CODE.PERIOD
  ) {
    extData.duration += str[tmpPos];
    tmpPos++;
    code = tmpPos > str.length - 1 ? '' : str[tmpPos].charCodeAt(0);
  }

  extData.duration = (extData.duration && parseFloat(extData.duration)) || -1;

  // read rest of the data
  for (let pos = tmpPos; pos < str.length; pos++) {
    const code = str[pos].charCodeAt(0);
    switch (code) {
      case CHAR_CODE.SPACE:
        // space char
        token = '';
        continue;
      case CHAR_CODE.QUOTE: {
        // if it is a quote mark,
        // find next one and then slice contents between
        REGEX_QUOTE.lastIndex = pos + 1;
        const match = REGEX_QUOTE.exec(str);

        token = str.slice(pos + 1, match.index);
        pos = (match && match.index) || pos;

        attr && (extData[camelCase(attr)] = token);

        token = '';
        attr = '';
        continue;
      }
      case CHAR_CODE.EQUAL: {
        attr = token;
        token = '';
        // check if next char is quote
        if (str[pos + 1].charCodeAt(0) === CHAR_CODE.QUOTE) continue;
        // find next none word character then slice content between
        REGEX_NONE_WORD.lastIndex = pos + 1;
        const match = REGEX_NONE_WORD.exec(str);
        token = str.slice(pos + 1, match.index);
        pos =
          (str[match.index].charCodeAt(0) === CHAR_CODE.COMMA &&
            match.index - 1) ||
          (match && match.index) ||
          pos;
        attr && (extData[camelCase(attr)] = token);
        token = '';
        attr = '';
        continue;
      }
      case CHAR_CODE.COMMA:
        // read track title
        extData.title = str.slice(pos + 1, str.length).trimLeft();
        pos = str.length;
        continue;
      default:
        token += str[pos];
    }
  }

  return extData;
}

module.exports = extinf;
