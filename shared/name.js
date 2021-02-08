'use strict';
const pairs = {
   lava: 'l',
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
   radius: 'm',
   maxSpd: 'o',
   inputs: 'u',
   type: 't',
   value: 'q',
   mouse: '1',
   mousedown: '2',
   mouseMode: '3',
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
