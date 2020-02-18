/*! (c) Andrea Giammarchi @WebReflection */

const {defineProperty} = Object;
const {fromCharCode} = String;

const transform = (stream, value) => new Response(
  new Blob([value]).stream().pipeThrough(stream)
).arrayBuffer();

const toString = {value() {
  return btoa(fromCharCode(...new Uint8Array(this)));
}};

export default class WebCompressor {
  constructor(format = 'deflate') {
    this.compress = this.compress.bind(this, format);
    this.decompress = this.decompress.bind(this, format);
  }
  async compress(format, value) {
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
  async decompress(format, value) {
    return new TextDecoder().decode(
      await transform(
        new DecompressionStream(format),
        typeof value === 'string' ?
          Uint8Array.from(atob(value), c => c.charCodeAt(0)) :
          value
      )
    );
  }
};
