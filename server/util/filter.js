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
         'ass',
         'moan',
         'fap',
         'dumb',
         'idiot',
         'noob',
         'suck',
      ];
      for (const bad of badWords) {
         message = message.replace(new RegExp(`${bad}`, 'gi'), 'BONK');
      }
      return message;
   },
};
