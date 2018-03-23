// parsers
const EXTINF = require('./extinf');
const EXT_X_VERSION = require('./ext-x-version');
const EXT_X_BYTERANGE = require('./ext-x-byterange');
const EXT_X_DISCONTINUITY = require('./ext-x-discontinuity');
const EXT_X_KEY = require('./ext-x-key');
const EXT_X_MAP = require('./ext-x-map');
const EXT_X_PROGRAM_DATA_TIME = require('./ext-x-program-date-time');
const EXT_X_DATERANGE = require('./ext-x-daterange');
// Media Playlist Tag Parsers
const EXT_X_TARGETDURATION = require('./ext-x-targetduration');
const EXT_X_MEDIA_SEQUENCE = require('./ext-x-media-sequence');
const EXT_X_DISCONTINUITY_SEQUENCE = require('./ext-x-discontinuity-sequence');
const EXT_X_ENDLIST = require('./ext-x-endlist');
const EXT_X_PLAYLIST_TYPE = require('./ext-x-playlist-type');
// Master Playlist Tag Parsers
const EXT_X_MEDIA = require('./ext-x-media');
const EXT_X_STREAM_INF = require('./ext-x-stream-inf');
const EXT_X_SESSION_DATA = require('./ext-x-session-data');
const EXT_X_START = require('./ext-x-start');

// scope constant
const SCOPE = require('./constants/scope');

const DEFAULT_PARSER_MAP = {
  // Basic Tags and Media Segment Tags
  '#EXTM3U': {
    key: 'isExtendedM3U',
    parser: () => true,
    scope: SCOPE.BASIC,
  },
  '#EXT-X-VERSION': {
    key: 'version',
    parser: EXT_X_VERSION,
    scope: SCOPE.BASIC,
  },
  '#EXTINF': {
    key: 'inf',
    parser: EXTINF,
    scope: SCOPE.MEDIA_SEGMENT,
  },
  '#EXT-X-BYTERANGE': {
    key: 'byteRange',
    parser: EXT_X_BYTERANGE,
    scope: SCOPE.MEDIA_SEGMENT,
  },
  '#EXT-X-DISCONTINUITY': {
    key: 'discontinuity',
    parser: EXT_X_DISCONTINUITY,
    scope: SCOPE.MEDIA_SEGMENT,
  },
  '#EXT-X-KEY': {
    key: 'key',
    parser: EXT_X_KEY,
    scope: SCOPE.TRALING_MEDIA_SEGMENT,
  },
  '#EXT-X-MAP': {
    key: 'map',
    parser: EXT_X_MAP,
    scope: SCOPE.TRALING_MEDIA_SEGMENT,
  },
  '#EXT-X-PROGRAM-DATE-TIME': {
    key: 'programDateTime',
    parser: EXT_X_PROGRAM_DATA_TIME,
    scope: SCOPE.MEDIA_SEGMENT,
  },
  '#EXT-X-DATERANGE': {
    key: 'dateRange',
    parser: EXT_X_DATERANGE,
    scope: SCOPE.MEDIA_SEGMENT,
  },
  // Media Playlist Tags
  '#EXT-X-TARGETDURATION': {
    key: 'targetDuration',
    parser: EXT_X_TARGETDURATION,
    scope: SCOPE.MEDIA_PLAYLIST,
  },
  '#EXT-X-MEDIA-SEQUENCE': {
    key: 'mediaSequence',
    parser: EXT_X_MEDIA_SEQUENCE,
    scope: SCOPE.MEDIA_PLAYLIST,
  },
  '#EXT-X-DISCONTINUITY-SEQUENCE': {
    key: 'discontinuitySequence',
    parser: EXT_X_DISCONTINUITY_SEQUENCE,
    scope: SCOPE.MEDIA_PLAYLIST,
  },
  '#EXT-X-ENDLIST': {
    key: 'endList',
    parser: EXT_X_ENDLIST,
    scope: SCOPE.MEDIA_PLAYLIST,
  },
  '#EXT-X-PLAYLIST-TYPE': {
    key: 'playlistType',
    parser: EXT_X_PLAYLIST_TYPE,
    scope: SCOPE.MEDIA_PLAYLIST,
  },
  '#EXT-X-I-FRAMES-ONLY': {
    key: 'iFramesOnly',
    parser: () => true,
    scope: SCOPE.MEDIA_PLAYLIST,
  },
  // Master Playlist Tags
  '#EXT-X-MEDIA': {
    key: 'media',
    parser: EXT_X_MEDIA,
    scope: SCOPE.GROUPING,
    group: {
      root: 'media',
      path: ['type', 'groupId', 'name'],
    },
  },
  '#EXT-X-STREAM-INF': {
    key: 'streamInf',
    parser: EXT_X_STREAM_INF,
    scope: SCOPE.MASTER_PLAYLIST,
  },
  '#EXT-X-I-FRAME-STREAM-INF': {
    key: 'iFrameStreamInf',
    parser: EXT_X_STREAM_INF,
    scope: SCOPE.MASTER_PLAYLIST,
  },
  '#EXT-X-SESSION-DATA': {
    key: 'sessionData',
    parser: EXT_X_SESSION_DATA,
    scope: SCOPE.GROUPING,
    group: {
      root: 'sessionData',
      path: ['dataId', 'language'],
    },
  },
  '#EXT-X-SESSION-KEY': {
    key: 'sessionKey',
    parser: EXT_X_KEY,
    scope: SCOPE.MASTER_PLAYLIST,
  },
  '#EXT-X-INDEPENDENT-SEGMENTS': {
    key: 'independentSegments',
    parser: () => true,
    scope: SCOPE.MEDIA_PLAYLIST,
  },
  '#EXT-X-START': {
    key: 'start',
    parser: EXT_X_START,
    scope: SCOPE.MEDIA_PLAYLIST,
  },
  // INTERNAL USE SPECIAL TAGS
  URL: {
    key: 'url',
    parser: str => str,
    scope: SCOPE.URL_SEGMENT_ENDING,
  },
};

module.exports = {
  get: type => {
    return DEFAULT_PARSER_MAP[type] || null;
  },
  set: (type, config) => {
    DEFAULT_PARSER_MAP[type] = config;
  },
  add: (type, config) => {
    DEFAULT_PARSER_MAP[type] = config;
  },
};
