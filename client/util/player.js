'use strict';
const { PLAYER_COLOR } = require('./constants');
const { encode } = require('../.././shared/name');
const { simulatePlayer } = require('../.././shared/simulate');

module.exports = class Player {
   constructor(initPack, isSelf = false) {
      const idEncoded = encode('id');
      const posEncoded = encode('pos');
      const chatTimeEncoded = encode('chatTime');
      const chatMsgEncoded = encode('chatMsg');
      const maxSpdEncoded = encode('maxSpd');
      const radiusEncoded = encode('radius');
      this.pos = initPack[posEncoded];
      this.radius = initPack[radiusEncoded];
      this.id = initPack[idEncoded];
      this.chatTime = initPack[chatTimeEncoded];
      this.chatMsg = initPack[chatMsgEncoded];
      this.vel = { x: 0, y: 0 };
      this.maxSpd = initPack[maxSpdEncoded];
      this.serverState = { time: Date.now(), pos: this.pos };
      this.lastState = { time: Date.now(), pos: this.pos };
      this.correctPosition = { pos: this.pos };
      this.isSelf = isSelf;
      this.x = this.pos.x;
      this.y = this.pos.y;
      console.log('new player, x and y is', this.x, this.y);
   }
   lerp(a, b, t) {
      return (1 - t) * a + t * b;
   }
   update({ delta, players, arena }) {
      //  if (!this.isSelf) {
      const time = delta * 20;
      if (delta >= 1 / 20) {
         this.x = this.serverState.pos.x;
         this.y = this.serverState.pos.y;
         this.lastState.pos = this.serverState.pos;
         return;
      }
      this.pos.x = this.lerp(this.pos.x, this.serverState.pos.x, time);
      this.pos.y = this.lerp(this.pos.y, this.serverState.pos.y, time);
      this.x = this.lerp(this.x, this.pos.x, time);
      this.y = this.lerp(this.y, this.pos.y, time);
      simulatePlayer({ players, id: this.id, arena }, { up: false, down: false, right: false, left: false });
      //  } else {
      /* const time = delta * 20;
         if (delta >= 1 / 20) {
            this.x = this.pos.x;
            this.y = this.pos.y;
            return;
         }
         this.x = this.lerp(this.x, this.pos.x, time);
         this.y = this.lerp(this.y, this.pos.y, time);*/
      //   }
   }
   draw({ ctx, canvas, debugMode, center }) {
      const [x, y] = [
         Math.round(this.x - center.x + canvas.width / 2),
         Math.round(this.y - center.y + canvas.height / 2),
      ];
      ctx.fillStyle = PLAYER_COLOR;
      ctx.beginPath();
      ctx.arc(x, y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      if (debugMode && this.isSelf) {
         ctx.fillStyle = 'blue';
         ctx.beginPath();
         const [serverX, serverY] = [
            Math.round(this.serverState.pos.x - center.x + canvas.width / 2),
            Math.round(this.serverState.pos.y - center.y + canvas.height / 2),
         ];
         ctx.arc(serverX, serverY, this.radius, 0, Math.PI * 2);
         ctx.fill();
      }
      if (debugMode && !this.isSelf) {
         ctx.fillStyle = 'red';
         ctx.beginPath();
         const [correctX, correctY] = [
            Math.round(this.correctPosition.pos.x - center.x + canvas.width / 2),
            Math.round(this.correctPosition.pos.y - center.y + canvas.height / 2),
         ];
         ctx.arc(correctX, correctY, this.radius, 0, Math.PI * 2);
         ctx.fill();
      }
      if (this.chatTime >= 0) {
         ctx.font = '20px Verdana, Geneva, sans-serif';
         ctx.fillStyle = `rgb(50, 50, 50, ${this.chatTime / 3})`;
         const width = ctx.measureText(this.chatMsg).width;
         ctx.fillRect(Math.round(x - width / 2 - 3), Math.round(y - 67), Math.round((width * 2) / 2 + 6), 30);
         ctx.fillStyle = `rgb(200, 200, 200, ${this.chatTime / 3})`;
         ctx.fillText(this.chatMsg, x, Math.round(y - this.radius - 15));
      }
   }
};
