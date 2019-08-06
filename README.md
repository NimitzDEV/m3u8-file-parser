# m3u8-file-parser

A m3u/m3u8 file parser build against [RFC8216](https://tools.ietf.org/html/rfc8216) specs.

## Installation

`npm install m3u8-file-parser --save` or `yarn add m3u8-file-parser`

## Usage

In Node.js

```javascript
const M3U8FileParser = require('m3u8-file-parser');
const fs = require('fs');
const content = fs.readFileSync('./example.m3u8', { encoding: 'utf-8'});

const reader = new M3U8FileParser();
reader.read(content);
reader.getResult(); // Get the parse result
reader.reset(); // Optional, If you want to parse a new file, call reset()
```

In Node.js read line by line

```javascript
const M3U8FileParser = require('m3u8-file-parser');
const fs = require('fs');
const content = fs.readFileSync('./example.m3u8', { encoding: 'utf-8'});
const readline = require('readline');

const reader = new M3U8FileParser();
const stream = fs.createReadStream('./example.m3u8', { encoding: 'utf-8' });
const interface = readline.createInterface({ input: stream });

interface.on('line', line => reader.read(line)); // Read line by line
interface.on('close', () => reader.getResult()); // Get result after file ends.
```

In browser, use the file in dist instead.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>M3U8FileParser Browser Example</title>
  <script src="../../dist/m3u8-file-parser.min.js"></script>
  <script>
    var reader = new M3U8FileParser();
    var m3u8Content = `
      #EXTM3U
      #EXTINF:10, Sample Title
      https://example.com/sample1.mp3

      #EXTINF:10, Sample Title 2\n
      https://example.com/sample2.mp3
    `;

    reader.read(m3u8Content);
    console.log('result', reader.getResult());
  </script>
</head>
<body>
  <h2>See console for result</h2>
</body>
</html>
```

Also, you can parse file line by line if you want, for example, in Node.js, parsing a large file using `readline`

## Supported Tags

### Basic Tags

EXTM3U

EXT-X-VERSION

### Media Segment Tags

EXTINF

EXT-X-BYTERANGE

EXT-X-DISCONTINUITY

EXT-X-KEY

EXT-X-MAP

EXT-X-PROGRAM-DATE-TIME

EXT-X-DATERANGE

### Media Playlist Tags

EXT-X-TARGETDURATION

EXT-X-MEDIA-SEQUENCE

EXT-X-DISCONTINUITY-SEQUENCE

EXT-X-ENDLIST

EXT-X-PLAYLIST-TYPE

EXT-X-I-FRAMES-ONLY

### Master Playlist Tags

EXT-X-MEDIA

EXT-X-STREAM-INF

EXT-X-I-FRAME-STREAM-INF

EXT-X-SESSION-DATA

EXT-X-SESSION-KEY

### Media or Master Playlist Tags

EXT-X-INDEPENDENT-SEGMENTS

EXT-X-START

### Extended Features

- Attributes in EXTINF, For example: `#EXTINF:10 example="hah", title`
- Camel case conversion for attribute list

## APIs

#### read(str: String)

Read the M3U/M3U8 content and parse it, you can pass a whole M3U/M3U8 content or just one line of the content.

#### getResult(): Object

Get the current parsed result

#### reset()

Reset the parsed result

## Custom Parsers

No support currently.

## File an issue if the parsing strategy is wrong

Feel free to file any issues

## Other

Currently the parser do not support validation checks for M3U/M3U8 file, like the example given below, are violating Section [4.3.5](https://tools.ietf.org/html/rfc8216#section-4.3.5), but the parser will parse it anyway.

## Parsing Example

```h
#EXTM3U
#EXT-X-VERSION:2
#EXT-X-TARGETDURATION:6
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-DISCONTINUITY-SEQUENCE:1
#EXT-X-START:PERCISE=NO,TIME-OFFSET=2.11
#EXT-X-MEDIA-SEQUENCE:1
#EXT-X-INDEPENDENT-SEGMENTS
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="English",DEFAULT=YES,AUTOSELECT=YES,FORCED=NO,LANGUAGE="en",CHARACTERISTICS="public.accessibility.transcribes-spoken-dialog, public.accessibility.describes-music-and-sound",URI="subtitles/eng/prog_index.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="English (Forced)",DEFAULT=NO,AUTOSELECT=NO,FORCED=YES,LANGUAGE="en",URI="subtitles/eng_forced/prog_index.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="Français",DEFAULT=NO,AUTOSELECT=YES,FORCED=NO,LANGUAGE="fr",CHARACTERISTICS="public.accessibility.transcribes-spoken-dialog, public.accessibility.describes-music-and-sound",URI="subtitles/fra/prog_index.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="Français (Forced)",DEFAULT=NO,AUTOSELECT=NO,FORCED=YES,LANGUAGE="fr",URI="subtitles/fra_forced/prog_index.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="Español",DEFAULT=NO,AUTOSELECT=YES,FORCED=NO,LANGUAGE="es",CHARACTERISTICS="public.accessibility.transcribes-spoken-dialog, public.accessibility.describes-music-and-sound",URI="subtitles/spa/prog_index.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="Español (Forced)",DEFAULT=NO,AUTOSELECT=NO,FORCED=YES,LANGUAGE="es",URI="subtitles/spa_forced/prog_index.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="日本語",DEFAULT=NO,AUTOSELECT=YES,FORCED=NO,LANGUAGE="ja",CHARACTERISTICS="public.accessibility.transcribes-spoken-dialog, public.accessibility.describes-music-and-sound",URI="subtitles/jpn/prog_index.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="日本語 (Forced)",DEFAULT=NO,AUTOSELECT=NO,FORCED=YES,LANGUAGE="ja",URI="subtitles/jpn_forced/prog_index.m3u8"
#EXT-X-SESSION-DATA:DATA-ID="com.example.lyrics",URI="lyrics.json"
#EXT-X-SESSION-DATA:DATA-ID="com.example.title",LANGUAGE="en", \
        VALUE="This is an example"
#EXT-X-SESSION-DATA:DATA-ID="com.example.title",LANGUAGE="es", \
        VALUE="Este es un ejemplo"
#EXT-X-SESSION-KEY:METHOD=AES-128,URI="https://priv.example.com/key.php?r=52",IV=0x9c7db8778570d05c3177c349fd9236aa
#EXT-X-STREAM-INF:BANDWIDTH=100,AVERAGE-BANDWIDTH=128,CODECS="MPEG-4;MPEG-2",RESOLUTION=1080,FRAME-RATE=29.97,HDCP-LEVEL="TYPE-0",AUDIO="AUDIO",VIDEO="VIDEO"
#EXT-X-I-FRAME-STREAM-INF:BANDWIDTH=120,URI="THATFILE.M3U8"
#EXT-X-BYTERANGE:100@10
#EXT-X-DISCONTINUITY
#EXT-X-KEY:METHOD=AES-128,URI="https://priv.example.com/key.php?r=52",IV=0x9c7db8778570d05c3177c349fd9236aa
#EXT-X-MAP:URI="https://example.map.uri",BYTERANGE="300@0"
#EXT-X-PROGRAM-DATE-TIME:2010-02-19T14:54:23.031+08:00
#EXT-X-DATERANGE:ID="ITS ID",CLASS="ITS CLASS",START-DATE="2010-02-19T14:54:23.031+08:00",END-DATE="2010-02-19T14:54:23.031+08:00",DURATION=1.33,PLANNED-DURATION=2.33
#EXTINF:23.222 tvg-logo="haha,  ddd" tvg-aa="sb@" tag=sa, Sample artist, : - Sample title
C:\Documents and Settings\I\My Music\Sample.mp3
#EXT-X-ENDLIST
#COMMENT YAS
```

Parsed result:

```json
{
  "isExtendedM3U": true,
  "segments": [
    {
      "isMasterPlaylist": true,
      "sessionKey": {
        "method": "AES-128",
        "uri": "https://priv.example.com/key.php?r=52",
        "iv": "0x9c7db8778570d05c3177c349fd9236aa"
      },
      "streamInf": {
        "bandwidth": 100,
        "averageBandwidth": 128,
        "codecs": [
          "MPEG-4",
          "MPEG-2"
        ],
        "resolution": 1080,
        "frameRate": 29.97,
        "hdcpLevel": "TYPE-0",
        "audio": "AUDIO",
        "video": "VIDEO"
      },
      "iFrameStreamInf": {
        "bandwidth": 120,
        "uri": "THATFILE.M3U8"
      },
      "byteRange": {
        "length": 100,
        "offset": 10
      },
      "discontinuity": true,
      "key": {
        "method": "AES-128",
        "uri": "https://priv.example.com/key.php?r=52",
        "iv": "0x9c7db8778570d05c3177c349fd9236aa"
      },
      "map": {
        "uri": "https://example.map.uri",
        "byterange": {
          "length": 300,
          "offset": 0
        }
      },
      "programDateTime": "2010-02-19T06:54:23.031Z",
      "dateRange": {
        "id": "ITS ID",
        "class": "ITS CLASS",
        "startDate": "2010-02-19T06:54:23.031Z",
        "endDate": "2010-02-19T06:54:23.031Z",
        "duration": 1.33,
        "plannedDuration": 2.33
      },
      "inf": {
        "duration": 23.222,
        "title": "Sample artist, : - Sample title",
        "tvg-logo": "haha,  ddd",
        "tvg-aa": "sb@",
        "tag": "sa"
      },
      "url": "C:\\Documents and Settings\\I\\My Music\\Sample.mp3"
    }
  ],
  "version": 2,
  "targetDuration": 6,
  "playlistType": "VOD",
  "discontinuitySequence": 1,
  "start": {
    "percise": true,
    "timeOffset": 2.11
  },
  "mediaSequence": 1,
  "independentSegments": true,
  "media": {
    "SUBTITLES": {
      "subs": {
        "English": {
          "groupId": "subs",
          "type": "SUBTITLES",
          "name": "English",
          "default": true,
          "autoselect": true,
          "forced": true,
          "language": "en",
          "characteristics": "public.accessibility.transcribes-spoken-dialog, public.accessibility.describes-music-and-sound",
          "uri": "subtitles/eng/prog_index.m3u8"
        },
        "English (Forced)": {
          "groupId": "subs",
          "type": "SUBTITLES",
          "name": "English (Forced)",
          "default": true,
          "autoselect": true,
          "forced": true,
          "language": "en",
          "uri": "subtitles/eng_forced/prog_index.m3u8"
        },
        "Français": {
          "groupId": "subs",
          "type": "SUBTITLES",
          "name": "Français",
          "default": true,
          "autoselect": true,
          "forced": true,
          "language": "fr",
          "characteristics": "public.accessibility.transcribes-spoken-dialog, public.accessibility.describes-music-and-sound",
          "uri": "subtitles/fra/prog_index.m3u8"
        },
        "Français (Forced)": {
          "groupId": "subs",
          "type": "SUBTITLES",
          "name": "Français (Forced)",
          "default": true,
          "autoselect": true,
          "forced": true,
          "language": "fr",
          "uri": "subtitles/fra_forced/prog_index.m3u8"
        },
        "Español": {
          "groupId": "subs",
          "type": "SUBTITLES",
          "name": "Español",
          "default": true,
          "autoselect": true,
          "forced": true,
          "language": "es",
          "characteristics": "public.accessibility.transcribes-spoken-dialog, public.accessibility.describes-music-and-sound",
          "uri": "subtitles/spa/prog_index.m3u8"
        },
        "Español (Forced)": {
          "groupId": "subs",
          "type": "SUBTITLES",
          "name": "Español (Forced)",
          "default": true,
          "autoselect": true,
          "forced": true,
          "language": "es",
          "uri": "subtitles/spa_forced/prog_index.m3u8"
        },
        "日本語": {
          "groupId": "subs",
          "type": "SUBTITLES",
          "name": "日本語",
          "default": true,
          "autoselect": true,
          "forced": true,
          "language": "ja",
          "characteristics": "public.accessibility.transcribes-spoken-dialog, public.accessibility.describes-music-and-sound",
          "uri": "subtitles/jpn/prog_index.m3u8"
        },
        "日本語 (Forced)": {
          "groupId": "subs",
          "type": "SUBTITLES",
          "name": "日本語 (Forced)",
          "default": true,
          "autoselect": true,
          "forced": true,
          "language": "ja",
          "uri": "subtitles/jpn_forced/prog_index.m3u8"
        }
      }
    }
  },
  "sessionData": {
    "com.example.lyrics": {
      "undefined": {
        "dataId": "com.example.lyrics",
        "uri": "lyrics.json"
      }
    },
    "com.example.title": {
      "en": {
        "dataId": "com.example.title",
        "language": "en",
        "value": "This is an example"
      },
      "es": {
        "dataId": "com.example.title",
        "language": "es",
        "value": "Este es un ejemplo"
      }
    }
  },
  "endList": 2
}
```

## License

MIT
