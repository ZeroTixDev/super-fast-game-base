'use strict';
const pairs = {
   lavaColor: 'l',
   selfId: 's',
   newData: 'n',
   initPack: 'e',
   removePack: 'r',
   arena: 'a',
   id: 'z',
   pos: 'p',
   lastProcessedTick: 'd',
   chatTime: 'v',
   chatMsg: 'k',
};
module.exports = {
   encode: function (name) {
      for (const key of Object.keys(pairs)) {
         if (key === name) return pairs[key];
      }
   },
   decode: function (name) {
      for (const key of Object.keys(pairs)) {
         if (pairs[key] === name) return key;
      }
   },
};
