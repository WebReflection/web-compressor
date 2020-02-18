var webCompressor=function(e){"use strict";function s(e,r,t,n,o,a,i){try{var u=e[a](i),s=u.value}catch(e){return void t(e)}u.done?r(s):Promise.resolve(s).then(n,o)}function i(u){return function(){var e=this,i=arguments;return new Promise(function(r,t){var n=u.apply(e,i);function o(e){s(n,r,t,o,a,"next",e)}function a(e){s(n,r,t,o,a,"throw",e)}o(void 0)})}}function u(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function c(e){for(var r=[],t=e.length-1,n=0;n<t;n++){var o=e.charCodeAt(n);r.push(o>>8,255&o)}return e.charCodeAt(t)&&r.pop(),Uint8Array.from(r)}function r(e){return e.charCodeAt(0)}function f(e){return Uint8Array.from(atob(e),r)}function p(e,r){return new Response(new Blob([r]).stream().pipeThrough(e)).arrayBuffer()}
/*! (c) Andrea Giammarchi @WebReflection */
var h=Math.ceil,l=String.fromCharCode,t=String.fromCharCode,v=Object.defineProperty,n=new WeakMap,o=new WeakMap,d={value:function(){var e=n.get(this);return e||n.set(this,e=function(e){for(var r=0,t=e.length,n=h(t/2),o=new Uint16Array(n+1),a=0,i=0;i<n;i++){var u=e[a++]<<8;o[i]=u+(a<t?e[a++]:r++)}return o[n]=r,l.apply(null,o)}(new Uint8Array(this))),e}},m={value:function(){var e,r=o.get(this);return r||o.set(this,(e=new Uint8Array(this),r=btoa(t.apply(null,e)))),r}},a=function(){function n(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"deflate",r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"base64";!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,n);var t="utf-16"===r;this.compress=this.compress.bind(this,e,t?d:m),this.decompress=this.decompress.bind(this,e,t?c:f)}var e,r,t,o,a;return e=n,(r=[{key:"compress",value:(a=i(regeneratorRuntime.mark(function e(r,t,n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=v,e.next=3,p(new CompressionStream(r),"string"==typeof n?(new TextEncoder).encode(n):n);case 3:return e.t1=e.sent,e.t2=t,e.abrupt("return",(0,e.t0)(e.t1,"toString",e.t2));case 6:case"end":return e.stop()}},e)})),function(e,r,t){return a.apply(this,arguments)})},{key:"decompress",value:(o=i(regeneratorRuntime.mark(function e(r,t,n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=new TextDecoder,e.next=3,p(new DecompressionStream(r),"string"==typeof n?t(n):n);case 3:return e.t1=e.sent,e.abrupt("return",e.t0.decode.call(e.t0,e.t1));case 5:case"end":return e.stop()}},e)})),function(e,r,t){return o.apply(this,arguments)})}])&&u(e.prototype,r),t&&u(e,t),n}();return e.default=a,e}({}).default;