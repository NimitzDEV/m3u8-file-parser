class ParserBasic {
  constructor(data = '', result = '') {
    this.origData = data;
    this.origResult = data;

    this.data = data;
    this.result = result;
  }

  read(str) {
    this.data = str;
  }

  end() {
    return this.data;
  }

}

module.exports = ParserBasic;
