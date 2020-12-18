/*! For license information please see main.66bd950c593362ae043d.js.LICENSE.txt */
(()=>{var t={389:t=>{"use strict";t.exports=function(t){const e=window.innerWidth,r=window.innerHeight,n=e/t.width,i=r/t.height,o=Math.min(n,i);return t.style.transform="scale("+o+")",t.style.left=(e-t.width)/2+"px",t.style.top=(r-t.height)/2+"px",o}},660:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});var n=r(645),i=r.n(n)()((function(t){return t[1]}));i.push([t.id,"* {\r\n  overflow: hidden;\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\nbody {\r\n\tfont-family: sans-serif;\r\n\tfont-size:16px;\r\n\ttransition:all 0.2s linear;\r\n}\r\n#game {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100vh;\r\n  background: gray;\r\n}\r\n#loading {\r\n  text-align: center;\r\n  margin-top:50vh;\r\n  font-size: 1.5rem;\r\n}\r\n#chatHolder {\r\n  display: none;\r\n  position: absolute;\r\n  bottom: 35%;\r\n  width: 100%;\r\n  text-align: center;\r\n  z-index: 0;\r\n}\r\n\r\n#chatBox {\r\n  padding: 6px;\r\n  font-size: 20px;\r\n  color: #222222;\r\n  background-color: rgba(100, 100, 100, 0.5);\r\n  -webkit-border-radius: 4px;\r\n  -moz-border-radius: 4px;\r\n  border-radius: 4px;\r\n  pointer-events: all;\r\n  border: none;\r\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,\r\n    50 50 50px rgba(82, 168, 236, 0.6);\r\n  text-shadow: -2px -2px 5px white, 2px 2px 5px white;\r\n  outline: none;\r\n}\r\n.chat::-webkit-input-placeholder {\r\n  color: #333;\r\n}\r\n.chat:-moz-placeholder {\r\n  color: #333;\r\n  opacity: 1;\r\n}\r\n.chat::-moz-placeholder {\r\n  color: #333;\r\n  opacity: 1;\r\n}\r\n.chat:-ms-input-placeholder {\r\n  color: #333;\r\n}\r\n\r\n#canvas {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  cursor: default;\r\n  z-index: 0;\r\n  border-radius: 5px;\r\n}\r\n",""]);const o=i},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=t(e);return e[2]?"@media ".concat(e[2]," {").concat(r,"}"):r})).join("")},e.i=function(t,r,n){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(n)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var s=0;s<t.length;s++){var f=[].concat(t[s]);n&&i[f[0]]||(r&&(f[2]?f[2]="".concat(r," and ").concat(f[2]):f[2]=r),e.push(f))}},e}},258:t=>{!function(e){t.exports=e;var r={on:function(t,e){return o(this,t).push(e),this},once:function(t,e){var r=this;return n.originalListener=e,o(r,t).push(n),r;function n(){i.call(r,t,n),e.apply(this,arguments)}},off:i,emit:function(t,e){var r=this,n=o(r,t,!0);if(!n)return!1;var i=arguments.length;if(1===i)n.forEach(s);else if(2===i)n.forEach(f);else{var a=Array.prototype.slice.call(arguments,1);n.forEach(c)}return!!n.length;function s(t){t.call(r)}function f(t){t.call(r,e)}function c(t){t.apply(r,a)}}};function n(t){for(var e in r)t[e]=r[e];return t}function i(t,e){var r,n=this;if(arguments.length){if(e){if(r=o(n,t,!0)){if(!(r=r.filter(a)).length)return i.call(n,t);n.listeners[t]=r}}else if((r=n.listeners)&&(delete r[t],!Object.keys(r).length))return i.call(n)}else delete n.listeners;return n;function a(t){return t!==e&&t.originalListener!==e}}function o(t,e,r){if(!r||t.listeners){var n=t.listeners||(t.listeners={});return n[e]||(n[e]=[])}}n(e.prototype),e.mixin=n}((function t(){if(!(this instanceof t))return new t}))},241:(t,e)=>{e.read=function(t,e,r,n,i){var o,a,s=8*i-n-1,f=(1<<s)-1,c=f>>1,u=-7,l=r?i-1:0,h=r?-1:1,d=t[e+l];for(l+=h,o=d&(1<<-u)-1,d>>=-u,u+=s;u>0;o=256*o+t[e+l],l+=h,u-=8);for(a=o&(1<<-u)-1,o>>=-u,u+=n;u>0;a=256*a+t[e+l],l+=h,u-=8);if(0===o)o=1-c;else{if(o===f)return a?NaN:1/0*(d?-1:1);a+=Math.pow(2,n),o-=c}return(d?-1:1)*a*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var a,s,f,c=8*o-i-1,u=(1<<c)-1,l=u>>1,h=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:o-1,p=n?1:-1,y=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,a=u):(a=Math.floor(Math.log(e)/Math.LN2),e*(f=Math.pow(2,-a))<1&&(a--,f*=2),(e+=a+l>=1?h/f:h*Math.pow(2,1-l))*f>=2&&(a++,f/=2),a+l>=u?(s=0,a=u):a+l>=1?(s=(e*f-1)*Math.pow(2,i),a+=l):(s=e*Math.pow(2,l-1)*Math.pow(2,i),a=0));i>=8;t[r+d]=255&s,d+=p,s/=256,i-=8);for(a=a<<i|s,c+=i;c>0;t[r+d]=255&a,d+=p,a/=256,c-=8);t[r+d-p]|=128*y}},166:function(t,e){!function(t){var e,r="undefined",n=r!==typeof Buffer&&Buffer,i=r!==typeof Uint8Array&&Uint8Array,o=r!==typeof ArrayBuffer&&ArrayBuffer,a=[0,0,0,0,0,0,0,0],s=Array.isArray||function(t){return!!t&&"[object Array]"==Object.prototype.toString.call(t)},f=4294967296;function c(s,c,b){var m=c?0:4,E=c?4:0,k=c?0:3,A=c?1:2,U=c?2:1,B=c?3:0,S=c?v:w,M=c?x:g,P=C.prototype,I="is"+s,T="_"+I;return P.buffer=void 0,P.offset=0,P[T]=!0,P.toNumber=R,P.toString=function(t){var e=this.buffer,r=this.offset,n=O(e,r+m),i=O(e,r+E),o="",a=!b&&2147483648&n;for(a&&(n=~n,i=f-i),t=t||10;;){var s=n%t*f+i;if(n=Math.floor(n/t),i=Math.floor(s/t),o=(s%t).toString(t)+o,!n&&!i)break}return a&&(o="-"+o),o},P.toJSON=R,P.toArray=u,n&&(P.toBuffer=l),i&&(P.toArrayBuffer=h),C[I]=function(t){return!(!t||!t[T])},t[s]=C,C;function C(t,n,s,c){return this instanceof C?function(t,n,s,c,u){i&&o&&(n instanceof o&&(n=new i(n)),c instanceof o&&(c=new i(c))),n||s||c||e?(d(n,s)||(u=s,c=n,s=0,n=new(e||Array)(8)),t.buffer=n,t.offset=s|=0,r!==typeof c&&("string"==typeof c?function(t,e,r,n){var i=0,o=r.length,a=0,s=0;"-"===r[0]&&i++;for(var c=i;i<o;){var u=parseInt(r[i++],n);if(!(u>=0))break;s=s*n+u,a=a*n+Math.floor(s/f),s%=f}c&&(a=~a,s?s=f-s:a++),N(t,e+m,a),N(t,e+E,s)}(n,s,c,u||10):d(c,u)?p(n,s,c,u):"number"==typeof u?(N(n,s+m,c),N(n,s+E,u)):c>0?S(n,s,c):c<0?M(n,s,c):p(n,s,a,0))):t.buffer=y(a,0)}(this,t,n,s,c):new C(t,n,s,c)}function R(){var t=this.buffer,e=this.offset,r=O(t,e+m),n=O(t,e+E);return b||(r|=0),r?r*f+n:n}function N(t,e,r){t[e+B]=255&r,r>>=8,t[e+U]=255&r,r>>=8,t[e+A]=255&r,r>>=8,t[e+k]=255&r}function O(t,e){return 16777216*t[e+k]+(t[e+A]<<16)+(t[e+U]<<8)+t[e+B]}}function u(t){var r=this.buffer,n=this.offset;return e=null,!1!==t&&0===n&&8===r.length&&s(r)?r:y(r,n)}function l(t){var r=this.buffer,i=this.offset;if(e=n,!1!==t&&0===i&&8===r.length&&Buffer.isBuffer(r))return r;var o=new n(8);return p(o,0,r,i),o}function h(t){var r=this.buffer,n=this.offset,a=r.buffer;if(e=i,!1!==t&&0===n&&a instanceof o&&8===a.byteLength)return a;var s=new i(8);return p(s,0,r,n),s.buffer}function d(t,e){var r=t&&t.length;return e|=0,r&&e+8<=r&&"string"!=typeof t[e]}function p(t,e,r,n){e|=0,n|=0;for(var i=0;i<8;i++)t[e++]=255&r[n++]}function y(t,e){return Array.prototype.slice.call(t,e,e+8)}function v(t,e,r){for(var n=e+8;n>e;)t[--n]=255&r,r/=256}function x(t,e,r){var n=e+8;for(r++;n>e;)t[--n]=255&-r^255,r/=256}function w(t,e,r){for(var n=e+8;e<n;)t[e++]=255&r,r/=256}function g(t,e,r){var n=e+8;for(r++;e<n;)t[e++]=255&-r^255,r/=256}c("Uint64BE",!0,!0),c("Int64BE",!0,!1),c("Uint64LE",!1,!0),c("Int64LE",!1,!1)}("string"!=typeof e.nodeName?e:this||{})},826:t=>{var e={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==e.call(t)}},374:(t,e,r)=>{e.encode=r(764).encode,e.decode=r(299).decode,e.Encoder=r(883).Encoder,e.Decoder=r(441).Decoder,e.createCodec=r(832).createCodec,e.codec=r(766).codec},679:function(t){function e(t){return t&&t.isBuffer&&t}t.exports=e("undefined"!=typeof Buffer&&Buffer)||e(this.Buffer)||e("undefined"!=typeof window&&window.Buffer)||this.Buffer},947:(t,e)=>{e.copy=function(t,e,r,n){var i;r||(r=0),n||0===n||(n=this.length),e||(e=0);var o=n-r;if(t===this&&r<e&&e<n)for(i=o-1;i>=0;i--)t[i+e]=this[i+r];else for(i=0;i<o;i++)t[i+e]=this[i+r];return o},e.toString=function(t,e,r){var n=this,i=0|e;r||(r=n.length);for(var o="",a=0;i<r;)(a=n[i++])<128?o+=String.fromCharCode(a):(192==(224&a)?a=(31&a)<<6|63&n[i++]:224==(240&a)?a=(15&a)<<12|(63&n[i++])<<6|63&n[i++]:240==(248&a)&&(a=(7&a)<<18|(63&n[i++])<<12|(63&n[i++])<<6|63&n[i++]),a>=65536?(a-=65536,o+=String.fromCharCode(55296+(a>>>10),56320+(1023&a))):o+=String.fromCharCode(a));return o},e.write=function(t,e){for(var r=this,n=e||(e|=0),i=t.length,o=0,a=0;a<i;)(o=t.charCodeAt(a++))<128?r[n++]=o:o<2048?(r[n++]=192|o>>>6,r[n++]=128|63&o):o<55296||o>57343?(r[n++]=224|o>>>12,r[n++]=128|o>>>6&63,r[n++]=128|63&o):(o=65536+(o-55296<<10|t.charCodeAt(a++)-56320),r[n++]=240|o>>>18,r[n++]=128|o>>>12&63,r[n++]=128|o>>>6&63,r[n++]=128|63&o);return n-e}},683:(t,e,r)=>{var n=r(895),i=t.exports=o(0);function o(t){return new Array(t)}i.alloc=o,i.concat=n.concat,i.from=function(t){if(!n.isBuffer(t)&&n.isView(t))t=n.Uint8Array.from(t);else if(n.isArrayBuffer(t))t=new Uint8Array(t);else{if("string"==typeof t)return n.from.call(i,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return Array.prototype.slice.call(t)}},580:(t,e,r)=>{var n=r(895),i=n.global,o=t.exports=n.hasBuffer?a(0):[];function a(t){return new i(t)}o.alloc=n.hasBuffer&&i.alloc||a,o.concat=n.concat,o.from=function(t){if(!n.isBuffer(t)&&n.isView(t))t=n.Uint8Array.from(t);else if(n.isArrayBuffer(t))t=new Uint8Array(t);else{if("string"==typeof t)return n.from.call(o,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return i.from&&1!==i.from.length?i.from(t):new i(t)}},190:(t,e,r)=>{var n=r(947);e.copy=f,e.slice=c,e.toString=function(t,e,r){var o=!a&&i.isBuffer(this)?this.toString:n.toString;return o.apply(this,arguments)},e.write=("write",function(){return(this.write||n.write).apply(this,arguments)});var i=r(895),o=i.global,a=i.hasBuffer&&"TYPED_ARRAY_SUPPORT"in o,s=a&&!o.TYPED_ARRAY_SUPPORT;function f(t,e,r,o){var a=i.isBuffer(this),f=i.isBuffer(t);if(a&&f)return this.copy(t,e,r,o);if(s||a||f||!i.isView(this)||!i.isView(t))return n.copy.call(this,t,e,r,o);var u=r||null!=o?c.call(this,r,o):this;return t.set(u,e),u.length}function c(t,e){var r=this.slice||!s&&this.subarray;if(r)return r.call(this,t,e);var n=i.alloc.call(this,e-t);return f.call(this,n,0,t,e),n}},37:(t,e,r)=>{var n=r(895),i=t.exports=n.hasArrayBuffer?o(0):[];function o(t){return new Uint8Array(t)}i.alloc=o,i.concat=n.concat,i.from=function(t){if(n.isView(t)){var e=t.byteOffset,r=t.byteLength;(t=t.buffer).byteLength!==r&&(t.slice?t=t.slice(e,e+r):(t=new Uint8Array(t)).byteLength!==r&&(t=Array.prototype.slice.call(t,e,e+r)))}else{if("string"==typeof t)return n.from.call(i,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return new Uint8Array(t)}},895:(t,e,r)=>{var n=e.global=r(679),i=e.hasBuffer=n&&!!n.isBuffer,o=e.hasArrayBuffer="undefined"!=typeof ArrayBuffer,a=e.isArray=r(826);e.isArrayBuffer=o?function(t){return t instanceof ArrayBuffer||p(t)}:x;var s=e.isBuffer=i?n.isBuffer:x,f=e.isView=o?ArrayBuffer.isView||w("ArrayBuffer","buffer"):x;e.alloc=d,e.concat=function(t,r){r||(r=0,Array.prototype.forEach.call(t,(function(t){r+=t.length})));var n=this!==e&&this||t[0],i=d.call(n,r),o=0;return Array.prototype.forEach.call(t,(function(t){o+=h.copy.call(t,i,o)})),i},e.from=function(t){return"string"==typeof t?y.call(this,t):v(this).from(t)};var c=e.Array=r(683),u=e.Buffer=r(580),l=e.Uint8Array=r(37),h=e.prototype=r(190);function d(t){return v(this).alloc(t)}var p=w("ArrayBuffer");function y(t){var e=3*t.length,r=d.call(this,e),n=h.write.call(r,t);return e!==n&&(r=h.slice.call(r,0,n)),r}function v(t){return s(t)?u:f(t)?l:a(t)?c:i?u:o?l:c}function x(){return!1}function w(t,e){return t="[object "+t+"]",function(r){return null!=r&&{}.toString.call(e?r[e]:r)===t}}},877:(t,e,r)=>{var n=r(826);e.createCodec=s,e.install=function(t){for(var e in t)o.prototype[e]=a(o.prototype[e],t[e])},e.filter=function(t){return n(t)?function(t){return t=t.slice(),function(r){return t.reduce(e,r)};function e(t,e){return e(t)}}(t):t};var i=r(895);function o(t){if(!(this instanceof o))return new o(t);this.options=t,this.init()}function a(t,e){return t&&e?function(){return t.apply(this,arguments),e.apply(this,arguments)}:t||e}function s(t){return new o(t)}o.prototype.init=function(){var t=this.options;return t&&t.uint8array&&(this.bufferish=i.Uint8Array),this},e.preset=s({preset:!0})},766:(t,e,r)=>{r(350),r(312),e.codec={preset:r(877).preset}},170:(t,e,r)=>{e.T=i;var n=r(350).preset;function i(t){if(!(this instanceof i))return new i(t);if(t&&(this.options=t,t.codec)){var e=this.codec=t.codec;e.bufferish&&(this.bufferish=e.bufferish)}}r(822).k.mixin(i.prototype),i.prototype.codec=n,i.prototype.fetch=function(){return this.codec.decode(this)}},299:(t,e,r)=>{e.decode=function(t,e){var r=new n(e);return r.write(t),r.read()};var n=r(170).T},441:(t,e,r)=>{e.Decoder=o;var n=r(258),i=r(170).T;function o(t){if(!(this instanceof o))return new o(t);i.call(this,t)}o.prototype=new i,n.mixin(o.prototype),o.prototype.decode=function(t){arguments.length&&this.write(t),this.flush()},o.prototype.push=function(t){this.emit("data",t)},o.prototype.end=function(t){this.decode(t),this.emit("end")}},517:(t,e,r)=>{e.F=i;var n=r(312).preset;function i(t){if(!(this instanceof i))return new i(t);if(t&&(this.options=t,t.codec)){var e=this.codec=t.codec;e.bufferish&&(this.bufferish=e.bufferish)}}r(822).I.mixin(i.prototype),i.prototype.codec=n,i.prototype.write=function(t){this.codec.encode(this,t)}},764:(t,e,r)=>{e.encode=function(t,e){var r=new n(e);return r.write(t),r.read()};var n=r(517).F},883:(t,e,r)=>{e.Encoder=o;var n=r(258),i=r(517).F;function o(t){if(!(this instanceof o))return new o(t);i.call(this,t)}o.prototype=new i,n.mixin(o.prototype),o.prototype.encode=function(t){this.write(t),this.emit("data",this.read())},o.prototype.end=function(t){arguments.length&&this.encode(t),this.flush(),this.emit("end")}},83:(t,e,r)=>{e.S=function t(e,r){if(!(this instanceof t))return new t(e,r);this.buffer=n.from(e),this.type=r};var n=r(895)},431:(t,e,r)=>{e.setExtPackers=function(t){t.addExtPacker(14,Error,[l,f]),t.addExtPacker(1,EvalError,[l,f]),t.addExtPacker(2,RangeError,[l,f]),t.addExtPacker(3,ReferenceError,[l,f]),t.addExtPacker(4,SyntaxError,[l,f]),t.addExtPacker(5,TypeError,[l,f]),t.addExtPacker(6,URIError,[l,f]),t.addExtPacker(10,RegExp,[u,f]),t.addExtPacker(11,Boolean,[c,f]),t.addExtPacker(12,String,[c,f]),t.addExtPacker(13,Date,[Number,f]),t.addExtPacker(15,Number,[c,f]),"undefined"!=typeof Uint8Array&&(t.addExtPacker(17,Int8Array,a),t.addExtPacker(18,Uint8Array,a),t.addExtPacker(19,Int16Array,a),t.addExtPacker(20,Uint16Array,a),t.addExtPacker(21,Int32Array,a),t.addExtPacker(22,Uint32Array,a),t.addExtPacker(23,Float32Array,a),"undefined"!=typeof Float64Array&&t.addExtPacker(24,Float64Array,a),"undefined"!=typeof Uint8ClampedArray&&t.addExtPacker(25,Uint8ClampedArray,a),t.addExtPacker(26,ArrayBuffer,a),t.addExtPacker(29,DataView,a)),i.hasBuffer&&t.addExtPacker(27,o,i.from)};var n,i=r(895),o=i.global,a=i.Uint8Array.from,s={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function f(t){return n||(n=r(764).encode),n(t)}function c(t){return t.valueOf()}function u(t){(t=RegExp.prototype.toString.call(t).split("/")).shift();var e=[t.pop()];return e.unshift(t.join("/")),e}function l(t){var e={};for(var r in s)e[r]=t[r];return e}},600:(t,e,r)=>{e.setExtUnpackers=function(t){t.addExtUnpacker(14,[s,c(Error)]),t.addExtUnpacker(1,[s,c(EvalError)]),t.addExtUnpacker(2,[s,c(RangeError)]),t.addExtUnpacker(3,[s,c(ReferenceError)]),t.addExtUnpacker(4,[s,c(SyntaxError)]),t.addExtUnpacker(5,[s,c(TypeError)]),t.addExtUnpacker(6,[s,c(URIError)]),t.addExtUnpacker(10,[s,f]),t.addExtUnpacker(11,[s,u(Boolean)]),t.addExtUnpacker(12,[s,u(String)]),t.addExtUnpacker(13,[s,u(Date)]),t.addExtUnpacker(15,[s,u(Number)]),"undefined"!=typeof Uint8Array&&(t.addExtUnpacker(17,u(Int8Array)),t.addExtUnpacker(18,u(Uint8Array)),t.addExtUnpacker(19,[l,u(Int16Array)]),t.addExtUnpacker(20,[l,u(Uint16Array)]),t.addExtUnpacker(21,[l,u(Int32Array)]),t.addExtUnpacker(22,[l,u(Uint32Array)]),t.addExtUnpacker(23,[l,u(Float32Array)]),"undefined"!=typeof Float64Array&&t.addExtUnpacker(24,[l,u(Float64Array)]),"undefined"!=typeof Uint8ClampedArray&&t.addExtUnpacker(25,u(Uint8ClampedArray)),t.addExtUnpacker(26,l),t.addExtUnpacker(29,[l,u(DataView)])),i.hasBuffer&&t.addExtUnpacker(27,u(o))};var n,i=r(895),o=i.global,a={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function s(t){return n||(n=r(299).decode),n(t)}function f(t){return RegExp.apply(null,t)}function c(t){return function(e){var r=new t;for(var n in a)r[n]=e[n];return r}}function u(t){return function(e){return new t(e)}}function l(t){return new Uint8Array(t).buffer}},832:(t,e,r)=>{r(350),r(312),e.createCodec=r(877).createCodec},822:(t,e,r)=>{e.k=o,e.I=a;var n=r(895),i="BUFFER_SHORTAGE";function o(){if(!(this instanceof o))return new o}function a(){if(!(this instanceof a))return new a}function s(){return this.buffers&&this.buffers.length?(this.flush(),this.pull()):this.fetch()}function f(t){(this.buffers||(this.buffers=[])).push(t)}function c(t){return function(e){for(var r in t)e[r]=t[r];return e}}o.mixin=c({bufferish:n,write:function(t){var e=this.offset?n.prototype.slice.call(this.buffer,this.offset):this.buffer;this.buffer=e?t?this.bufferish.concat([e,t]):e:t,this.offset=0},fetch:function(){throw new Error("method not implemented: fetch()")},flush:function(){for(;this.offset<this.buffer.length;){var t,e=this.offset;try{t=this.fetch()}catch(t){if(t&&t.message!=i)throw t;this.offset=e;break}this.push(t)}},push:f,pull:function(){return(this.buffers||(this.buffers=[])).shift()},read:s,reserve:function(t){var e=this.offset,r=e+t;if(r>this.buffer.length)throw new Error(i);return this.offset=r,e},offset:0}),o.mixin(o.prototype),a.mixin=c({bufferish:n,write:function(){throw new Error("method not implemented: write()")},fetch:function(){var t=this.start;if(t<this.offset){var e=this.start=this.offset;return n.prototype.slice.call(this.buffer,t,e)}},flush:function(){for(;this.start<this.offset;){var t=this.fetch();t&&this.push(t)}},push:f,pull:function(){var t=this.buffers||(this.buffers=[]),e=t.length>1?this.bufferish.concat(t):t[0];return t.length=0,e},read:s,reserve:function(t){var e=0|t;if(this.buffer){var r=this.buffer.length,n=0|this.offset,i=n+e;if(i<r)return this.offset=i,n;this.flush(),t=Math.max(t,Math.min(2*r,this.maxBufferSize))}return t=Math.max(t,this.minBufferSize),this.buffer=this.bufferish.alloc(t),this.start=0,this.offset=e,0},send:function(t){var e=t.length;if(e>this.minBufferSize)this.flush(),this.push(t);else{var r=this.reserve(e);n.prototype.copy.call(t,this.buffer,r)}},maxBufferSize:65536,minBufferSize:2048,offset:0,start:0}),a.mixin(a.prototype)},350:(t,e,r)=>{var n=r(83).S,i=r(600),o=r(76).readUint8,a=r(738),s=r(877);function f(){var t=this.options;return this.decode=function(t){var e=a.getReadToken(t);return function(t){var r=o(t),n=e[r];if(!n)throw new Error("Invalid type: "+(r?"0x"+r.toString(16):r));return n(t)}}(t),t&&t.preset&&i.setExtUnpackers(this),this}s.install({addExtUnpacker:function(t,e){(this.extUnpackers||(this.extUnpackers=[]))[t]=s.filter(e)},getExtUnpacker:function(t){return(this.extUnpackers||(this.extUnpackers=[]))[t]||function(e){return new n(e,t)}},init:f}),e.preset=f.call(s.preset)},76:(t,e,r)=>{var n=r(241),i=r(166),o=i.Uint64BE,a=i.Int64BE;e.getReadFormat=function(t){var e=s.hasArrayBuffer&&t&&t.binarraybuffer,r=t&&t.int64;return{map:c&&t&&t.usemap?l:u,array:h,str:d,bin:e?y:p,ext:v,uint8:x,uint16:g,uint32:m,uint64:k(8,r?B:A),int8:w,int16:b,int32:E,int64:k(8,r?S:U),float32:k(4,M),float64:k(8,P)}},e.readUint8=x;var s=r(895),f=r(190),c="undefined"!=typeof Map;function u(t,e){var r,n={},i=new Array(e),o=new Array(e),a=t.codec.decode;for(r=0;r<e;r++)i[r]=a(t),o[r]=a(t);for(r=0;r<e;r++)n[i[r]]=o[r];return n}function l(t,e){var r,n=new Map,i=new Array(e),o=new Array(e),a=t.codec.decode;for(r=0;r<e;r++)i[r]=a(t),o[r]=a(t);for(r=0;r<e;r++)n.set(i[r],o[r]);return n}function h(t,e){for(var r=new Array(e),n=t.codec.decode,i=0;i<e;i++)r[i]=n(t);return r}function d(t,e){var r=t.reserve(e),n=r+e;return f.toString.call(t.buffer,"utf-8",r,n)}function p(t,e){var r=t.reserve(e),n=r+e,i=f.slice.call(t.buffer,r,n);return s.from(i)}function y(t,e){var r=t.reserve(e),n=r+e,i=f.slice.call(t.buffer,r,n);return s.Uint8Array.from(i).buffer}function v(t,e){var r=t.reserve(e+1),n=t.buffer[r++],i=r+e,o=t.codec.getExtUnpacker(n);if(!o)throw new Error("Invalid ext type: "+(n?"0x"+n.toString(16):n));return o(f.slice.call(t.buffer,r,i))}function x(t){var e=t.reserve(1);return t.buffer[e]}function w(t){var e=t.reserve(1),r=t.buffer[e];return 128&r?r-256:r}function g(t){var e=t.reserve(2),r=t.buffer;return r[e++]<<8|r[e]}function b(t){var e=t.reserve(2),r=t.buffer,n=r[e++]<<8|r[e];return 32768&n?n-65536:n}function m(t){var e=t.reserve(4),r=t.buffer;return 16777216*r[e++]+(r[e++]<<16)+(r[e++]<<8)+r[e]}function E(t){var e=t.reserve(4),r=t.buffer;return r[e++]<<24|r[e++]<<16|r[e++]<<8|r[e]}function k(t,e){return function(r){var n=r.reserve(t);return e.call(r.buffer,n,!0)}}function A(t){return new o(this,t).toNumber()}function U(t){return new a(this,t).toNumber()}function B(t){return new o(this,t)}function S(t){return new a(this,t)}function M(t){return n.read(this,t,!1,23,4)}function P(t){return n.read(this,t,!1,52,8)}},738:(t,e,r)=>{var n=r(76);function i(t){var e,r=new Array(256);for(e=0;e<=127;e++)r[e]=o(e);for(e=128;e<=143;e++)r[e]=s(e-128,t.map);for(e=144;e<=159;e++)r[e]=s(e-144,t.array);for(e=160;e<=191;e++)r[e]=s(e-160,t.str);for(r[192]=o(null),r[193]=null,r[194]=o(!1),r[195]=o(!0),r[196]=a(t.uint8,t.bin),r[197]=a(t.uint16,t.bin),r[198]=a(t.uint32,t.bin),r[199]=a(t.uint8,t.ext),r[200]=a(t.uint16,t.ext),r[201]=a(t.uint32,t.ext),r[202]=t.float32,r[203]=t.float64,r[204]=t.uint8,r[205]=t.uint16,r[206]=t.uint32,r[207]=t.uint64,r[208]=t.int8,r[209]=t.int16,r[210]=t.int32,r[211]=t.int64,r[212]=s(1,t.ext),r[213]=s(2,t.ext),r[214]=s(4,t.ext),r[215]=s(8,t.ext),r[216]=s(16,t.ext),r[217]=a(t.uint8,t.str),r[218]=a(t.uint16,t.str),r[219]=a(t.uint32,t.str),r[220]=a(t.uint16,t.array),r[221]=a(t.uint32,t.array),r[222]=a(t.uint16,t.map),r[223]=a(t.uint32,t.map),e=224;e<=255;e++)r[e]=o(e-256);return r}function o(t){return function(){return t}}function a(t,e){return function(r){var n=t(r);return e(r,n)}}function s(t,e){return function(r){return e(r,t)}}e.getReadToken=function(t){var e=n.getReadFormat(t);return t&&t.useraw?function(t){var e,r=i(t).slice();for(r[217]=r[196],r[218]=r[197],r[219]=r[198],e=160;e<=191;e++)r[e]=s(e-160,t.bin);return r}(e):i(e)}},312:(t,e,r)=>{var n=r(83).S,i=r(431),o=r(943),a=r(877);function s(){var t=this.options;return this.encode=function(t){var e=o.getWriteType(t);return function(t,r){var n=e[typeof r];if(!n)throw new Error('Unsupported type "'+typeof r+'": '+r);n(t,r)}}(t),t&&t.preset&&i.setExtPackers(this),this}a.install({addExtPacker:function(t,e,r){r=a.filter(r);var i=e.name;function o(e){return r&&(e=r(e)),new n(e,t)}i&&"Object"!==i?(this.extPackers||(this.extPackers={}))[i]=o:(this.extEncoderList||(this.extEncoderList=[])).unshift([e,o])},getExtPacker:function(t){var e=this.extPackers||(this.extPackers={}),r=t.constructor,n=r&&r.name&&e[r.name];if(n)return n;for(var i=this.extEncoderList||(this.extEncoderList=[]),o=i.length,a=0;a<o;a++){var s=i[a];if(r===s[0])return s[1]}},init:s}),e.preset=s.call(a.preset)},598:(t,e,r)=>{var n=r(241),i=r(166),o=i.Uint64BE,a=i.Int64BE,s=r(370).w,f=r(895),c=f.global,u=f.hasBuffer&&"TYPED_ARRAY_SUPPORT"in c&&!c.TYPED_ARRAY_SUPPORT,l=f.hasBuffer&&c.prototype||{};function h(){var t=s.slice();return t[196]=d(196),t[197]=p(197),t[198]=y(198),t[199]=d(199),t[200]=p(200),t[201]=y(201),t[202]=v(202,4,l.writeFloatBE||g,!0),t[203]=v(203,8,l.writeDoubleBE||b,!0),t[204]=d(204),t[205]=p(205),t[206]=y(206),t[207]=v(207,8,x),t[208]=d(208),t[209]=p(209),t[210]=y(210),t[211]=v(211,8,w),t[217]=d(217),t[218]=p(218),t[219]=y(219),t[220]=p(220),t[221]=y(221),t[222]=p(222),t[223]=y(223),t}function d(t){return function(e,r){var n=e.reserve(2),i=e.buffer;i[n++]=t,i[n]=r}}function p(t){return function(e,r){var n=e.reserve(3),i=e.buffer;i[n++]=t,i[n++]=r>>>8,i[n]=r}}function y(t){return function(e,r){var n=e.reserve(5),i=e.buffer;i[n++]=t,i[n++]=r>>>24,i[n++]=r>>>16,i[n++]=r>>>8,i[n]=r}}function v(t,e,r,n){return function(i,o){var a=i.reserve(e+1);i.buffer[a++]=t,r.call(i.buffer,o,a,n)}}function x(t,e){new o(this,e,t)}function w(t,e){new a(this,e,t)}function g(t,e){n.write(this,t,e,!1,23,4)}function b(t,e){n.write(this,t,e,!1,52,8)}e.getWriteToken=function(t){return t&&t.uint8array?((e=h())[202]=v(202,4,g),e[203]=v(203,8,b),e):u||f.hasBuffer&&t&&t.safe?function(){var t=s.slice();return t[196]=v(196,1,c.prototype.writeUInt8),t[197]=v(197,2,c.prototype.writeUInt16BE),t[198]=v(198,4,c.prototype.writeUInt32BE),t[199]=v(199,1,c.prototype.writeUInt8),t[200]=v(200,2,c.prototype.writeUInt16BE),t[201]=v(201,4,c.prototype.writeUInt32BE),t[202]=v(202,4,c.prototype.writeFloatBE),t[203]=v(203,8,c.prototype.writeDoubleBE),t[204]=v(204,1,c.prototype.writeUInt8),t[205]=v(205,2,c.prototype.writeUInt16BE),t[206]=v(206,4,c.prototype.writeUInt32BE),t[207]=v(207,8,x),t[208]=v(208,1,c.prototype.writeInt8),t[209]=v(209,2,c.prototype.writeInt16BE),t[210]=v(210,4,c.prototype.writeInt32BE),t[211]=v(211,8,w),t[217]=v(217,1,c.prototype.writeUInt8),t[218]=v(218,2,c.prototype.writeUInt16BE),t[219]=v(219,4,c.prototype.writeUInt32BE),t[220]=v(220,2,c.prototype.writeUInt16BE),t[221]=v(221,4,c.prototype.writeUInt32BE),t[222]=v(222,2,c.prototype.writeUInt16BE),t[223]=v(223,4,c.prototype.writeUInt32BE),t}():h();var e}},943:(t,e,r)=>{var n=r(826),i=r(166),o=i.Uint64BE,a=i.Int64BE,s=r(895),f=r(190),c=r(598),u=r(370).w,l=r(83).S,h="undefined"!=typeof Uint8Array,d="undefined"!=typeof Map,p=[];p[1]=212,p[2]=213,p[4]=214,p[8]=215,p[16]=216,e.getWriteType=function(t){var e,r=c.getWriteToken(t),i=t&&t.useraw,y=h&&t&&t.binarraybuffer,v=y?s.isArrayBuffer:s.isBuffer,x=y?function(t,e){m(t,new Uint8Array(e))}:m,w=d&&t&&t.usemap?function(t,e){if(!(e instanceof Map))return E(t,e);var n=e.size;r[n<16?128+n:n<=65535?222:223](t,n);var i=t.codec.encode;e.forEach((function(e,r,n){i(t,r),i(t,e)}))}:E;return{boolean:function(t,e){r[e?195:194](t,e)},function:b,number:function(t,e){var n=0|e;e===n?r[-32<=n&&n<=127?255&n:0<=n?n<=255?204:n<=65535?205:206:-128<=n?208:-32768<=n?209:210](t,n):r[203](t,e)},object:i?function(t,e){if(v(e))return function(t,e){var n=e.length;r[n<32?160+n:n<=65535?218:219](t,n),t.send(e)}(t,e);g(t,e)}:g,string:(e=i?function(t){return t<32?1:t<=65535?3:5}:function(t){return t<32?1:t<=255?2:t<=65535?3:5},function(t,n){var i=n.length,o=5+3*i;t.offset=t.reserve(o);var a=t.buffer,s=e(i),c=t.offset+s;i=f.write.call(a,n,c);var u=e(i);if(s!==u){var l=c+u-s,h=c+i;f.copy.call(a,a,l,c,h)}r[1===u?160+i:u<=3?215+u:219](t,i),t.offset+=i}),symbol:b,undefined:b};function g(t,e){if(null===e)return b(t,e);if(v(e))return x(t,e);if(n(e))return function(t,e){var n=e.length;r[n<16?144+n:n<=65535?220:221](t,n);for(var i=t.codec.encode,o=0;o<n;o++)i(t,e[o])}(t,e);if(o.isUint64BE(e))return function(t,e){r[207](t,e.toArray())}(t,e);if(a.isInt64BE(e))return function(t,e){r[211](t,e.toArray())}(t,e);var i=t.codec.getExtPacker(e);if(i&&(e=i(e)),e instanceof l)return function(t,e){var n=e.buffer,i=n.length,o=p[i]||(i<255?199:i<=65535?200:201);r[o](t,i),u[e.type](t),t.send(n)}(t,e);w(t,e)}function b(t,e){r[192](t,e)}function m(t,e){var n=e.length;r[n<255?196:n<=65535?197:198](t,n),t.send(e)}function E(t,e){var n=Object.keys(e),i=n.length;r[i<16?128+i:i<=65535?222:223](t,i);var o=t.codec.encode;n.forEach((function(r){o(t,r),o(t,e[r])}))}}},370:(t,e)=>{for(var r=e.w=new Array(256),n=0;n<=255;n++)r[n]=i(n);function i(t){return function(e){var r=e.reserve(1);e.buffer[r]=t}}},531:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>a});var n=r(379),i=r.n(n),o=r(660);i()(o.Z,{insert:"head",singleton:!1});const a=o.Z.locals||{}},379:(t,e,r)=>{"use strict";var n,i=function(){var t={};return function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}t[e]=r}return t[e]}}(),o=[];function a(t){for(var e=-1,r=0;r<o.length;r++)if(o[r].identifier===t){e=r;break}return e}function s(t,e){for(var r={},n=[],i=0;i<t.length;i++){var s=t[i],f=e.base?s[0]+e.base:s[0],c=r[f]||0,u="".concat(f," ").concat(c);r[f]=c+1;var l=a(u),h={css:s[1],media:s[2],sourceMap:s[3]};-1!==l?(o[l].references++,o[l].updater(h)):o.push({identifier:u,updater:y(h,e),references:1}),n.push(u)}return n}function f(t){var e=document.createElement("style"),n=t.attributes||{};if(void 0===n.nonce){var o=r.nc;o&&(n.nonce=o)}if(Object.keys(n).forEach((function(t){e.setAttribute(t,n[t])})),"function"==typeof t.insert)t.insert(e);else{var a=i(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var c,u=(c=[],function(t,e){return c[t]=e,c.filter(Boolean).join("\n")});function l(t,e,r,n){var i=r?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(t.styleSheet)t.styleSheet.cssText=u(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function h(t,e,r){var n=r.css,i=r.media,o=r.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var d=null,p=0;function y(t,e){var r,n,i;if(e.singleton){var o=p++;r=d||(d=f(e)),n=l.bind(null,r,o,!1),i=l.bind(null,r,o,!0)}else r=f(e),n=h.bind(null,r,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(r)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n));var r=s(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var n=0;n<r.length;n++){var i=a(r[n]);o[i].references--}for(var f=s(t,e),c=0;c<r.length;c++){var u=a(r[c]);0===o[u].references&&(o[u].updater(),o.splice(u,1))}r=f}}}},343:t=>{"use strict";const e={lavaColor:"l",selfId:"s",newData:"n",initPack:"e",removePack:"r",arena:"a",id:"z",pos:"p",lastProcessedTick:"d",chatTime:"v",chatMsg:"k",radius:"m",maxSpd:"o",inputs:"u",type:"t",value:"q"};t.exports={encode:function(t){for(const r of Object.keys(e))if(r===t)return e[r]},decode:function(t){for(const r of Object.keys(e))if(e[r]===t)return r}}},805:t=>{"use strict";t.exports={simulatePlayer:function(t,e){const r=t.players,n=r[t.id];e.up&&e.down?n.vel.y=0:e.up?n.vel.y=-n.maxSpd:e.down?n.vel.y=n.maxSpd:n.vel.y=0,e.left&&e.right?n.vel.x=0:e.left?n.vel.x=-n.maxSpd:e.right?n.vel.x=n.maxSpd:n.vel.x=0,n.pos.x+=n.vel.x,n.pos.y+=n.vel.y,n.pos.x-n.radius<0&&(n.pos.x=n.radius),n.pos.x+n.radius>t.arena.x&&(n.pos.x=t.arena.x-n.radius),n.pos.y-n.radius<0&&(n.pos.y=n.radius),n.pos.y+n.radius>t.arena.y&&(n.pos.y=t.arena.y-n.radius);const i=Object.entries({...r});for(let t=0;t<i.length;t++)for(let e=t+1;e<i.length;e++){const n=r[i[t][0]],o=r[i[e][0]];if(Math.sqrt(Math.abs(Math.pow(o.pos.x-n.pos.x,2)+Math.pow(o.pos.y-n.pos.y,2)))<60){const t=Math.sqrt(Math.abs(Math.pow(o.pos.x-n.pos.x,2)+Math.pow(o.pos.y-n.pos.y,2))),e=Math.atan2(o.pos.y-n.pos.y,o.pos.x-n.pos.x);o.pos.x+=1*Math.cos(e)/t*500,n.pos.x-=1*Math.cos(e)/t*500,o.pos.y+=1*Math.sin(e)/t*500,n.pos.y-=1*Math.sin(e)/t*500}}n.pos.x=Math.round(n.pos.x),n.pos.y=Math.round(n.pos.y)}}}},e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={id:n,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{"use strict";r(531);const t=r(374),e=r(389),{encode:n}=r(343),{simulatePlayer:i}=r(805);let o=new WebSocket(location.origin.replace(/^http/,"ws"));o.binaryType="arraybuffer",o.onclose=function(){I=!1,function(){let t=0;const e=setInterval((()=>{t++,o=new WebSocket(location.origin.replace(/^http/,"ws")),o.binaryType="arraybuffer",console.log("attempting to reconnect"),o.onopen=function(){console.log("reconnected"),C(),clearInterval(e)},t>4&&clearInterval(e)}),5e3)}()};const a=document.getElementById("game"),s=document.getElementById("canvas"),f=s.getContext("2d");f.font="100px Arial",f.textAlign="center",f.fillStyle="white",f.fillText("Connecting...",window.innerWidth/2,window.innerHeight/2+100);const c=document.getElementById("chatBox"),u=document.getElementById("chatHolder");let l=null,h=null;f.textAlign="center",f.font="20px Verdana, Geneva, sans-serif";let d=!1,p=!1,y=!1,v=107,x=0,w=0,g=0,b=!1,m=Object.create(null);const E=Date.now();let k=0;const A="#242424",U={x:0,y:0};let B={left:!1,right:!1,up:!1,down:!1};const S=[],M=[];let P=[],I=!1,T=e(s);function C(){let t=0;function e(){if(t++,console.log("attempting to join"),I||t>5){if(!(t>5))return clearInterval(r),void console.log("successfully joined");{const e=prompt("Do you want to try to connect again?").trim().toLowerCase();if(!I){if("y"!==e)return void alert("You have lost connection to the game server. Try refreshing or checking your internet connection.");t=0}}}const e=Object.create(null);e[n("type")]="join",o.send(JSON.stringify(e))}e();const r=setInterval(e,2e3)}function R(t,e){const r=n("lastProcessedTick"),o=n("pos");for(let e=M.length-1;e>=0;e--)M[e].tick<t[r]&&M.splice(e,1);const a=m[h].pos;m=M.find((e=>e.tick===t[r])).state.players,m[h].pos=t[o];let s=0;for(;s<S.length;){const e=S[s];e.tick<=t[r]?S.splice(s,1):(i({players:m,id:h,arena:l},e.input),s++)}m[h].pos.x=D(a.x,m[h].pos.x,.3),m[h].pos.y=D(a.y,m[h].pos.y,.3)}function N(t){if(!h||!m[h])return;const e=[[87,38],[83,40],[65,37],[68,39]].findIndex((e=>e.includes(t.keyCode))),r="keydown"===t.type;0===e&&(B.up=r),1===e&&(B.down=r),2===e&&(B.left=r),3===e&&(B.right=r),13===t.keyCode&&(p=r),!1!==r||84!==t.keyCode||y||(b=!b)}function O(t){f.fillStyle=A,f.beginPath(),f.arc(Math.round(55+t.x/l.x*195),Math.round(655+t.y/l.y*195),4,0,2*Math.PI),f.fill()}window.addEventListener("resize",(()=>T=e(s))),window.requestAnimationFrame((function t(){const e=(Date.now()-j)/1e3;j=Date.now(),function(){for(const t of P){const e=n("selfId");t[e]&&(h=t[e],I=!0);const r=n("arena");t[r]&&(l=t[r],I=!0);const i=n("lavaColor");t[i]&&(v+=t[i]);const o=n("initPack");if(t[o]){for(const e of t[o])new L(e);I=!0}if(h&&m[h]){const e=n("newData");if(t[e]){const r=n("id"),i=n("pos"),o=n("lastProcessedTick"),a=n("chatTime"),s=n("chatMsg"),f=n("maxSpd");for(const n of t[e]){const t=m[n[r]];t&&(void 0!==n[i]&&(n[o]&&h&&l&&m[h]&&n[r]===h&&R(n),t.lastState=t.serverState,t.serverState.pos=n[i],t.serverState.time=Date.now()),void 0!==n[a]&&(t.chatTime=n[a]),void 0!==n[s]&&(t.chatMsg=n[s]),void 0!==n[f]&&(t.maxSpd=n[f]))}}}const a=n("removePack");if(t[a])for(const e of t[a])delete m[e]}P=[]}(),function(t){if(!h||!m[h])return;const e=Math.ceil(.06*(Date.now()-E));(y||e-w>5)&&(B={left:!1,right:!1,up:!1,down:!1});const r=[];for(;w<e;)r.push({input:B,tick:w}),M.push({tick:w,state:{players:m,arena:l}}),i({players:m,id:h,arena:l},B),S.push({input:B,tick:w}),w++,g++;if(r.length>0){const t=Object.create(null);t[n("inputs")]=r,o.send(JSON.stringify(t))}for(const e in m)m[e].update(t)}(e),function(){if(h&&m[h]){(function(){if(p&&!d&&(y=!y,d=!0),p||(d=!1),y)u.style.display="block",c.focus(),c.setAttribute("maxlength",45);else{if(""!==c.value&&"/"!==c.value){const t=Object.create(null);t[n("value")]=c.value,t[n("type")]="chat",o.send(JSON.stringify(t))}u.style.display="none",c.value="",c.setAttribute("maxlength",45)}})(),function(){f.fillStyle="rgb(40,40,40)",f.fillRect(0,0,s.width,s.height);const t=Math.round(s.width/2-m[h].x),e=Math.round(s.height/2-m[h].y);f.fillStyle="rgb(210,210,210)",f.roundRect(t,e,l.x,l.y,10)}(),function(){const[t,e]=[Math.round(l.x/2-200-m[h].x+s.width/2),Math.round(l.y/2-200-m[h].y+s.height/2)];f.fillStyle=`rgb(${v},124,37)`,f.fillRect(t,e,400,400)}(),f.fillStyle="rgb(60, 60, 60, 0.8)",f.roundRect(50,650,200,200,10);for(const t in m){const e=m[t];O(e),e.draw()}f.fillStyle="black",f.font="30px Arial",f.fillText(`${k} kbps`,1500,800)}}(),requestAnimationFrame(t)})),o.onopen=()=>{C(),window.addEventListener("keydown",N),window.addEventListener("keyup",N),document.getElementById("loading").style.display="none",s.addEventListener("mousemove",(t=>{const e=s.getBoundingClientRect();U.x=Math.round((t.pageX-e.left)/T),U.y=Math.round((t.pageY-e.top)/T)})),a.style.backgroundColor="black"},setInterval((()=>{k=x/1e3,x=0,console.log(g,"updates per second"),g=0}),1e3),console.log("correction... 65"),o.addEventListener("message",(e=>{const r=t.decode(new Uint8Array(e.data));x+=e.data.byteLength,P.push(r)}));let j=Date.now();function D(t,e,r){return(1-r)*t+r*e}CanvasRenderingContext2D.prototype.roundRect=function(t,e,r,n,i){const o=t+r,a=e+n;this.beginPath(),this.moveTo(t+i,e),this.lineTo(o-i,e),this.quadraticCurveTo(o,e,o,e+i),this.lineTo(o,e+n-i),this.quadraticCurveTo(o,a,o-i,a),this.lineTo(t+i,a),this.quadraticCurveTo(t,a,t,a-i),this.lineTo(t,e+i),this.quadraticCurveTo(t,e,t+i,e),this.fill()};class L{constructor(t){const e=n("id"),r=n("pos"),i=n("chatTime"),o=n("chatMsg"),a=n("maxSpd"),s=n("radius");this.pos=t[r],this.radius=t[s],this.id=t[e],this.chatTime=t[i],this.chatMsg=t[o],this.vel={x:0,y:0},this.maxSpd=t[a],this.interpBuffer=[],this.serverState={time:Date.now(),pos:this.pos},this.lastState={time:Date.now(),pos:this.pos},this.correctPosition={pos:this.pos},this.x=this.pos.x,this.y=this.pos.y,m[this.id]=this}update(t){if(this.id!==h){const e=20*t;if(t>=.05)return this.x=this.serverState.pos.x,this.y=this.serverState.pos.y,void(this.lastState.pos=this.serverState.pos);this.pos.x=D(this.pos.x,this.serverState.pos.x,e),this.pos.y=D(this.pos.y,this.serverState.pos.y,e),this.x=D(this.x,this.pos.x,e),this.y=D(this.y,this.pos.y,e),i({players:m,id:this.id,arena:l},{up:!1,down:!1,right:!1,left:!1})}else{const e=20*t;if(t>=.05)return this.x=this.pos.x,void(this.y=this.pos.y);this.x=D(this.x,this.pos.x,e),this.y=D(this.y,this.pos.y,e)}}draw(){const[t,e]=[Math.round(this.x-m[h].x+s.width/2),Math.round(this.y-m[h].y+s.height/2)];if(f.fillStyle=A,f.beginPath(),f.arc(t,e,this.radius,0,2*Math.PI),f.fill(),b&&this.id===h){f.fillStyle="blue",f.beginPath();const[t,e]=[Math.round(this.lastState.pos.x-m[h].x+s.width/2),Math.round(this.lastState.pos.y-m[h].y+s.height/2)];f.arc(t,e,this.radius,0,2*Math.PI),f.fill()}if(b){f.fillStyle="red",f.beginPath();const[t,e]=[Math.round(this.correctPosition.pos.x-m[h].x+s.width/2),Math.round(this.correctPosition.pos.y-m[h].y+s.height/2)];f.arc(t,e,this.radius,0,2*Math.PI),f.fill()}if(this.chatTime>=0){f.font="20px Verdana, Geneva, sans-serif",f.fillStyle=`rgb(50, 50, 50, ${this.chatTime/3})`;const r=f.measureText(this.chatMsg).width;f.fillRect(Math.round(t-r/2-3),Math.round(e-67),Math.round(2*r/2+6),30),f.fillStyle=`rgb(200, 200, 200, ${this.chatTime/3})`,f.fillText(this.chatMsg,t,Math.round(e-this.radius-15))}}}})()})();