'use strict';

module.exports = class Client {
   constructor() {
      this.ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
      this.ws.binaryType = 'arraybuffer';
   }
};
