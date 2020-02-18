/*! (c) Andrea Giammarchi @WebReflection */

import {encode as utf16Encode, decode as utf16Decode} from 'uint8-to-utf16';
import {encode as b64Encode, decode as b64Decode} from 'uint8-to-base64';

const {defineProperty} = Object;

const asUTF16String = {value() {
  return utf16Encode(new Uint8Array(this));
}};

const asBase64String = {value() {
  return b64Encode(new Uint8Array(this));
}};

const transform = (stream, value) => new Response(
  new Blob([value]).stream().pipeThrough(stream)
).arrayBuffer();

export default class WebCompressor {
  constructor(format = 'deflate', outcome = 'base64') {
    const isUTF16 = outcome === 'utf-16';
    this.compress = this.compress.bind(this, format,
      isUTF16 ? asUTF16String : asBase64String
    );
    this.decompress = this.decompress.bind(this, format,
      isUTF16 ? utf16Decode : b64Decode
    );
  }
  async compress(format, toString, value) {
    return defineProperty(
      await transform(
        new CompressionStream(format),
        typeof value === 'string' ?
          new TextEncoder().encode(value) :
          value
      ),
      'toString',
      toString
    );
  }
  async decompress(format, converter, value) {
    return new TextDecoder().decode(
      await transform(
        new DecompressionStream(format),
        typeof value === 'string' ?
          converter(value) :
          value
      )
    );
  }
};
