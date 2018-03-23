function comment(str) {
  // drop leading hash tags
  let cursor = 0;
  while (str[cursor] === '#' && cursor < str.length) {
    cursor++;
  }

  return str.slice(cursor, str.length);
}

module.exports = comment;
