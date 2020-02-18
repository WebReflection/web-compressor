# WebCompressor

A gzip/deflate compressor based on De/CompressionStream buffers and base64.

```js
import WebCompressor from 'web-compressor';
// const WebCompressor = require('web-compressor');

// the format is deflate by default
const {compress, decompress} = new WebCompressor('gzip');

compress('This string is long enough to be worth using compression'.repeat(10))
  .then(arrayBuffer => {

    // the compressed arrayBuffer has a special toString implementation
    const asString = '' + arrayBuffer;

    // such string is the base64 version of the compressed buffer
    console.log('compressed length', asString.length);

    // when decompressing you can pass either the buffer or its string
    decompress(asString || buffer).then(originalString => {
      console.log('original length', originalString.length);
      console.log(originalString.slice(0, 56));
    });
  });
```
