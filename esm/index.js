/*! (c) Andrea Giammarchi @WebReflection */

import {pack, unpack} from './packer.js';

const {defineProperty} = Object;
const {fromCharCode} = String;

const asCharCode = c => c.charCodeAt(0);

const asUint8Array = value => Uint8Array.from(atob(value), asCharCode);

const toUTF16String = {value() {
  return pack(new Uint8Array(this));
}};

const toBase64String = {value() {
  return btoa(fromCharCode(...new Uint8Array(this)));
}};

const transform = (stream, value) => new Response(
  new Blob([value]).stream().pipeThrough(stream)
).arrayBuffer();

export default class WebCompressor {
  constructor(format = 'deflate', outcome = 'base64') {
    const isUTF16 = outcome === 'utf-16';
    this.compress = this.compress.bind(this, format,
      isUTF16 ? toUTF16String : toBase64String
    );
    this.decompress = this.decompress.bind(this, format,
      isUTF16 ? unpack : asUint8Array
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
