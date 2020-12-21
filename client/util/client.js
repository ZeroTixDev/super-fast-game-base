'use strict';

const Lava = require('../.././shared/lava');
const { encode } = require('../.././shared/name');
const { simulatePlayer } = require('../.././shared/simulate');
const { PLAYER_COLOR } = require('./constants');
const resize = require('./util/resize');
const msgpack = require('msgpack-lite');

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
      this.lastTime = Date.now();
      this.key = { left: false, right: false, up: false, down: false };
      this.lava = new Lava();
      this.updateRate = 60;
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
      this.byteDisplay = 0;
      this.tick = 0;
      this.updates = 0;
      this.trackBytes();
   }
   applyEventListeners() {
      window.addEventListener('resize', () => {
         resize(this.canvas);
      });
      this.ws.addEventListener('open', () => {
         this.join();
         window.addEventListener('keydown', this.trackKeys);
         window.addEventListener('keyup', this.trackKeys);
         document.getElementById('loading').style.display = 'none';
         this.loop();
         // canvas event listener move (i dont think i should add muhahagha)
      });
   }
   loop() {
      function gameLoop() {
         this.processServerMessages();
         this.updateGameState((Date.now() - this.lastTime) / 1000);
         this.drawGameState();
         this.lastTime = Date.now();
         requestAnimationFrame(gameLoop);
      }
      requestAnimationFrame(gameLoop);
   }
   updateGameState(delta) {
      if (!this.selfId || !this.players[this.selfId]) return;
      const expectedTick = Math.ceil(((Date.now() - this.start) * 1000) / this.updateRate);
      const simulateAmount = expectedTick - this.tick;
      if (this.isChatting || simulateAmount > 5) {
         this.key = { left: false, right: false, up: false, down: false };
      }
      const inputs = [];
      while (this.tick < expectedTick) {
         inputs.push({ input: this.key, tick: this.tick });
         this.history.push({ tick: this.tick, state: { players: this.players, arena: this.arena } });
         simulatePlayer({ players: this.players, id: this.selfId, arena: this.arena }, this.key);
         this.pendingInputs.push({ input: this.key, tick: this.tick });
         this.lava.simulate();
         this.tick++;
         this.updates++;
      }
      if (inputs.length > 0) {
         const object = Object.create(null);
         object[encode('inputs')] = [...inputs];
         this.ws.send(JSON.stringify(object));
      }
      for (const i of Object.keys(this.players)) {
         this.players[i].update(delta);
      }
   }
   join() {
      const payload = Object.create(null);
      payload[encode('type')] = 'join';
      this.ws.send(JSON.stringify(payload));
   }
   trackBytes() {
      setInterval(() => {
         this.byteDisplay = this.bytes / 1000;
         this.bytes = 0;
         console.log(this.updates, 'updates per second');
         this.updates = 0;
      }, 1000);
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
   drawLava() {
      const [x, y] = [
         Math.round(this.arena.x / 2 - 200 - this.players[this.selfId].x + this.canvas.width / 2),
         Math.round(this.arena.y / 2 - 200 - this.players[this.selfId].y + this.canvas.height / 2),
      ];
      this.ctx.fillStyle = `rgb(${this.lava.color},124,37)`;
      this.ctx.fillRect(x, y, 400, 400);
   }
   drawMinimap() {
      this.ctx.fillStyle = 'rgb(60, 60, 60, 0.8)';
      this.ctx.roundRect(50, 650, 200, 200, 10);
      this.ctx.fillStyle = PLAYER_COLOR;
      for (const i of Object.keys(this.players)) {
         const player = this.players[i];
         this.ctx.beginPath();
         this.ctx.arc(
            Math.round(55 + (player.x / this.arena.x) * 195),
            Math.round(655 + (player.y / this.arena.y) * 195),
            4,
            0,
            Math.PI * 2
         );
         this.ctx.fill();
      }
   }
   drawPlayers() {
      for (const i of Object.keys(this.players)) {
         this.players[i].draw({
            ctx: this.ctx,
            canvas: this.canvas,
            debugMode: this.debugMode,
            center: this.players[this.selfId],
         });
      }
   }
   drawBytes() {
      this.ctx.fillStyle = 'black';
      this.ctx.font = '30px Arial';
      this.ctx.fillText(`${this.byteDisplay} kbps`, this.canvas.width - 100, this.canvas.height - 100);
   }
   drawGameState() {
      if (!this.selfId || !this.players[this.selfId]) return;
      this.drawChat();
      this.drawMap();
      this.drawLava();
      this.drawPlayers();
      this.drawMinimap();
      this.drawBytes();
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

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, radius) {
   const r = x + w;
   const b = y + h;
   this.beginPath();
   this.moveTo(x + radius, y);
   this.lineTo(r - radius, y);
   this.quadraticCurveTo(r, y, r, y + radius);
   this.lineTo(r, y + h - radius);
   this.quadraticCurveTo(r, b, r - radius, b);
   this.lineTo(x + radius, b);
   this.quadraticCurveTo(x, b, x, b - radius);
   this.lineTo(x, y + radius);
   this.quadraticCurveTo(x, y, x + radius, y);
   this.fill();
};
