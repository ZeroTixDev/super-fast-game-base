'use strict';

const Lava = require('../.././shared/lava');
const { encode } = require('../.././shared/name');
const { simulatePlayer } = require('../.././shared/simulate');
const { PLAYER_COLOR } = require('./constants');
const Player = require('./player');
const resize = require('./resize');
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
      this.lastTime = Date.now();
      this.key = { left: false, right: false, up: false, down: false };
      this.chat = {
         lock: false,
         isChatting: false,
      };
      this.debug = {
         log: false,
         mode: false,
         bytes: 0,
         byteDisplay: 0,
         updates: 0,
      };
      this.lava = new Lava();
      this.updateRate = 60;
      this.pendingInputs = [];
      this.history = [];
      this.pendingMessages = [];
      this.isJoined = false;
      this.enterPressed = false;
      this.tick = 0;
      this.drawLoadingScreen();
   }
   on(type, func) {
      this.ws.addEventListener(type, func);
   }
   applyEventListeners() {
      window.addEventListener('resize', () => {
         this.resizeCanvas();
      });
      this.ws.addEventListener(
         'open',
         (() => {
            this.join();
            this.trackBytes();
            window.addEventListener('keydown', this.trackKeys.bind(this));
            window.addEventListener('keyup', this.trackKeys.bind(this));
            document.getElementById('loading').style.display = 'none';
            this.start = Date.now();
            this.loop();
            console.log('client setup working...connected to game server');
            // canvas event listener move (i dont think i should add muhahagha)
         }).bind(this)
      );
   }
   drawLoadingScreen() {
      this.ctx.textAlign = 'center';
      this.ctx.font = '25px sans-serif';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('Connecting...', window.innerWidth / 2, window.innerHeight / 2 + 25);
   }
   loop() {
      function gameLoop() {
         this.processServerMessages();
         this.updateGameState((Date.now() - this.lastTime) / 1000);
         this.drawGameState();
         this.lastTime = Date.now();
         requestAnimationFrame(gameLoop.bind(this));
      }
      requestAnimationFrame(gameLoop.bind(this));
   }
   updateGameState(delta) {
      if (!this.selfId) return;
      const expectedTick = Math.ceil((Date.now() - this.start) * 0.06);
      const simulateAmount = expectedTick - this.tick;
      if (this.chat.isChatting || simulateAmount > 5) {
         this.key = { left: false, right: false, up: false, down: false };
      }
      const inputs = [];
      let amount = 0;
      while (this.tick < expectedTick) {
         if (amount > 10) {
            break;
         }
         inputs.push({ input: this.key, tick: this.tick });
         // this.history.push({ tick: this.tick, state: { players: this.players, arena: this.arena } });
         simulatePlayer({ players: this.players, id: this.selfId, arena: this.arena }, this.key);
         this.pendingInputs.push({ input: this.key, tick: this.tick });
         this.lava.simulate();
         this.tick++;
         this.debug.updates++;
         amount++;
      }
      if (inputs.length > 0) {
         const object = Object.create(null);
         object[encode('inputs')] = [...inputs];
         this.ws.send(JSON.stringify(object));
      }
      for (const i of Object.keys(this.players)) {
         this.players[i].update({ delta, players: this.players, arena: this.arena });
      }
   }
   join() {
      const payload = Object.create(null);
      payload[encode('type')] = 'join';
      this.ws.send(JSON.stringify(payload));
   }
   trackBytes() {
      setInterval(() => {
         this.debug.byteDisplay = this.debug.bytes / 1000;
         this.debug.bytes = 0;
         console.log(this.debug.updates, 'updates per second');
         this.debug.updates = 0;
      }, 1000);
   }
   drawMap() {
      this.ctx.fillStyle = 'rgb(40,40,40)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      const x = Math.round(this.canvas.width / 2 - this.players[this.selfId].x);
      const y = Math.round(this.canvas.height / 2 - this.players[this.selfId].y);
      this.ctx.fillStyle = 'rgb(190,190,190)';
      this.ctx.roundRect(x, y, this.arena.x, this.arena.y, 10);
   }
   drawChat() {
      if (this.enterPressed && !this.chat.lock) {
         this.chat.isChatting = !this.chat.isChatting;
         this.chat.lock = true;
      }
      if (!this.enterPressed) {
         this.chat.lock = false;
      }
      if (this.chat.isChatting) {
         this.chatHolder.style.display = 'block';
         this.chatBox.focus();
      } else {
         if (this.chatBox.value !== '') {
            if (this.chatBox.value.trim().toLowerCase().slice(0, 5) === '/tlog') {
               this.debug.log = !this.debug.log;
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
      this.ctx.shadowColor = `rgb(${this.lava.color}, 124, 37)`;
      this.ctx.shadowBlur = 300;
      this.ctx.fillStyle = `rgb(${this.lava.color},124,37)`;
      this.ctx.fillRect(x, y, 400, 400);
      this.ctx.shadowBlur = 0;
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
            debugMode: this.debug.mode,
            center: this.players[this.selfId],
         });
      }
   }
   drawBytes() {
      this.ctx.fillStyle = 'black';
      this.ctx.font = '30px Arial';
      this.ctx.fillText(`${this.debug.byteDisplay} kbps`, this.canvas.width - 100, this.canvas.height - 50);
   }
   drawGameState() {
      if (!this.selfId) return;
      this.drawChat();
      this.drawMap();
      this.drawLava();
      this.drawPlayers();
      this.drawMinimap();
      this.drawBytes();
   }
   trackKeys(event) {
      if (!this.selfId) return;
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
      if (!bool && event.keyCode === 84 && !this.chat.isChatting) {
         this.debug.mode = !this.debug.mode;
         console.log('toggled debug');
      } else if (!bool && event.keyCode === 81 && !this.chat.isChatting) {
         console.log(this);
      }
   }
   lerp(a, b, t) {
      return (1 - t) * a + t * b;
   }
   reconcile(data) {
      const lastProcessEncoded = encode('lastProcessedTick');
      const posEncoded = encode('pos');
      for (let i = this.history.length - 1; i >= 0; i--) {
         const object = this.history[i];
         if (object.tick < data[lastProcessEncoded]) {
            this.history.splice(i, 1);
         }
      }
      const oldPlayers = { ...this.players };
      this.players = Object.create(null);
      this.players[this.selfId] = oldPlayers[this.selfId];
      this.players[this.selfId].pos = data[posEncoded];
      let j = 0;
      while (j < this.pendingInputs.length) {
         const input = this.pendingInputs[j];
         if (input.tick <= data[lastProcessEncoded]) {
            this.pendingInputs.splice(j, 1);
         } else {
            simulatePlayer({ players: this.players, id: this.selfId, arena: this.arena }, input.input);
            j++;
         }
      }
      const newPos = this.players[this.selfId].pos;
      this.players = oldPlayers;
      this.players[this.selfId].pos = newPos;
   }
   processServerMessages() {
      for (const msg of this.pendingMessages) {
         if (this.debug.log) {
            console.log(msg);
         }
         const selfIdEncoded = encode('selfId');
         if (msg[selfIdEncoded]) {
            this.selfId = msg[selfIdEncoded];
            this.isJoined = true;
         }
         const arenaEncoded = encode('arena');
         if (msg[arenaEncoded]) {
            this.arena = msg[arenaEncoded];
            this.isJoined = true;
         }
         const lavaEncoded = encode('lava');
         if (msg[lavaEncoded]) {
            console.log('got lava', msg[lavaEncoded]);
            this.lava.color = msg[lavaEncoded].color;
            this.lava.up = msg[lavaEncoded].up;
            this.lava.down = msg[lavaEncoded].down;
            this.isJoined = true;
            for (let i = 0; i < this.tick; i++) {
               this.lava.simulate();
            }
         }
         const initPackEncoded = encode('initPack');
         if (msg[initPackEncoded]) {
            for (const data of msg[initPackEncoded]) {
               this.players[data[encode('id')]] = new Player(data, data[encode('id')] === this.selfId);
            }
            this.isJoined = true;
         }
         if (this.selfId && this.players[this.selfId]) {
            //update code
            const newDataEncoded = encode('newData');
            if (msg[newDataEncoded]) {
               const idEncoded = encode('id');
               const posEncoded = encode('pos');
               const lastProcessEncoded = encode('lastProcessedTick');
               const chatTimeEncoded = encode('chatTime');
               const chatMsgEncoded = encode('chatMsg');
               const maxSpdEncoded = encode('maxSpd');
               for (const data of msg[newDataEncoded]) {
                  const player = this.players[data[idEncoded]];
                  if (player) {
                     if (data[posEncoded] !== undefined) {
                        if (
                           data[lastProcessEncoded] &&
                           this.selfId &&
                           this.arena &&
                           this.players[this.selfId] &&
                           data[idEncoded] === this.selfId
                        ) {
                           this.reconcile(data);
                        }
                        player.lastState = player.serverState;
                        /* player.serverState.pos.x += data[posEncoded].x;
	                     player.serverState.pos.y += data[posEncoded].y;*/
                        player.serverState.pos = data[posEncoded];
                        player.serverState.time = Date.now();
                     }
                     if (data[chatTimeEncoded] !== undefined) {
                        player.chatTime = data[chatTimeEncoded];
                     }
                     if (data[chatMsgEncoded] !== undefined) {
                        player.chatMsg = data[chatMsgEncoded];
                     }
                     if (data[maxSpdEncoded] !== undefined) {
                        player.maxSpd = data[maxSpdEncoded];
                     }
                  }
               }
            }
         }
         const removePackEncoded = encode('removePack');
         if (msg[removePackEncoded]) {
            for (const data of msg[removePackEncoded]) {
               delete this.players[data];
            }
         }
      }
      this.pendingMessages = [];
   }
   addMessage(datas) {
      const msg = msgpack.decode(new Uint8Array(datas.data));
      this.debug.bytes += datas.data.byteLength;
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
