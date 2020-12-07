'use strict';

require('./style.css');
const msgpack = require('msgpack-lite');
const resize = require('./resize');
const { simulatePlayer } = require('.././shared/simulate');
const ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
ws.binaryType = 'arraybuffer';
const game = document.getElementById('game');
const players = Object.create(null);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const chatBox = document.getElementById('chatBox');
const chatHolder = document.getElementById('chatHolder');
let arena = null;
let selfId = null;
ctx.textAlign = 'center';
ctx.font = '20px Verdana, Geneva, sans-serif';
let chatlock = false;
let enterPressed = false;
let isChatting = false;
let lavaColor = 107;
let bytes = 0;
let tick = 0;
let updates = 0;
let debugMode = false;
const start = Date.now();
let byteDisplay = 0;
const PLAYER_COLOR = '#242424';
const mouse = { x: 0, y: 0 };
let key = { left: false, right: false, up: false, down: false };
const pendingInputs = [];
let pendingMessages = [];
let scale = resize(canvas);
window.addEventListener('resize', () => (scale = resize(canvas)));
window.requestAnimationFrame(loop);
ws.onopen = () => {
   const payload = {
      type: 'join',
   };
   ws.send(JSON.stringify(payload));
   window.addEventListener('keydown', trackKeys);
   window.addEventListener('keyup', trackKeys);
   document.getElementById('loading').style.display = 'none';
   canvas.addEventListener('mousemove', (e) => {
      const t = canvas.getBoundingClientRect();
      mouse.x = Math.round((e.pageX - t.left) / scale);
      mouse.y = Math.round((e.pageY - t.top) / scale);
   });
   game.style.backgroundColor = 'black';
};
setInterval(() => {
   byteDisplay = bytes / 1000;
   bytes = 0;
   console.log(updates, 'updates per second');
   updates = 0;
}, 1000);
function recon(data, player) {
   player.pos = data.pos;
   // apply inputs not yet received by the server
   let j = 0;
   while (j < pendingInputs.length) {
      const input = pendingInputs[j];
      if (input.tick <= data.lastProcessedTick) {
         // Already processed. Its effect is already taken into account into the world update
         // we just got, so we can drop it.
         pendingInputs.splice(j, 1);
      } else {
         // Not processed by the server yet. Re-apply it.
         simulatePlayer({ player, arena }, input.input);
         j++;
      }
   }
}
function processMessages() {
   for (const msg of pendingMessages) {
      if (msg.selfId) {
         selfId = msg.selfId;
      }
      if (msg.arena) {
         arena = msg.arena;
      }
      if (msg.lavaColor) {
         lavaColor = msg.lavaColor;
      }
      if (msg.initPack && msg.initPack.length > 0) {
         for (const data of msg.initPack) {
            new Player(data);
         }
      }
      if (selfId && players[selfId]) {
         //update code
         if (msg.newData) {
            for (const data of msg.newData) {
               const player = players[data.id];
               if (player) {
                  if (data.pos !== undefined) {
                     if (data.lastProcessedTick && selfId && arena && players[selfId] && data.id === selfId) {
                        recon(data, player);
                     }
                     player.lastState = player.serverState;
                     player.serverState.pos = data.pos;
                     player.serverState.time = Date.now();
                  }
                  if (data.chatTime !== undefined) {
                     player.chatTime = data.chatTime;
                  }
                  if (data.chatMsg !== undefined) {
                     player.chatMsg = data.chatMsg;
                  }
                  if (data.maxSpd !== undefined) {
                     player.maxSpd = data.maxSpd;
                  }
               }
            }
         }
      }
      if (msg.removePack && msg.removePack.length > 0) {
         for (const data of msg.removePack) {
            delete players[data];
         }
      }
   }
   pendingMessages = [];
}
ws.addEventListener('message', (datas) => {
   const msg = msgpack.decode(new Uint8Array(datas.data));
   bytes += datas.data.byteLength;
   pendingMessages.push(msg);
});
function trackKeys(event) {
   if (!selfId || !players[selfId]) return;
   const index = [
      [87, 38],
      [83, 40],
      [65, 37],
      [68, 39],
   ].findIndex((e) => e.includes(event.keyCode));
   /*
  37 left
  38 up
  39 right
  40 down
  */
   /*if (index > -1) {
		keys[index] = event.type === 'keydown'
	}*/
   const value = event.type === 'keydown';
   if (index === 0) key.up = value;
   if (index === 1) key.down = value;
   if (index === 2) key.left = value;
   if (index === 3) key.right = value;
   if (event.keyCode === 13) enterPressed = value;
   if (value === false && event.keyCode === 84 && !isChatting) {
      debugMode = !debugMode;
   }
}
function drawMap() {
   ctx.fillStyle = 'rgb(40,40,40)';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   const x = Math.round(canvas.width / 2 - players[selfId].pos.x);
   const y = Math.round(canvas.height / 2 - players[selfId].pos.y);
   ctx.fillStyle = 'rgb(210,210,210)';
   ctx.roundRect(x, y, arena.x, arena.y, 10);
}
function renderChat() {
   if (enterPressed && !chatlock) {
      isChatting = !isChatting;
      chatlock = true;
   }
   if (!enterPressed) {
      chatlock = false;
   }
   if (isChatting) {
      chatHolder.style.display = 'block';
      chatBox.focus();
      chatBox.setAttribute('maxlength', 120);
   } else {
      if (chatBox.value !== '' && chatBox.value !== '/') {
         const payLoad = {
            type: 'chat',
            value: chatBox.value,
         };
         ws.send(JSON.stringify(payLoad));
      }
      chatHolder.style.display = 'none';
      chatBox.value = '';
      chatBox.setAttribute('maxlength', 45);
   }
}
function renderLava() {
   const [x, y] = [
      Math.round(arena.x / 2 - 200 - players[selfId].pos.x + canvas.width / 2),
      Math.round(arena.y / 2 - 200 - players[selfId].pos.y + canvas.height / 2),
   ];
   ctx.fillStyle = `rgb(${lavaColor},124,37)`;
   ctx.fillRect(x, y, 400, 400);
}
function renderMinimap(player) {
   ctx.fillStyle = PLAYER_COLOR;
   ctx.beginPath();
   ctx.arc(
      Math.round(55 + (player.pos.x / arena.x) * 195),
      Math.round(655 + (player.pos.y / arena.y) * 195),
      4,
      0,
      Math.PI * 2
   );
   ctx.fill();
}
let lastTime = Date.now();
function loop() {
   const delta = (Date.now() - lastTime) / 1000;
   lastTime = Date.now();
   processMessages();
   update(delta);
   render();
   requestAnimationFrame(loop);
}
function update(delta) {
   if (!selfId || !players[selfId]) return;
   if (isChatting) key = { left: false, right: false, up: false, down: false };
   const expectedTick = Math.ceil((Date.now() - start) * 0.06);
   while (tick < expectedTick) {
      const payload = {
         type: 'input',
         input: key,
         tick,
      };
      ws.send(JSON.stringify(payload));
      simulatePlayer({ player: players[selfId], arena }, key);
      players[selfId].pos = { x: Math.round(players[selfId].pos.x), y: Math.round(players[selfId].pos.y) };
      pendingInputs.push({ input: key, tick });
      tick++;
      updates++;
   }
   for (const i in players) {
      const player = players[i];
      player.update(delta);
   }
}
function render() {
   if (!selfId || !players[selfId]) return;
   renderChat();
   drawMap();
   renderLava();
   ctx.fillStyle = 'rgb(60, 60, 60, 0.8)';
   ctx.roundRect(50, 650, 200, 200, 10);
   for (const i in players) {
      const player = players[i];
      renderMinimap(player);
      player.draw();
   }
   ctx.fillStyle = 'black';
   ctx.font = '30px Arial';
   ctx.fillText(`${byteDisplay} kbps`, 1500, 800);
}
function lerp(a, b, t) {
   return (1 - t) * a + t * b;
}
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
class Player {
   constructor(initPack) {
      this.pos = initPack.pos;
      this.radius = initPack.radius;
      this.id = initPack.id;
      this.chatTime = initPack.chatTime;
      this.chatMsg = initPack.chatMsg;
      this.vel = { x: 0, y: 0 };
      this.maxSpd = initPack.maxSpd;
      this.interpBuffer = []; // {time:Date.now(), pos}
      this.serverState = { time: Date.now(), pos: this.pos };
      this.lastState = { time: Date.now(), pos: this.pos };
      this.correctPosition = { pos: this.pos };
      players[this.id] = this;
   }
   update(delta) {
      if (this.id !== selfId) {
         const time = delta * 15;
         if (delta >= 1 / 15) {
            this.pos = this.serverState.pos;
            this.lastState.pos = this.serverState.pos;
            return;
         }
         this.lastState.pos.x = lerp(this.lastState.pos.x, this.serverState.pos.x, time);
         this.lastState.pos.y = lerp(this.lastState.pos.y, this.serverState.pos.y, time);
         this.pos.x = lerp(this.pos.x, this.lastState.pos.x, time);
         this.pos.y = lerp(this.pos.y, this.lastState.pos.y, time);
      } else {
         /*const distance = dist(this.pos.x, this.pos.y, this.correctPosition.pos.x, this.correctPosition.pos.y);
         const time = delta * (distance === 0 ? 0.0001 : distance) * 0.001;*/
         //console.log(time)
         //this.pos.x = lerp(this.pos.x, this.correctPosition.pos.x, time)
         //this.pos.y = lerp(this.pos.y, this.correctPosition.pos.y, time)
      }
   }
   draw() {
      const [x, y] = [
         Math.round(this.pos.x - players[selfId].pos.x + canvas.width / 2),
         Math.round(this.pos.y - players[selfId].pos.y + canvas.height / 2),
      ];
      ctx.fillStyle = PLAYER_COLOR;
      // ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(x, y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      if (debugMode && this.id === selfId) {
         ctx.fillStyle = 'red';
         ctx.beginPath();
         const [serverX, serverY] = [
            Math.round(this.serverState.pos.x - players[selfId].pos.x + canvas.width / 2),
            Math.round(this.serverState.pos.y - players[selfId].pos.y + canvas.height / 2),
         ];
         ctx.arc(serverX, serverY, this.radius, 0, Math.PI * 2);
         ctx.fill();
      }
      if (debugMode) {
         ctx.fillStyle = 'blue';
         ctx.beginPath();
         const [correctX, correctY] = [
            Math.round(this.correctPosition.pos.x - players[selfId].pos.x + canvas.width / 2),
            Math.round(this.correctPosition.pos.y - players[selfId].pos.y + canvas.height / 2),
         ];
         ctx.arc(correctX, correctY, this.radius, 0, Math.PI * 2);
         ctx.fill();
      }
      /*ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rot);
    ctx.rect(0, -8, 90, 16);
    ctx.fill();
    ctx.restore();*/
      // resetShadowBlur();
      //ctx.shadowOffsetY = 0;
      //ctx.shadowOffsetX = 0;
      if (this.chatTime >= 0) {
         ctx.font = '20px Verdana, Geneva, sans-serif';
         ctx.fillStyle = `rgb(50, 50, 50, ${this.chatTime / 3})`;
         // ctx.shadowColor = "white";
         // ctx.shadowBlur = 10;
         const width = ctx.measureText(this.chatMsg).width;
         ctx.fillRect(Math.round(x - width / 2 - 3), Math.round(y - 67), Math.round((width * 2) / 2 + 6), 30);
         ctx.fillStyle = `rgb(200, 200, 200, ${this.chatTime / 3})`;
         ctx.fillText(this.chatMsg, x, Math.round(y - this.radius - 15));
      }
   }
}
