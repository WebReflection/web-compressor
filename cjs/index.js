'use strict';
/*! (c) Andrea Giammarchi @WebReflection */

const {encode: utf16Encode, decode: utf16Decode} = require('uint8-to-utf16');
const {encode: b64Encode, decode: b64Decode} = require('uint8-to-base64');

const {defineProperty} = Object;

const encodes = new WeakMap;

const asUTF16String = {value() {
  let encoded = encodes.get(this);
  if (!encoded)
    encodes.set(this, encoded = utf16Encode(new Uint8Array(this)));
  return encoded;
}};

const asBase64String = {value() {
  let encoded = encodes.get(this);
  if (!encoded)
    encodes.set(this, encoded = b64Encode(new Uint8Array(this)));
  return encoded;
}};

const transform = (stream, value) => new Response(
  new Blob([value]).stream().pipeThrough(stream)
).arrayBuffer();

module.exports = class WebCompressor {
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
