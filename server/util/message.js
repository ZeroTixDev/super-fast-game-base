'use strict';

module.exports = {
   validateMessage: function (data, info) {
      if (data.type === 'join') {
         if (info.joined) return false;
      }
      if (data.type === 'input') {
         if (!info.joined) return false;
         if (data.tick > info.tick) return false;
      }
      if (data.type === 'chat') {
         if (!info.joined) return false;
         if (data.value.length > 1000) return false;
      }
      return true;
   },
};
