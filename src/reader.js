const SCOPE = require('./parser/constants/scope');
const CHAR = require('./parser/constants/chars');
const ParserLayer = require('./parser/map');

class M3U8FileParser {
  constructor() {
    this.default = {
      isExtendedM3U: false,
      segments: [],
    };

    this.trailingData = {};

    this.currentSegmentData = {};
    this.result = Object.assign({}, this.default);
  }

  /**
   * This function is use for analyzing the input string
   * and seperate the tag and the content
   * then invoke the tag parser to parse the content
   * @param {String} str
   */
  read(str) {
    const contentLength = str.length;
    str = str.trim();

    let tag = '';
    let isExtTag = false;
    let isHashLeading = false;

    let crPosition = 0;
    let lfPosition = 0;
    let colonPosition = 0;

    let content = '';

    for (let pos = 0; pos < contentLength; pos++) {
      // find CR/LF position
      lfPosition = str.indexOf('\n', pos);
      crPosition = (lfPosition > -1 && lfPosition) || str.indexOf('\r', pos);
      crPosition = (crPosition > -1 && crPosition) || contentLength;

      // slice between current position and CR/LF position
      // should be the new line
      content = str.slice(pos, crPosition).trim();

      pos = crPosition;

      // check tag content
      isHashLeading = content[0] === '#';
      isExtTag = content.slice(0, 4) === '#EXT';
      colonPosition = (isExtTag && content.indexOf(':')) || -1;

      tag = isExtTag && ~colonPosition && content.slice(0, colonPosition);
      !tag && isHashLeading && (tag = content);

      // invoke parser if read line finished
      this.invokeParser(tag, content.slice(colonPosition + 1), isHashLeading);
    }
  }

  /**
   * Receive the line analyze result
   * then invoke specific parser accordingly
   * @param {String} tag
   * @param {String} content
   * @param {Boolean} isHashLeading
   */
  invokeParser(tag, content, isHashLeading) {
    // have both tag and content
    // if the tag was supported, then run parser
    // other wise drop it
    if (tag && content) {
      const parser = ParserLayer.get(tag);
      if (parser)
        return this.dataScope(parser, parser.parser(content, this.result));
      else return;
    }

    // if has content and is hash sign leading
    // treat as comment
    if (content && isHashLeading) {
      return;
    }

    // else treat as segment url data
    if (content) {
      const parser = ParserLayer.get('URL');
      this.dataScope(parser, parser.parser(content, this.result));
    }
  }

  /**
   * Receive the parser config the parser result
   * then attach data to result object according to the scope
   * @param {Object} config
   * @param {Any} data
   */
  dataScope(config, data) {
    switch (config.scope) {
      case SCOPE.MASTER_PLAYLIST:
        this.currentSegmentData.isMasterPlaylist = true;
      case SCOPE.MEDIA_SEGMENT:
        this.currentSegmentData[config.key] = data;
        break;
      case SCOPE.URL_SEGMENT_ENDING:
        this.currentSegmentData[config.key] = data;
        this.result.segments.push(this.currentSegmentData);
        this.currentSegmentData = Object.assign({}, this.trailingData);
        break;
      case SCOPE.TRALING_MEDIA_SEGMENT:
        this.trailingData[config.key] = data;
        this.currentSegmentData = Object.assign(
          this.currentSegmentData,
          this.trailingData
        );
        break;
      case SCOPE.MEDIA_PLAYLIST:
      case SCOPE.BASIC:
        this.result[config.key] = data;
        break;
      case SCOPE.GROUPING:
        // Initialize root object
        this.result[config.group.root] || (this.result[config.group.root] = {});
        let key = '';
        let ref = this.result[config.group.root];
        const length = config.group.path.length;

        // Creating path
        for (let idx = 0; idx < length - 1; idx++) {
          key = config.group.path[idx];
          ref[data[key]] || (ref[data[key]] = {});
          ref = ref[data[key]];
        }

        // Attach data to last key
        ref[data[config.group.path[length - 1]]] = data;
        break;
    }

    // trailing data
  }

  /**
   * Return the result that parsed
   */
  getResult() {
    return this.result;
  }

  /**
   * Reset the result
   */
  reset() {
    this.result = Object.assign({}, this.default);
  }
}

module.exports = M3U8FileParser;
