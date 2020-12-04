'use strict';

const uuid = require('node-uuid');
module.exports = {
   getId: function (players, idLength = 3) {
      let id = uuid.v4().slice(0, idLength);
      let done = false;
      while (!done) {
         let hasId = false;
         for (const i of Object.keys(players)) {
            if (i === id) hasId = true;
         }
         done = !hasId;
         if (!done) id = uuid.v4().slice(0, idLength);
      }
      return id;
   },
};
