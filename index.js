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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /*! (c) Andrea Giammarchi @WebReflection */
  var defineProperty = Object.defineProperty;
  var fromCharCode = String.fromCharCode;

  var transform = function transform(stream, value) {
    return new Response(new Blob([value]).stream().pipeThrough(stream)).arrayBuffer();
  };

  var toString = {
    value: function value() {
      return btoa(fromCharCode.apply(void 0, _toConsumableArray(new Uint8Array(this))));
    }
  };

  var WebCompressor =
  /*#__PURE__*/
  function () {
    function WebCompressor() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'deflate';

      _classCallCheck(this, WebCompressor);

      this.compress = this.compress.bind(this, format);
      this.decompress = this.decompress.bind(this, format);
    }

    _createClass(WebCompressor, [{
      key: "compress",
      value: function () {
        var _compress = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(format, value) {
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

        function compress(_x, _x2) {
          return _compress.apply(this, arguments);
        }

        return compress;
      }()
    }, {
      key: "decompress",
      value: function () {
        var _decompress = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(format, value) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = new TextDecoder();
                  _context2.t1 = Uint8Array;
                  _context2.next = 4;
                  return transform(new DecompressionStream(format), typeof value === 'string' ? Uint8Array.from(atob(value), function (c) {
                    return c.charCodeAt(0);
                  }) : value);

                case 4:
                  _context2.t2 = _context2.sent;
                  _context2.t3 = new _context2.t1(_context2.t2);
                  return _context2.abrupt("return", _context2.t0.decode.call(_context2.t0, _context2.t3));

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function decompress(_x3, _x4) {
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
