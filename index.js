var webCompressor = (function (exports) {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*! (c) Andrea Giammarchi @WebReflection */
  var ceil = Math.ceil;
  var fromCharCode = String.fromCharCode;
  var encode = function encode(uint8array) {
    var extra = 0;
    var output = [];
    var length = uint8array.length;
    var len = ceil(length / 2);

    for (var j = 0, i = 0; i < len; i++) {
      output.push(fromCharCode((uint8array[j++] << 8) + (j < length ? uint8array[j++] : extra++)));
    }

    output.push(fromCharCode(extra));
    return output.join('');
  };
  var decode = function decode(chars) {
    var codes = [];
    var length = chars.length - 1;

    for (var i = 0; i < length; i++) {
      var c = chars.charCodeAt(i);
      codes.push(c >> 8, c & 0xFF);
    }

    if (chars.charCodeAt(length)) codes.pop();
    return Uint8Array.from(codes);
  };

  var fromCharCode$1 = String.fromCharCode;
  var encode$1 = function encode(uint8array) {
    var output = [];

    for (var i = 0, length = uint8array.length; i < length; i++) {
      output.push(fromCharCode$1(uint8array[i]));
    }

    return btoa(output.join(''));
  };

  var asCharCode = function asCharCode(c) {
    return c.charCodeAt(0);
  };

  var decode$1 = function decode(chars) {
    return Uint8Array.from(atob(chars), asCharCode);
  };

  var umap = (function (_) {
    return {
      // About: get: _.get.bind(_)
      // It looks like WebKit/Safari didn't optimize bind at all,
      // so that using bind slows it down by 60%.
      // Firefox and Chrome are just fine in both cases,
      // so let's use the approach that works fast everywhere 👍
      get: function get(key) {
        return _.get(key);
      },
      set: function set(key, value) {
        return _.set(key, value), value;
      }
    };
  });

  var defineProperty = Object.defineProperty;
  var utf16encodes = umap(new WeakMap());
  var b64encodes = umap(new WeakMap());
  var asUTF16String = {
    value: function value() {
      return utf16encodes.get(this) || utf16encodes.set(this, encode(new Uint8Array(this)));
    }
  };
  var asBase64String = {
    value: function value() {
      return b64encodes.get(this) || b64encodes.set(this, encode$1(new Uint8Array(this)));
    }
  };

  var transform = function transform(stream, value) {
    return new Response(new Blob([value]).stream().pipeThrough(stream)).arrayBuffer();
  };

  var WebCompressor = /*#__PURE__*/function () {
    function WebCompressor() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'deflate';
      var outcome = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'base64';

      _classCallCheck(this, WebCompressor);

      var isUTF16 = outcome === 'utf-16';
      this.compress = this.compress.bind(this, format, isUTF16 ? asUTF16String : asBase64String);
      this.decompress = this.decompress.bind(this, format, isUTF16 ? decode : decode$1);
    }

    _createClass(WebCompressor, [{
      key: "compress",
      value: function () {
        var _compress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(format, toString, value) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = defineProperty;
                  _context.next = 3;
                  return transform(new CompressionStream(format), typeof value === 'string' ? new TextEncoder().encode(value) : value);

                case 3:
                  _context.t1 = _context.sent;
                  _context.t2 = toString;
                  return _context.abrupt("return", (0, _context.t0)(_context.t1, 'toString', _context.t2));

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function compress(_x, _x2, _x3) {
          return _compress.apply(this, arguments);
        }

        return compress;
      }()
    }, {
      key: "decompress",
      value: function () {
        var _decompress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(format, converter, value) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = new TextDecoder();
                  _context2.next = 3;
                  return transform(new DecompressionStream(format), typeof value === 'string' ? converter(value) : value);

                case 3:
                  _context2.t1 = _context2.sent;
                  return _context2.abrupt("return", _context2.t0.decode.call(_context2.t0, _context2.t1));

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function decompress(_x4, _x5, _x6) {
          return _decompress.apply(this, arguments);
        }

        return decompress;
      }()
    }]);

    return WebCompressor;
  }();

  exports.default = WebCompressor;

  return exports;

}({}).default);
