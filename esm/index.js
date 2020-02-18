/*! (c) Andrea Giammarchi @WebReflection */

const {ceil} = Math;
const {defineProperty} = Object;
const {fromCharCode} = String;

const pack = uint8array => {
  const {length} = uint8array;
  const len = ceil(length / 2);
  const uint16array = new Uint16Array(len);
  for (let j = 0, i = 0; i < len; i++) {
    const c = uint8array[j++] << 8;
    uint16array[i] = c + (j < length ? uint8array[j++] : 0xFF);
  }
  return fromCharCode(...uint16array);
};

const unpack = chars => {
  const codes = [];
  const {length} = chars;
  for (let i = 0; i < length; i++) {
    const c = chars.charCodeAt(i);
    codes.push(c >> 8, c & 0xFF);
  }
  if (codes[length * 2 - 1] === 0xFF)
    codes.pop();
  return Uint8Array.from(codes);
};

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
