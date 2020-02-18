/*! (c) Andrea Giammarchi @WebReflection */

const {ceil} = Math;
const {fromCharCode} = String;

export const pack = uint8array => {
  let extra = 0;
  const {length} = uint8array;
  const len = ceil(length / 2);
  const uint16array = new Uint16Array(len + 1);
  for (let j = 0, i = 0; i < len; i++) {
    const c = uint8array[j++] << 8;
    uint16array[i] = c + (j < length ? uint8array[j++] : extra++);
  }
  uint16array[len] = extra;
  return fromCharCode(...uint16array);
};

export const unpack = chars => {
  const codes = [];
  const length = chars.length - 1;
  for (let i = 0; i < length; i++) {
    const c = chars.charCodeAt(i);
    codes.push(c >> 8, c & 0xFF);
  }
  if (chars.charCodeAt(length))
    codes.pop();
  return Uint8Array.from(codes);
};
