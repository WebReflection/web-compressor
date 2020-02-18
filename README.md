# WebCompressor

<sup>**Social Media Photo by [Tarik Haiga](https://unsplash.com/@tar1k) on [Unsplash](https://unsplash.com/)**</sup>

A gzip/deflate compressor based on De/CompressionStream buffers and base64.

## API

The class in a nutshell:

```js
class WebCompressor {
  constructor(
    format:string,  // deflate (default), gzip, or others
    method:string   // base64 (default) or utf-16
  )

  async compress(any:string): Promise<string>

  async decompress(any:string | arrayBuffer):
    Promise<arrayBuffer>  // it has a special toString() method
                          // so that it's possible to use it
                          // either as buffer or as string
}
```

The `utf-16` compression method makes it possible to shrink into a JavaScript string any compressed utf-8 output.
Currently, this compression method is experimental, as it needs tests.
On average though, this produces 1/3rd of the base64 outcome, so if proven to be reliable with any sort of binary data, it might become the default in the future.

## Example

**[Live Demo](https://codepen.io/WebReflection/pen/XWbKJQq?editors=0011)** that requires a browser compatible with [De/CompressionStream](https://wicg.github.io/compression/) such as Chrome 80+.

```js
import WebCompressor from 'web-compressor';
// const WebCompressor = require('web-compressor');

// by default, arguments are `deflate` and `base64`
const {compress, decompress} = new WebCompressor('gzip');

compress('This string is long enough to be worth using compression'.repeat(10))
  .then(arrayBuffer => {

    // the compressed arrayBuffer has a special toString implementation
    const asString = '' + arrayBuffer;

    // such string is either the base64 version of the compressed buffer
    // or its utf-16 representation, accordingly with the method
    console.log('compressed length', asString.length);

    // when decompressing you can pass either the buffer or its string
    decompress(asString || buffer).then(originalString => {
      console.log('original length', originalString.length);
      console.log(originalString.slice(0, 56));
    });
  });
```
