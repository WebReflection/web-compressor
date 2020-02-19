# WebCompressor

<sup>**Social Media Photo by [Tarik Haiga](https://unsplash.com/@tar1k) on [Unsplash](https://unsplash.com/)**</sup>

A gzip/deflate compressor based on De/CompressionStream buffers and base64.

## API

The class in a nutshell:

```js
class WebCompressor {
  constructor(
    format: string,  // deflate (default), gzip, or others
    method: string   // base64 (default) or utf-16
  )

  async compress(any:string): Promise<arrayBuffer>
  // the returned arrayBuffer has a special toString() method
  // so that it's possible to use it either as buffer or as string

  async decompress(any:string | arrayBuffer): Promise<string>
  // the returned string is the one that was originally compressed
}
```

#### About the compression method

The `utf-16` compression method makes it possible to shrink into a JavaScript string any compressed `utf-8` buffer, producing on average half up to 1/3rd of the equivalent _base64_ output.

You can test some `localStorage` [benchmark here](https://gist.github.com/WebReflection/7bab57a330e4a318049fe2680ba09ed3) to verify `utf-16` grants 2.5X extra entries, compared to _base64_.

For the time being though, the `utf-16` method is not used as default, for the simple reason that it's not standardized as much as base64 is.


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
