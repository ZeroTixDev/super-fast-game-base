'use strict';

module.exports = {
   filterMessage: function (message) {
      const badWords = [
         'fuck',
         'shit',
         'bitch',
         'dick',
         'cum',
         'semen',
         'cunt',
         'whore',
         'pussy',
         'moan',
         'fap',
         'sucks',
      ];
      let newMessage = message.toString();
      const msg = newMessage.trim().toLowerCase();
      for (const bad of badWords) {
         if (msg.includes(bad)) {
            newMessage = 'BONK';
         }
      }
      return newMessage;
   },
};
