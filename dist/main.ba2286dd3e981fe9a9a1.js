/*! For license information please see main.ba2286dd3e981fe9a9a1.js.LICENSE.txt */
(()=>{var t={389:t=>{"use strict";t.exports=function(t){const e=window.innerWidth,r=window.innerHeight,n=e/t.width,i=r/t.height,o=Math.min(n,i);return t.style.transform="scale("+o+")",t.style.left=(e-t.width)/2+"px",t.style.top=(r-t.height)/2+"px",o}},660:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});var n=r(645),i=r.n(n)()((function(t){return t[1]}));i.push([t.id,"* {\r\n  overflow: hidden;\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\nbody {\r\n\tfont-family: sans-serif;\r\n\tfont-size:16px;\r\n\ttransition:all 0.2s linear;\r\n}\r\n#game {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100vh;\r\n  background: gray;\r\n}\r\n#loading {\r\n  text-align: center;\r\n  margin:auto;\r\n  font-size: 1.5rem;\r\n}\r\n#chatHolder {\r\n  display: none;\r\n  position: absolute;\r\n  bottom: 35%;\r\n  width: 100%;\r\n  text-align: center;\r\n  z-index: 0;\r\n}\r\n\r\n#chatBox {\r\n  padding: 6px;\r\n  font-size: 20px;\r\n  color: #222222;\r\n  background-color: rgba(100, 100, 100, 0.5);\r\n  -webkit-border-radius: 4px;\r\n  -moz-border-radius: 4px;\r\n  border-radius: 4px;\r\n  pointer-events: all;\r\n  border: none;\r\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,\r\n    50 50 50px rgba(82, 168, 236, 0.6);\r\n  text-shadow: -2px -2px 5px white, 2px 2px 5px white;\r\n  outline: none;\r\n}\r\n.chat::-webkit-input-placeholder {\r\n  color: #333;\r\n}\r\n.chat:-moz-placeholder {\r\n  color: #333;\r\n  opacity: 1;\r\n}\r\n.chat::-moz-placeholder {\r\n  color: #333;\r\n  opacity: 1;\r\n}\r\n.chat:-ms-input-placeholder {\r\n  color: #333;\r\n}\r\n\r\n#canvas {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  cursor: default;\r\n  z-index: 0;\r\n  border-radius: 5px;\r\n}\r\n",""]);const o=i},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=t(e);return e[2]?"@media ".concat(e[2]," {").concat(r,"}"):r})).join("")},e.i=function(t,r,n){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(n)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var f=0;f<t.length;f++){var s=[].concat(t[f]);n&&i[s[0]]||(r&&(s[2]?s[2]="".concat(r," and ").concat(s[2]):s[2]=r),e.push(s))}},e}},258:t=>{!function(e){t.exports=e;var r={on:function(t,e){return o(this,t).push(e),this},once:function(t,e){var r=this;return n.originalListener=e,o(r,t).push(n),r;function n(){i.call(r,t,n),e.apply(this,arguments)}},off:i,emit:function(t,e){var r=this,n=o(r,t,!0);if(!n)return!1;var i=arguments.length;if(1===i)n.forEach(f);else if(2===i)n.forEach(s);else{var a=Array.prototype.slice.call(arguments,1);n.forEach(u)}return!!n.length;function f(t){t.call(r)}function s(t){t.call(r,e)}function u(t){t.apply(r,a)}}};function n(t){for(var e in r)t[e]=r[e];return t}function i(t,e){var r,n=this;if(arguments.length){if(e){if(r=o(n,t,!0)){if(!(r=r.filter(a)).length)return i.call(n,t);n.listeners[t]=r}}else if((r=n.listeners)&&(delete r[t],!Object.keys(r).length))return i.call(n)}else delete n.listeners;return n;function a(t){return t!==e&&t.originalListener!==e}}function o(t,e,r){if(!r||t.listeners){var n=t.listeners||(t.listeners={});return n[e]||(n[e]=[])}}n(e.prototype),e.mixin=n}((function t(){if(!(this instanceof t))return new t}))},241:(t,e)=>{e.read=function(t,e,r,n,i){var o,a,f=8*i-n-1,s=(1<<f)-1,u=s>>1,c=-7,l=r?i-1:0,h=r?-1:1,d=t[e+l];for(l+=h,o=d&(1<<-c)-1,d>>=-c,c+=f;c>0;o=256*o+t[e+l],l+=h,c-=8);for(a=o&(1<<-c)-1,o>>=-c,c+=n;c>0;a=256*a+t[e+l],l+=h,c-=8);if(0===o)o=1-u;else{if(o===s)return a?NaN:1/0*(d?-1:1);a+=Math.pow(2,n),o-=u}return(d?-1:1)*a*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var a,f,s,u=8*o-i-1,c=(1<<u)-1,l=c>>1,h=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:o-1,p=n?1:-1,y=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(f=isNaN(e)?1:0,a=c):(a=Math.floor(Math.log(e)/Math.LN2),e*(s=Math.pow(2,-a))<1&&(a--,s*=2),(e+=a+l>=1?h/s:h*Math.pow(2,1-l))*s>=2&&(a++,s/=2),a+l>=c?(f=0,a=c):a+l>=1?(f=(e*s-1)*Math.pow(2,i),a+=l):(f=e*Math.pow(2,l-1)*Math.pow(2,i),a=0));i>=8;t[r+d]=255&f,d+=p,f/=256,i-=8);for(a=a<<i|f,u+=i;u>0;t[r+d]=255&a,d+=p,a/=256,u-=8);t[r+d-p]|=128*y}},166:function(t,e){!function(t){var e,r="undefined",n=r!==typeof Buffer&&Buffer,i=r!==typeof Uint8Array&&Uint8Array,o=r!==typeof ArrayBuffer&&ArrayBuffer,a=[0,0,0,0,0,0,0,0],f=Array.isArray||function(t){return!!t&&"[object Array]"==Object.prototype.toString.call(t)},s=4294967296;function u(f,u,g){var m=u?0:4,E=u?4:0,k=u?0:3,A=u?1:2,U=u?2:1,B=u?3:0,S=u?v:w,P=u?x:b,M=C.prototype,T="is"+f,I="_"+T;return M.buffer=void 0,M.offset=0,M[I]=!0,M.toNumber=R,M.toString=function(t){var e=this.buffer,r=this.offset,n=D(e,r+m),i=D(e,r+E),o="",a=!g&&2147483648&n;for(a&&(n=~n,i=s-i),t=t||10;;){var f=n%t*s+i;if(n=Math.floor(n/t),i=Math.floor(f/t),o=(f%t).toString(t)+o,!n&&!i)break}return a&&(o="-"+o),o},M.toJSON=R,M.toArray=c,n&&(M.toBuffer=l),i&&(M.toArrayBuffer=h),C[T]=function(t){return!(!t||!t[I])},t[f]=C,C;function C(t,n,f,u){return this instanceof C?function(t,n,f,u,c){i&&o&&(n instanceof o&&(n=new i(n)),u instanceof o&&(u=new i(u))),n||f||u||e?(d(n,f)||(c=f,u=n,f=0,n=new(e||Array)(8)),t.buffer=n,t.offset=f|=0,r!==typeof u&&("string"==typeof u?function(t,e,r,n){var i=0,o=r.length,a=0,f=0;"-"===r[0]&&i++;for(var u=i;i<o;){var c=parseInt(r[i++],n);if(!(c>=0))break;f=f*n+c,a=a*n+Math.floor(f/s),f%=s}u&&(a=~a,f?f=s-f:a++),N(t,e+m,a),N(t,e+E,f)}(n,f,u,c||10):d(u,c)?p(n,f,u,c):"number"==typeof c?(N(n,f+m,u),N(n,f+E,c)):u>0?S(n,f,u):u<0?P(n,f,u):p(n,f,a,0))):t.buffer=y(a,0)}(this,t,n,f,u):new C(t,n,f,u)}function R(){var t=this.buffer,e=this.offset,r=D(t,e+m),n=D(t,e+E);return g||(r|=0),r?r*s+n:n}function N(t,e,r){t[e+B]=255&r,r>>=8,t[e+U]=255&r,r>>=8,t[e+A]=255&r,r>>=8,t[e+k]=255&r}function D(t,e){return 16777216*t[e+k]+(t[e+A]<<16)+(t[e+U]<<8)+t[e+B]}}function c(t){var r=this.buffer,n=this.offset;return e=null,!1!==t&&0===n&&8===r.length&&f(r)?r:y(r,n)}function l(t){var r=this.buffer,i=this.offset;if(e=n,!1!==t&&0===i&&8===r.length&&Buffer.isBuffer(r))return r;var o=new n(8);return p(o,0,r,i),o}function h(t){var r=this.buffer,n=this.offset,a=r.buffer;if(e=i,!1!==t&&0===n&&a instanceof o&&8===a.byteLength)return a;var f=new i(8);return p(f,0,r,n),f.buffer}function d(t,e){var r=t&&t.length;return e|=0,r&&e+8<=r&&"string"!=typeof t[e]}function p(t,e,r,n){e|=0,n|=0;for(var i=0;i<8;i++)t[e++]=255&r[n++]}function y(t,e){return Array.prototype.slice.call(t,e,e+8)}function v(t,e,r){for(var n=e+8;n>e;)t[--n]=255&r,r/=256}function x(t,e,r){var n=e+8;for(r++;n>e;)t[--n]=255&-r^255,r/=256}function w(t,e,r){for(var n=e+8;e<n;)t[e++]=255&r,r/=256}function b(t,e,r){var n=e+8;for(r++;e<n;)t[e++]=255&-r^255,r/=256}u("Uint64BE",!0,!0),u("Int64BE",!0,!1),u("Uint64LE",!1,!0),u("Int64LE",!1,!1)}("string"!=typeof e.nodeName?e:this||{})},826:t=>{var e={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==e.call(t)}},374:(t,e,r)=>{e.encode=r(764).encode,e.decode=r(299).decode,e.Encoder=r(883).Encoder,e.Decoder=r(441).Decoder,e.createCodec=r(832).createCodec,e.codec=r(766).codec},679:function(t){function e(t){return t&&t.isBuffer&&t}t.exports=e("undefined"!=typeof Buffer&&Buffer)||e(this.Buffer)||e("undefined"!=typeof window&&window.Buffer)||this.Buffer},947:(t,e)=>{e.copy=function(t,e,r,n){var i;r||(r=0),n||0===n||(n=this.length),e||(e=0);var o=n-r;if(t===this&&r<e&&e<n)for(i=o-1;i>=0;i--)t[i+e]=this[i+r];else for(i=0;i<o;i++)t[i+e]=this[i+r];return o},e.toString=function(t,e,r){var n=this,i=0|e;r||(r=n.length);for(var o="",a=0;i<r;)(a=n[i++])<128?o+=String.fromCharCode(a):(192==(224&a)?a=(31&a)<<6|63&n[i++]:224==(240&a)?a=(15&a)<<12|(63&n[i++])<<6|63&n[i++]:240==(248&a)&&(a=(7&a)<<18|(63&n[i++])<<12|(63&n[i++])<<6|63&n[i++]),a>=65536?(a-=65536,o+=String.fromCharCode(55296+(a>>>10),56320+(1023&a))):o+=String.fromCharCode(a));return o},e.write=function(t,e){for(var r=this,n=e||(e|=0),i=t.length,o=0,a=0;a<i;)(o=t.charCodeAt(a++))<128?r[n++]=o:o<2048?(r[n++]=192|o>>>6,r[n++]=128|63&o):o<55296||o>57343?(r[n++]=224|o>>>12,r[n++]=128|o>>>6&63,r[n++]=128|63&o):(o=65536+(o-55296<<10|t.charCodeAt(a++)-56320),r[n++]=240|o>>>18,r[n++]=128|o>>>12&63,r[n++]=128|o>>>6&63,r[n++]=128|63&o);return n-e}},683:(t,e,r)=>{var n=r(895),i=t.exports=o(0);function o(t){return new Array(t)}i.alloc=o,i.concat=n.concat,i.from=function(t){if(!n.isBuffer(t)&&n.isView(t))t=n.Uint8Array.from(t);else if(n.isArrayBuffer(t))t=new Uint8Array(t);else{if("string"==typeof t)return n.from.call(i,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return Array.prototype.slice.call(t)}},580:(t,e,r)=>{var n=r(895),i=n.global,o=t.exports=n.hasBuffer?a(0):[];function a(t){return new i(t)}o.alloc=n.hasBuffer&&i.alloc||a,o.concat=n.concat,o.from=function(t){if(!n.isBuffer(t)&&n.isView(t))t=n.Uint8Array.from(t);else if(n.isArrayBuffer(t))t=new Uint8Array(t);else{if("string"==typeof t)return n.from.call(o,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return i.from&&1!==i.from.length?i.from(t):new i(t)}},190:(t,e,r)=>{var n=r(947);e.copy=s,e.slice=u,e.toString=function(t,e,r){var o=!a&&i.isBuffer(this)?this.toString:n.toString;return o.apply(this,arguments)},e.write=("write",function(){return(this.write||n.write).apply(this,arguments)});var i=r(895),o=i.global,a=i.hasBuffer&&"TYPED_ARRAY_SUPPORT"in o,f=a&&!o.TYPED_ARRAY_SUPPORT;function s(t,e,r,o){var a=i.isBuffer(this),s=i.isBuffer(t);if(a&&s)return this.copy(t,e,r,o);if(f||a||s||!i.isView(this)||!i.isView(t))return n.copy.call(this,t,e,r,o);var c=r||null!=o?u.call(this,r,o):this;return t.set(c,e),c.length}function u(t,e){var r=this.slice||!f&&this.subarray;if(r)return r.call(this,t,e);var n=i.alloc.call(this,e-t);return s.call(this,n,0,t,e),n}},37:(t,e,r)=>{var n=r(895),i=t.exports=n.hasArrayBuffer?o(0):[];function o(t){return new Uint8Array(t)}i.alloc=o,i.concat=n.concat,i.from=function(t){if(n.isView(t)){var e=t.byteOffset,r=t.byteLength;(t=t.buffer).byteLength!==r&&(t.slice?t=t.slice(e,e+r):(t=new Uint8Array(t)).byteLength!==r&&(t=Array.prototype.slice.call(t,e,e+r)))}else{if("string"==typeof t)return n.from.call(i,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return new Uint8Array(t)}},895:(t,e,r)=>{var n=e.global=r(679),i=e.hasBuffer=n&&!!n.isBuffer,o=e.hasArrayBuffer="undefined"!=typeof ArrayBuffer,a=e.isArray=r(826);e.isArrayBuffer=o?function(t){return t instanceof ArrayBuffer||p(t)}:x;var f=e.isBuffer=i?n.isBuffer:x,s=e.isView=o?ArrayBuffer.isView||w("ArrayBuffer","buffer"):x;e.alloc=d,e.concat=function(t,r){r||(r=0,Array.prototype.forEach.call(t,(function(t){r+=t.length})));var n=this!==e&&this||t[0],i=d.call(n,r),o=0;return Array.prototype.forEach.call(t,(function(t){o+=h.copy.call(t,i,o)})),i},e.from=function(t){return"string"==typeof t?y.call(this,t):v(this).from(t)};var u=e.Array=r(683),c=e.Buffer=r(580),l=e.Uint8Array=r(37),h=e.prototype=r(190);function d(t){return v(this).alloc(t)}var p=w("ArrayBuffer");function y(t){var e=3*t.length,r=d.call(this,e),n=h.write.call(r,t);return e!==n&&(r=h.slice.call(r,0,n)),r}function v(t){return f(t)?c:s(t)?l:a(t)?u:i?c:o?l:u}function x(){return!1}function w(t,e){return t="[object "+t+"]",function(r){return null!=r&&{}.toString.call(e?r[e]:r)===t}}},877:(t,e,r)=>{var n=r(826);e.createCodec=f,e.install=function(t){for(var e in t)o.prototype[e]=a(o.prototype[e],t[e])},e.filter=function(t){return n(t)?function(t){return t=t.slice(),function(r){return t.reduce(e,r)};function e(t,e){return e(t)}}(t):t};var i=r(895);function o(t){if(!(this instanceof o))return new o(t);this.options=t,this.init()}function a(t,e){return t&&e?function(){return t.apply(this,arguments),e.apply(this,arguments)}:t||e}function f(t){return new o(t)}o.prototype.init=function(){var t=this.options;return t&&t.uint8array&&(this.bufferish=i.Uint8Array),this},e.preset=f({preset:!0})},766:(t,e,r)=>{r(350),r(312),e.codec={preset:r(877).preset}},170:(t,e,r)=>{e.T=i;var n=r(350).preset;function i(t){if(!(this instanceof i))return new i(t);if(t&&(this.options=t,t.codec)){var e=this.codec=t.codec;e.bufferish&&(this.bufferish=e.bufferish)}}r(822).k.mixin(i.prototype),i.prototype.codec=n,i.prototype.fetch=function(){return this.codec.decode(this)}},299:(t,e,r)=>{e.decode=function(t,e){var r=new n(e);return r.write(t),r.read()};var n=r(170).T},441:(t,e,r)=>{e.Decoder=o;var n=r(258),i=r(170).T;function o(t){if(!(this instanceof o))return new o(t);i.call(this,t)}o.prototype=new i,n.mixin(o.prototype),o.prototype.decode=function(t){arguments.length&&this.write(t),this.flush()},o.prototype.push=function(t){this.emit("data",t)},o.prototype.end=function(t){this.decode(t),this.emit("end")}},517:(t,e,r)=>{e.F=i;var n=r(312).preset;function i(t){if(!(this instanceof i))return new i(t);if(t&&(this.options=t,t.codec)){var e=this.codec=t.codec;e.bufferish&&(this.bufferish=e.bufferish)}}r(822).I.mixin(i.prototype),i.prototype.codec=n,i.prototype.write=function(t){this.codec.encode(this,t)}},764:(t,e,r)=>{e.encode=function(t,e){var r=new n(e);return r.write(t),r.read()};var n=r(517).F},883:(t,e,r)=>{e.Encoder=o;var n=r(258),i=r(517).F;function o(t){if(!(this instanceof o))return new o(t);i.call(this,t)}o.prototype=new i,n.mixin(o.prototype),o.prototype.encode=function(t){this.write(t),this.emit("data",this.read())},o.prototype.end=function(t){arguments.length&&this.encode(t),this.flush(),this.emit("end")}},83:(t,e,r)=>{e.S=function t(e,r){if(!(this instanceof t))return new t(e,r);this.buffer=n.from(e),this.type=r};var n=r(895)},431:(t,e,r)=>{e.setExtPackers=function(t){t.addExtPacker(14,Error,[l,s]),t.addExtPacker(1,EvalError,[l,s]),t.addExtPacker(2,RangeError,[l,s]),t.addExtPacker(3,ReferenceError,[l,s]),t.addExtPacker(4,SyntaxError,[l,s]),t.addExtPacker(5,TypeError,[l,s]),t.addExtPacker(6,URIError,[l,s]),t.addExtPacker(10,RegExp,[c,s]),t.addExtPacker(11,Boolean,[u,s]),t.addExtPacker(12,String,[u,s]),t.addExtPacker(13,Date,[Number,s]),t.addExtPacker(15,Number,[u,s]),"undefined"!=typeof Uint8Array&&(t.addExtPacker(17,Int8Array,a),t.addExtPacker(18,Uint8Array,a),t.addExtPacker(19,Int16Array,a),t.addExtPacker(20,Uint16Array,a),t.addExtPacker(21,Int32Array,a),t.addExtPacker(22,Uint32Array,a),t.addExtPacker(23,Float32Array,a),"undefined"!=typeof Float64Array&&t.addExtPacker(24,Float64Array,a),"undefined"!=typeof Uint8ClampedArray&&t.addExtPacker(25,Uint8ClampedArray,a),t.addExtPacker(26,ArrayBuffer,a),t.addExtPacker(29,DataView,a)),i.hasBuffer&&t.addExtPacker(27,o,i.from)};var n,i=r(895),o=i.global,a=i.Uint8Array.from,f={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function s(t){return n||(n=r(764).encode),n(t)}function u(t){return t.valueOf()}function c(t){(t=RegExp.prototype.toString.call(t).split("/")).shift();var e=[t.pop()];return e.unshift(t.join("/")),e}function l(t){var e={};for(var r in f)e[r]=t[r];return e}},600:(t,e,r)=>{e.setExtUnpackers=function(t){t.addExtUnpacker(14,[f,u(Error)]),t.addExtUnpacker(1,[f,u(EvalError)]),t.addExtUnpacker(2,[f,u(RangeError)]),t.addExtUnpacker(3,[f,u(ReferenceError)]),t.addExtUnpacker(4,[f,u(SyntaxError)]),t.addExtUnpacker(5,[f,u(TypeError)]),t.addExtUnpacker(6,[f,u(URIError)]),t.addExtUnpacker(10,[f,s]),t.addExtUnpacker(11,[f,c(Boolean)]),t.addExtUnpacker(12,[f,c(String)]),t.addExtUnpacker(13,[f,c(Date)]),t.addExtUnpacker(15,[f,c(Number)]),"undefined"!=typeof Uint8Array&&(t.addExtUnpacker(17,c(Int8Array)),t.addExtUnpacker(18,c(Uint8Array)),t.addExtUnpacker(19,[l,c(Int16Array)]),t.addExtUnpacker(20,[l,c(Uint16Array)]),t.addExtUnpacker(21,[l,c(Int32Array)]),t.addExtUnpacker(22,[l,c(Uint32Array)]),t.addExtUnpacker(23,[l,c(Float32Array)]),"undefined"!=typeof Float64Array&&t.addExtUnpacker(24,[l,c(Float64Array)]),"undefined"!=typeof Uint8ClampedArray&&t.addExtUnpacker(25,c(Uint8ClampedArray)),t.addExtUnpacker(26,l),t.addExtUnpacker(29,[l,c(DataView)])),i.hasBuffer&&t.addExtUnpacker(27,c(o))};var n,i=r(895),o=i.global,a={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function f(t){return n||(n=r(299).decode),n(t)}function s(t){return RegExp.apply(null,t)}function u(t){return function(e){var r=new t;for(var n in a)r[n]=e[n];return r}}function c(t){return function(e){return new t(e)}}function l(t){return new Uint8Array(t).buffer}},832:(t,e,r)=>{r(350),r(312),e.createCodec=r(877).createCodec},822:(t,e,r)=>{e.k=o,e.I=a;var n=r(895),i="BUFFER_SHORTAGE";function o(){if(!(this instanceof o))return new o}function a(){if(!(this instanceof a))return new a}function f(){return this.buffers&&this.buffers.length?(this.flush(),this.pull()):this.fetch()}function s(t){(this.buffers||(this.buffers=[])).push(t)}function u(t){return function(e){for(var r in t)e[r]=t[r];return e}}o.mixin=u({bufferish:n,write:function(t){var e=this.offset?n.prototype.slice.call(this.buffer,this.offset):this.buffer;this.buffer=e?t?this.bufferish.concat([e,t]):e:t,this.offset=0},fetch:function(){throw new Error("method not implemented: fetch()")},flush:function(){for(;this.offset<this.buffer.length;){var t,e=this.offset;try{t=this.fetch()}catch(t){if(t&&t.message!=i)throw t;this.offset=e;break}this.push(t)}},push:s,pull:function(){return(this.buffers||(this.buffers=[])).shift()},read:f,reserve:function(t){var e=this.offset,r=e+t;if(r>this.buffer.length)throw new Error(i);return this.offset=r,e},offset:0}),o.mixin(o.prototype),a.mixin=u({bufferish:n,write:function(){throw new Error("method not implemented: write()")},fetch:function(){var t=this.start;if(t<this.offset){var e=this.start=this.offset;return n.prototype.slice.call(this.buffer,t,e)}},flush:function(){for(;this.start<this.offset;){var t=this.fetch();t&&this.push(t)}},push:s,pull:function(){var t=this.buffers||(this.buffers=[]),e=t.length>1?this.bufferish.concat(t):t[0];return t.length=0,e},read:f,reserve:function(t){var e=0|t;if(this.buffer){var r=this.buffer.length,n=0|this.offset,i=n+e;if(i<r)return this.offset=i,n;this.flush(),t=Math.max(t,Math.min(2*r,this.maxBufferSize))}return t=Math.max(t,this.minBufferSize),this.buffer=this.bufferish.alloc(t),this.start=0,this.offset=e,0},send:function(t){var e=t.length;if(e>this.minBufferSize)this.flush(),this.push(t);else{var r=this.reserve(e);n.prototype.copy.call(t,this.buffer,r)}},maxBufferSize:65536,minBufferSize:2048,offset:0,start:0}),a.mixin(a.prototype)},350:(t,e,r)=>{var n=r(83).S,i=r(600),o=r(76).readUint8,a=r(738),f=r(877);function s(){var t=this.options;return this.decode=function(t){var e=a.getReadToken(t);return function(t){var r=o(t),n=e[r];if(!n)throw new Error("Invalid type: "+(r?"0x"+r.toString(16):r));return n(t)}}(t),t&&t.preset&&i.setExtUnpackers(this),this}f.install({addExtUnpacker:function(t,e){(this.extUnpackers||(this.extUnpackers=[]))[t]=f.filter(e)},getExtUnpacker:function(t){return(this.extUnpackers||(this.extUnpackers=[]))[t]||function(e){return new n(e,t)}},init:s}),e.preset=s.call(f.preset)},76:(t,e,r)=>{var n=r(241),i=r(166),o=i.Uint64BE,a=i.Int64BE;e.getReadFormat=function(t){var e=f.hasArrayBuffer&&t&&t.binarraybuffer,r=t&&t.int64;return{map:u&&t&&t.usemap?l:c,array:h,str:d,bin:e?y:p,ext:v,uint8:x,uint16:b,uint32:m,uint64:k(8,r?B:A),int8:w,int16:g,int32:E,int64:k(8,r?S:U),float32:k(4,P),float64:k(8,M)}},e.readUint8=x;var f=r(895),s=r(190),u="undefined"!=typeof Map;function c(t,e){var r,n={},i=new Array(e),o=new Array(e),a=t.codec.decode;for(r=0;r<e;r++)i[r]=a(t),o[r]=a(t);for(r=0;r<e;r++)n[i[r]]=o[r];return n}function l(t,e){var r,n=new Map,i=new Array(e),o=new Array(e),a=t.codec.decode;for(r=0;r<e;r++)i[r]=a(t),o[r]=a(t);for(r=0;r<e;r++)n.set(i[r],o[r]);return n}function h(t,e){for(var r=new Array(e),n=t.codec.decode,i=0;i<e;i++)r[i]=n(t);return r}function d(t,e){var r=t.reserve(e),n=r+e;return s.toString.call(t.buffer,"utf-8",r,n)}function p(t,e){var r=t.reserve(e),n=r+e,i=s.slice.call(t.buffer,r,n);return f.from(i)}function y(t,e){var r=t.reserve(e),n=r+e,i=s.slice.call(t.buffer,r,n);return f.Uint8Array.from(i).buffer}function v(t,e){var r=t.reserve(e+1),n=t.buffer[r++],i=r+e,o=t.codec.getExtUnpacker(n);if(!o)throw new Error("Invalid ext type: "+(n?"0x"+n.toString(16):n));return o(s.slice.call(t.buffer,r,i))}function x(t){var e=t.reserve(1);return t.buffer[e]}function w(t){var e=t.reserve(1),r=t.buffer[e];return 128&r?r-256:r}function b(t){var e=t.reserve(2),r=t.buffer;return r[e++]<<8|r[e]}function g(t){var e=t.reserve(2),r=t.buffer,n=r[e++]<<8|r[e];return 32768&n?n-65536:n}function m(t){var e=t.reserve(4),r=t.buffer;return 16777216*r[e++]+(r[e++]<<16)+(r[e++]<<8)+r[e]}function E(t){var e=t.reserve(4),r=t.buffer;return r[e++]<<24|r[e++]<<16|r[e++]<<8|r[e]}function k(t,e){return function(r){var n=r.reserve(t);return e.call(r.buffer,n,!0)}}function A(t){return new o(this,t).toNumber()}function U(t){return new a(this,t).toNumber()}function B(t){return new o(this,t)}function S(t){return new a(this,t)}function P(t){return n.read(this,t,!1,23,4)}function M(t){return n.read(this,t,!1,52,8)}},738:(t,e,r)=>{var n=r(76);function i(t){var e,r=new Array(256);for(e=0;e<=127;e++)r[e]=o(e);for(e=128;e<=143;e++)r[e]=f(e-128,t.map);for(e=144;e<=159;e++)r[e]=f(e-144,t.array);for(e=160;e<=191;e++)r[e]=f(e-160,t.str);for(r[192]=o(null),r[193]=null,r[194]=o(!1),r[195]=o(!0),r[196]=a(t.uint8,t.bin),r[197]=a(t.uint16,t.bin),r[198]=a(t.uint32,t.bin),r[199]=a(t.uint8,t.ext),r[200]=a(t.uint16,t.ext),r[201]=a(t.uint32,t.ext),r[202]=t.float32,r[203]=t.float64,r[204]=t.uint8,r[205]=t.uint16,r[206]=t.uint32,r[207]=t.uint64,r[208]=t.int8,r[209]=t.int16,r[210]=t.int32,r[211]=t.int64,r[212]=f(1,t.ext),r[213]=f(2,t.ext),r[214]=f(4,t.ext),r[215]=f(8,t.ext),r[216]=f(16,t.ext),r[217]=a(t.uint8,t.str),r[218]=a(t.uint16,t.str),r[219]=a(t.uint32,t.str),r[220]=a(t.uint16,t.array),r[221]=a(t.uint32,t.array),r[222]=a(t.uint16,t.map),r[223]=a(t.uint32,t.map),e=224;e<=255;e++)r[e]=o(e-256);return r}function o(t){return function(){return t}}function a(t,e){return function(r){var n=t(r);return e(r,n)}}function f(t,e){return function(r){return e(r,t)}}e.getReadToken=function(t){var e=n.getReadFormat(t);return t&&t.useraw?function(t){var e,r=i(t).slice();for(r[217]=r[196],r[218]=r[197],r[219]=r[198],e=160;e<=191;e++)r[e]=f(e-160,t.bin);return r}(e):i(e)}},312:(t,e,r)=>{var n=r(83).S,i=r(431),o=r(943),a=r(877);function f(){var t=this.options;return this.encode=function(t){var e=o.getWriteType(t);return function(t,r){var n=e[typeof r];if(!n)throw new Error('Unsupported type "'+typeof r+'": '+r);n(t,r)}}(t),t&&t.preset&&i.setExtPackers(this),this}a.install({addExtPacker:function(t,e,r){r=a.filter(r);var i=e.name;function o(e){return r&&(e=r(e)),new n(e,t)}i&&"Object"!==i?(this.extPackers||(this.extPackers={}))[i]=o:(this.extEncoderList||(this.extEncoderList=[])).unshift([e,o])},getExtPacker:function(t){var e=this.extPackers||(this.extPackers={}),r=t.constructor,n=r&&r.name&&e[r.name];if(n)return n;for(var i=this.extEncoderList||(this.extEncoderList=[]),o=i.length,a=0;a<o;a++){var f=i[a];if(r===f[0])return f[1]}},init:f}),e.preset=f.call(a.preset)},598:(t,e,r)=>{var n=r(241),i=r(166),o=i.Uint64BE,a=i.Int64BE,f=r(370).w,s=r(895),u=s.global,c=s.hasBuffer&&"TYPED_ARRAY_SUPPORT"in u&&!u.TYPED_ARRAY_SUPPORT,l=s.hasBuffer&&u.prototype||{};function h(){var t=f.slice();return t[196]=d(196),t[197]=p(197),t[198]=y(198),t[199]=d(199),t[200]=p(200),t[201]=y(201),t[202]=v(202,4,l.writeFloatBE||b,!0),t[203]=v(203,8,l.writeDoubleBE||g,!0),t[204]=d(204),t[205]=p(205),t[206]=y(206),t[207]=v(207,8,x),t[208]=d(208),t[209]=p(209),t[210]=y(210),t[211]=v(211,8,w),t[217]=d(217),t[218]=p(218),t[219]=y(219),t[220]=p(220),t[221]=y(221),t[222]=p(222),t[223]=y(223),t}function d(t){return function(e,r){var n=e.reserve(2),i=e.buffer;i[n++]=t,i[n]=r}}function p(t){return function(e,r){var n=e.reserve(3),i=e.buffer;i[n++]=t,i[n++]=r>>>8,i[n]=r}}function y(t){return function(e,r){var n=e.reserve(5),i=e.buffer;i[n++]=t,i[n++]=r>>>24,i[n++]=r>>>16,i[n++]=r>>>8,i[n]=r}}function v(t,e,r,n){return function(i,o){var a=i.reserve(e+1);i.buffer[a++]=t,r.call(i.buffer,o,a,n)}}function x(t,e){new o(this,e,t)}function w(t,e){new a(this,e,t)}function b(t,e){n.write(this,t,e,!1,23,4)}function g(t,e){n.write(this,t,e,!1,52,8)}e.getWriteToken=function(t){return t&&t.uint8array?((e=h())[202]=v(202,4,b),e[203]=v(203,8,g),e):c||s.hasBuffer&&t&&t.safe?function(){var t=f.slice();return t[196]=v(196,1,u.prototype.writeUInt8),t[197]=v(197,2,u.prototype.writeUInt16BE),t[198]=v(198,4,u.prototype.writeUInt32BE),t[199]=v(199,1,u.prototype.writeUInt8),t[200]=v(200,2,u.prototype.writeUInt16BE),t[201]=v(201,4,u.prototype.writeUInt32BE),t[202]=v(202,4,u.prototype.writeFloatBE),t[203]=v(203,8,u.prototype.writeDoubleBE),t[204]=v(204,1,u.prototype.writeUInt8),t[205]=v(205,2,u.prototype.writeUInt16BE),t[206]=v(206,4,u.prototype.writeUInt32BE),t[207]=v(207,8,x),t[208]=v(208,1,u.prototype.writeInt8),t[209]=v(209,2,u.prototype.writeInt16BE),t[210]=v(210,4,u.prototype.writeInt32BE),t[211]=v(211,8,w),t[217]=v(217,1,u.prototype.writeUInt8),t[218]=v(218,2,u.prototype.writeUInt16BE),t[219]=v(219,4,u.prototype.writeUInt32BE),t[220]=v(220,2,u.prototype.writeUInt16BE),t[221]=v(221,4,u.prototype.writeUInt32BE),t[222]=v(222,2,u.prototype.writeUInt16BE),t[223]=v(223,4,u.prototype.writeUInt32BE),t}():h();var e}},943:(t,e,r)=>{var n=r(826),i=r(166),o=i.Uint64BE,a=i.Int64BE,f=r(895),s=r(190),u=r(598),c=r(370).w,l=r(83).S,h="undefined"!=typeof Uint8Array,d="undefined"!=typeof Map,p=[];p[1]=212,p[2]=213,p[4]=214,p[8]=215,p[16]=216,e.getWriteType=function(t){var e,r=u.getWriteToken(t),i=t&&t.useraw,y=h&&t&&t.binarraybuffer,v=y?f.isArrayBuffer:f.isBuffer,x=y?function(t,e){m(t,new Uint8Array(e))}:m,w=d&&t&&t.usemap?function(t,e){if(!(e instanceof Map))return E(t,e);var n=e.size;r[n<16?128+n:n<=65535?222:223](t,n);var i=t.codec.encode;e.forEach((function(e,r,n){i(t,r),i(t,e)}))}:E;return{boolean:function(t,e){r[e?195:194](t,e)},function:g,number:function(t,e){var n=0|e;e===n?r[-32<=n&&n<=127?255&n:0<=n?n<=255?204:n<=65535?205:206:-128<=n?208:-32768<=n?209:210](t,n):r[203](t,e)},object:i?function(t,e){if(v(e))return function(t,e){var n=e.length;r[n<32?160+n:n<=65535?218:219](t,n),t.send(e)}(t,e);b(t,e)}:b,string:(e=i?function(t){return t<32?1:t<=65535?3:5}:function(t){return t<32?1:t<=255?2:t<=65535?3:5},function(t,n){var i=n.length,o=5+3*i;t.offset=t.reserve(o);var a=t.buffer,f=e(i),u=t.offset+f;i=s.write.call(a,n,u);var c=e(i);if(f!==c){var l=u+c-f,h=u+i;s.copy.call(a,a,l,u,h)}r[1===c?160+i:c<=3?215+c:219](t,i),t.offset+=i}),symbol:g,undefined:g};function b(t,e){if(null===e)return g(t,e);if(v(e))return x(t,e);if(n(e))return function(t,e){var n=e.length;r[n<16?144+n:n<=65535?220:221](t,n);for(var i=t.codec.encode,o=0;o<n;o++)i(t,e[o])}(t,e);if(o.isUint64BE(e))return function(t,e){r[207](t,e.toArray())}(t,e);if(a.isInt64BE(e))return function(t,e){r[211](t,e.toArray())}(t,e);var i=t.codec.getExtPacker(e);if(i&&(e=i(e)),e instanceof l)return function(t,e){var n=e.buffer,i=n.length,o=p[i]||(i<255?199:i<=65535?200:201);r[o](t,i),c[e.type](t),t.send(n)}(t,e);w(t,e)}function g(t,e){r[192](t,e)}function m(t,e){var n=e.length;r[n<255?196:n<=65535?197:198](t,n),t.send(e)}function E(t,e){var n=Object.keys(e),i=n.length;r[i<16?128+i:i<=65535?222:223](t,i);var o=t.codec.encode;n.forEach((function(r){o(t,r),o(t,e[r])}))}}},370:(t,e)=>{for(var r=e.w=new Array(256),n=0;n<=255;n++)r[n]=i(n);function i(t){return function(e){var r=e.reserve(1);e.buffer[r]=t}}},531:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>a});var n=r(379),i=r.n(n),o=r(660);i()(o.Z,{insert:"head",singleton:!1});const a=o.Z.locals||{}},379:(t,e,r)=>{"use strict";var n,i=function(){var t={};return function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}t[e]=r}return t[e]}}(),o=[];function a(t){for(var e=-1,r=0;r<o.length;r++)if(o[r].identifier===t){e=r;break}return e}function f(t,e){for(var r={},n=[],i=0;i<t.length;i++){var f=t[i],s=e.base?f[0]+e.base:f[0],u=r[s]||0,c="".concat(s," ").concat(u);r[s]=u+1;var l=a(c),h={css:f[1],media:f[2],sourceMap:f[3]};-1!==l?(o[l].references++,o[l].updater(h)):o.push({identifier:c,updater:y(h,e),references:1}),n.push(c)}return n}function s(t){var e=document.createElement("style"),n=t.attributes||{};if(void 0===n.nonce){var o=r.nc;o&&(n.nonce=o)}if(Object.keys(n).forEach((function(t){e.setAttribute(t,n[t])})),"function"==typeof t.insert)t.insert(e);else{var a=i(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var u,c=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function l(t,e,r,n){var i=r?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(t.styleSheet)t.styleSheet.cssText=c(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function h(t,e,r){var n=r.css,i=r.media,o=r.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var d=null,p=0;function y(t,e){var r,n,i;if(e.singleton){var o=p++;r=d||(d=s(e)),n=l.bind(null,r,o,!1),i=l.bind(null,r,o,!0)}else r=s(e),n=h.bind(null,r,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(r)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n));var r=f(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var n=0;n<r.length;n++){var i=a(r[n]);o[i].references--}for(var s=f(t,e),u=0;u<r.length;u++){var c=a(r[u]);0===o[c].references&&(o[c].updater(),o.splice(c,1))}r=s}}}},805:t=>{"use strict";t.exports={simulatePlayer:function(t,e){const r=t.players[t.id];e.up&&e.down?r.vel.y=0:e.up?r.vel.y=-r.maxSpd:e.down?r.vel.y=r.maxSpd:r.vel.y=0,e.left&&e.right?r.vel.x=0:e.left?r.vel.x=-r.maxSpd:e.right?r.vel.x=r.maxSpd:r.vel.x=0,r.pos.x+=r.vel.x,r.pos.y+=r.vel.y,r.pos.x-r.radius<0&&(r.pos.x=r.radius),r.pos.x+r.radius>t.arena.x&&(r.pos.x=t.arena.x-r.radius),r.pos.y-r.radius<0&&(r.pos.y=r.radius),r.pos.y+r.radius>t.arena.y&&(r.pos.y=t.arena.y-r.radius),r.pos.x=Math.round(r.pos.x),r.pos.y=Math.round(r.pos.y)}}}},e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={id:n,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{"use strict";r(531);const t=r(374),e=r(389),{simulatePlayer:n}=r(805),i=new WebSocket(location.origin.replace(/^http/,"ws"));i.binaryType="arraybuffer";const o=document.getElementById("game"),a=Object.create(null),f=document.getElementById("canvas"),s=f.getContext("2d"),u=document.getElementById("chatBox"),c=document.getElementById("chatHolder");let l=null,h=null;s.textAlign="center",s.font="20px Verdana, Geneva, sans-serif";let d=!1,p=!1,y=!1,v=107,x=0,w=0,b=0,g=!1;const m=Date.now();let E=0;const k="#242424",A={x:0,y:0};let U={left:!1,right:!1,up:!1,down:!1};const B=[],S=[];let P=[],M=e(f);function T(t,e){for(let e=S.length-1;e>=0;e--)S[e].tick<t.lastProcessedTick&&S.splice(e,1);const r=S.find((e=>e.tick===t.lastProcessedTick)).state.player.pos;e.correctPosition.pos=r}function I(t){if(!h||!a[h])return;const e=[[87,38],[83,40],[65,37],[68,39]].findIndex((e=>e.includes(t.keyCode))),r="keydown"===t.type;0===e&&(U.up=r),1===e&&(U.down=r),2===e&&(U.left=r),3===e&&(U.right=r),13===t.keyCode&&(p=r),!1!==r||84!==t.keyCode||y||(g=!g)}function C(t){s.fillStyle=k,s.beginPath(),s.arc(Math.round(55+t.pos.x/l.x*195),Math.round(655+t.pos.y/l.y*195),4,0,2*Math.PI),s.fill()}window.addEventListener("resize",(()=>M=e(f))),window.requestAnimationFrame((function t(){const e=(Date.now()-R)/1e3;R=Date.now(),function(){for(const t of P){if(t.selfId&&(h=t.selfId),t.arena&&(l=t.arena),t.lavaColor&&(v=t.lavaColor),t.initPack&&t.initPack.length>0)for(const e of t.initPack)new D(e);if(h&&a[h]&&t.newData)for(const e of t.newData){const t=a[e.id];t&&(void 0!==e.pos&&(e.lastProcessedTick&&h&&l&&a[h]&&e.id===h&&T(e,t),t.lastState=t.serverState,t.serverState.pos=e.pos,t.serverState.time=Date.now()),void 0!==e.chatTime&&(t.chatTime=e.chatTime),void 0!==e.chatMsg&&(t.chatMsg=e.chatMsg),void 0!==e.maxSpd&&(t.maxSpd=e.maxSpd))}if(t.removePack&&t.removePack.length>0)for(const e of t.removePack)delete a[e]}P=[]}(),function(t){if(!h||!a[h])return;y&&(U={left:!1,right:!1,up:!1,down:!1});const e=Math.ceil(.06*(Date.now()-m));for(;w<e;){const t={type:"input",input:U,tick:w};S.push({tick:w,state:{player:a[h],arena:l}}),i.send(JSON.stringify(t)),n({players:a,id:h,arena:l},U),B.push({input:U,tick:w}),w++,b++}for(const e in a)a[e].update(t)}(e),function(){if(h&&a[h]){(function(){if(p&&!d&&(y=!y,d=!0),p||(d=!1),y)c.style.display="block",u.focus(),u.setAttribute("maxlength",120);else{if(""!==u.value&&"/"!==u.value){const t={type:"chat",value:u.value};i.send(JSON.stringify(t))}c.style.display="none",u.value="",u.setAttribute("maxlength",45)}})(),function(){s.fillStyle="rgb(40,40,40)",s.fillRect(0,0,f.width,f.height);const t=Math.round(f.width/2-a[h].pos.x),e=Math.round(f.height/2-a[h].pos.y);s.fillStyle="rgb(210,210,210)",s.roundRect(t,e,l.x,l.y,10)}(),function(){const[t,e]=[Math.round(l.x/2-200-a[h].pos.x+f.width/2),Math.round(l.y/2-200-a[h].pos.y+f.height/2)];s.fillStyle=`rgb(${v},124,37)`,s.fillRect(t,e,400,400)}(),s.fillStyle="rgb(60, 60, 60, 0.8)",s.roundRect(50,650,200,200,10);for(const t in a){const e=a[t];C(e),e.draw()}s.fillStyle="black",s.font="30px Arial",s.fillText(`${E} kbps`,1500,800)}}(),requestAnimationFrame(t)})),i.onopen=()=>{i.send(JSON.stringify({type:"join"})),window.addEventListener("keydown",I),window.addEventListener("keyup",I),document.getElementById("loading").style.display="none",f.addEventListener("mousemove",(t=>{const e=f.getBoundingClientRect();A.x=Math.round((t.pageX-e.left)/M),A.y=Math.round((t.pageY-e.top)/M)})),o.style.backgroundColor="black"},setInterval((()=>{E=x/1e3,x=0,console.log(b,"updates per second"),b=0}),1e3),console.log("correction... v1"),i.addEventListener("message",(e=>{const r=t.decode(new Uint8Array(e.data));x+=e.data.byteLength,P.push(r)}));let R=Date.now();function N(t,e,r){return(1-r)*t+r*e}CanvasRenderingContext2D.prototype.roundRect=function(t,e,r,n,i){const o=t+r,a=e+n;this.beginPath(),this.moveTo(t+i,e),this.lineTo(o-i,e),this.quadraticCurveTo(o,e,o,e+i),this.lineTo(o,e+n-i),this.quadraticCurveTo(o,a,o-i,a),this.lineTo(t+i,a),this.quadraticCurveTo(t,a,t,a-i),this.lineTo(t,e+i),this.quadraticCurveTo(t,e,t+i,e),this.fill()};class D{constructor(t){this.pos=t.pos,this.radius=t.radius,this.id=t.id,this.chatTime=t.chatTime,this.chatMsg=t.chatMsg,this.vel={x:0,y:0},this.maxSpd=t.maxSpd,this.interpBuffer=[],this.serverState={time:Date.now(),pos:this.pos},this.lastState={time:Date.now(),pos:this.pos},this.correctPosition={pos:this.pos},a[this.id]=this}update(t){if(this.id!==h){const e=15*t;if(t>=1/15)return this.pos=this.serverState.pos,void(this.lastState.pos=this.serverState.pos);this.lastState.pos.x=N(this.lastState.pos.x,this.serverState.pos.x,e),this.lastState.pos.y=N(this.lastState.pos.y,this.serverState.pos.y,e),this.pos.x=N(this.pos.x,this.lastState.pos.x,e),this.pos.y=N(this.pos.y,this.lastState.pos.y,e)}else{const e=30*t;this.pos.x=N(this.pos.x,this.correctPosition.pos.x,e),this.pos.y=N(this.pos.y,this.correctPosition.pos.y,e)}}draw(){const[t,e]=[Math.round(this.pos.x-a[h].pos.x+f.width/2),Math.round(this.pos.y-a[h].pos.y+f.height/2)];if(s.fillStyle=k,s.beginPath(),s.arc(t,e,this.radius,0,2*Math.PI),s.fill(),g&&this.id===h){s.fillStyle="blue",s.beginPath();const[t,e]=[Math.round(this.serverState.pos.x-a[h].pos.x+f.width/2),Math.round(this.serverState.pos.y-a[h].pos.y+f.height/2)];s.arc(t,e,this.radius,0,2*Math.PI),s.fill()}if(g){s.fillStyle="red",s.beginPath();const[t,e]=[Math.round(this.correctPosition.pos.x-a[h].pos.x+f.width/2),Math.round(this.correctPosition.pos.y-a[h].pos.y+f.height/2)];s.arc(t,e,this.radius,0,2*Math.PI),s.fill()}if(this.chatTime>=0){s.font="20px Verdana, Geneva, sans-serif",s.fillStyle=`rgb(50, 50, 50, ${this.chatTime/3})`;const r=s.measureText(this.chatMsg).width;s.fillRect(Math.round(t-r/2-3),Math.round(e-67),Math.round(2*r/2+6),30),s.fillStyle=`rgb(200, 200, 200, ${this.chatTime/3})`,s.fillText(this.chatMsg,t,Math.round(e-this.radius-15))}}}})()})();