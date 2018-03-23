function date(str) {
  const dt = new Date(str.trim());
  return (isNaN(dt.getTime()) && 0) || dt;
}

module.exports = date;