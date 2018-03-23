function byteRange(str) {
  const data = {
    length: 0,
    offset: 0,
  };

  data.length = parseInt(str);
  const offsetPosition = str.lastIndexOf('@');

  ~offsetPosition && (data.offset = parseInt(str.slice(offsetPosition + 1)));

  return data;
}

module.exports = byteRange;
