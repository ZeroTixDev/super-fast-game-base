'use strict';

const Lava = require('../.././shared/lava');
const resize = require('./util/resize');
const msgpack = require('msgpack-lite');
const { encode } = require('../.././shared/name');

module.exports = class Client {
   constructor() {
      this.ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
      this.ws.binaryType = 'arraybuffer';
      this.players = Object.create(null);
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      this.chatBox = document.getElementById('chatBox');
      this.chatHolder = document.getElementById('chatHolder');
      this.start = Date.now();
      this.key = { left: false, right: false, up: false, down: false };
      this.lava = new Lava();
      this.pendingInputs = [];
      this.history = [];
      this.pendingMessages = [];
      this.isJoined = false;
      this.logData = false;
      this.chatLock = false;
      this.enterPressed = false;
      this.isChatting = false;
      this.debugMode = false;
      this.arena = null;
      this.selfId = null;
      this.bytes = 0;
      this.tick = 0;
      this.updates = 0;
   }
   drawMap() {
      this.ctx.fillStyle = 'rgb(40,40,40)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      const x = Math.round(this.canvas.width / 2 - this.players[this.selfId].x);
      const y = Math.round(this.canvas.height / 2 - this.players[this.selfId].y);
      this.ctx.fillStyle = 'rgb(210,210,210)';
      this.ctx.roundRect(x, y, this.arena.x, this.arena.y, 10);
   }
   drawChat() {
      if (this.enterPressed && !this.chatlock) {
         this.isChatting = !this.isChatting;
         this.chatlock = true;
      }
      if (!this.enterPressed) {
         this.chatlock = false;
      }
      if (this.isChatting) {
         this.chatHolder.style.display = 'block';
         this.chatBox.focus();
      } else {
         if (this.chatBox.value !== '') {
            if (this.chatBox.value.trim().toLowerCase().slice(0, 5) === '/tlog') {
               this.logData = !this.logData;
            } else {
               const payload = Object.create(null);
               payload[encode('value')] = this.chatBox.value;
               payload[encode('type')] = 'chat';
               this.ws.send(JSON.stringify(payload));
            }
         }
         this.chatHolder.style.display = 'none';
         this.chatBox.value = '';
      }
   }
   renderLava() {
      const [x, y] = [
         Math.round(this.arena.x / 2 - 200 - this.players[this.selfId].x + this.canvas.width / 2),
         Math.round(this.arena.y / 2 - 200 - this.players[this.selfId].y + this.canvas.height / 2),
      ];
      this.ctx.fillStyle = `rgb(${this.lava.color},124,37)`;
      this.ctx.fillRect(x, y, 400, 400);
   }
   trackKeys(event) {
      if (!this.selfId || !this.players[this.selfId]) return;
      const index = [
         [87, 38],
         [83, 40],
         [65, 37],
         [68, 39],
      ].findIndex((e) => e.includes(event.keyCode));
      const bool = event.type === 'keydown';
      if (index === 0) this.key.up = bool;
      if (index === 1) this.key.down = bool;
      if (index === 2) this.key.left = bool;
      if (index === 3) this.key.right = bool;
      if (event.keyCode === 13) this.enterPressed = bool;
      if (!bool && event.keyCode === 84 && !this.isChatting) {
         this.debugMode = !this.debugMode;
      }
   }
   processServerMessages() {
      for (const msg of this.pendingMessages) {
         if (this.logData) {
            console.log(msg);
         }
         //handle server stuff
      }
   }
   addMessage(datas) {
      const msg = msgpack.decode(new Uint8Array(datas.data));
      this.bytes += datas.data.byteLength;
      this.pendingMessages.push(msg);
   }
   resizeCanvas() {
      resize(this.canvas);
   }
};
