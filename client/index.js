'use strict';

require('./style.css');
const msgpack = require('msgpack-lite');
const resize = require('./resize');
const { encode } = require('.././shared/name');
const { simulatePlayer } = require('.././shared/simulate');
let ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
ws.binaryType = 'arraybuffer';
ws.onclose = function () {
   isJoined = false;
   reconnect();
};
const game = document.getElementById('game');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = '100px Arial';
ctx.textAlign = 'center';
ctx.fillStyle = 'white';
ctx.fillText('Connecting...', window.innerWidth / 2, window.innerHeight / 2 + 100);
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
let players = Object.create(null);
const start = Date.now();
let byteDisplay = 0;
const PLAYER_COLOR = '#242424';
const mouse = { x: 0, y: 0 };
let key = { left: false, right: false, up: false, down: false };
const pendingInputs = [];
const history = [];
let pendingMessages = [];
let isJoined = false;
let scale = resize(canvas);
window.addEventListener('resize', () => (scale = resize(canvas)));
window.requestAnimationFrame(loop);
ws.onopen = () => {
   join();
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
function join() {
   let t = 0;
   function attempt() {
      t++;
      console.log('attempting to join');
      if (isJoined || t > 5) {
         if (t > 5) {
            const answer = prompt('Do you want to try to connect again?').trim().toLowerCase();
            if (!isJoined) {
               if (answer === 'y') {
                  t = 0;
               } else {
                  alert(
                     'You have lost connection to the game server. Try refreshing or checking your internet connection.'
                  );
                  return;
               }
            }
         } else {
            clearInterval(interval);
            console.log('successfully joined');
            return;
         }
      }
      const payload = Object.create(null);
      payload[encode('type')] = 'join';
      ws.send(JSON.stringify(payload));
   }
   attempt();
   const interval = setInterval(attempt, 2000);
}
console.log('correction... v8');
function recon(data, player) {
   const lastProcessEncoded = encode('lastProcessedTick');
   const posEncoded = encode('pos');
   for (let i = history.length - 1; i >= 0; i--) {
      const object = history[i];
      if (object.tick < data[lastProcessEncoded]) {
         history.splice(i, 1);
      }
   }
   // const clientPos = history.find((object) => object.tick === data[lastProcessEncoded]).state.player.pos;
   const oldPos = players[selfId].pos;
   players = history.find((object) => object.tick === data[lastProcessEncoded]).state.players;
   players[selfId].pos = data[posEncoded];
   let j = 0;
   while (j < pendingInputs.length) {
      const input = pendingInputs[j];
      if (input.tick <= data[lastProcessEncoded]) {
         // Already processed. Its effect is already taken into account into the world update
         // we just got, so we can drop it.
         pendingInputs.splice(j, 1);
      } else {
         // Not processed by the server yet. Re-apply it.
         simulatePlayer({ players, id: selfId, arena }, input.input);
         j++;
      }
   }
   players[selfId].pos.x = lerp(oldPos.x, players[selfId].pos.x, 0.3);
   players[selfId].pos.y = lerp(oldPos.y, players[selfId].pos.y, 0.3);
   /* let j = 0;
   while (j < pendingInputs.length) {
      const input = pendingInputs[j];
      if (input.tick <= data.lastProcessedTick) {
         // Already processed. Its effect is already taken into account into the world update
         // we just got, so we can drop it.
         pendingInputs.splice(j, 1);
      } else {
         // Not processed by the server yet. Re-apply it.
         history[input.tick] = { tick: input.tick, state: { player: players[selfId], arena } };
         simulatePlayer({ players, id: selfId, arena }, input.input);
         j++;
      }
   }*/
   /*if (predictedPlayerPos.x !== data.pos.x || predictedPlayerPos.y !== data.pos.y) {
      console.log('predicted object', history.find((object) => object.tick === data.lastProcessedTick).state);
      console.log('tick', tick, 'server tick', data.lastProcessedTick);
      console.log('predicted', predictedPlayerPos, 'server', data.pos);
      //wrong prediction,
      player.pos = data.pos;
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
      console.log('result', player.pos);
   }*/
}
function reconnect() {
   let t = 0;
   const interval = setInterval(() => {
      t++;
      ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
      ws.binaryType = 'arraybuffer';
      console.log('attempting to reconnect');
      ws.onopen = function () {
         console.log('reconnected');
         join();
         clearInterval(interval);
      };
      if (t > 4) {
         clearInterval(interval);
      }
   }, 5000);
}
function processMessages() {
   for (const msg of pendingMessages) {
      const selfIdEncoded = encode('selfId');
      if (msg[selfIdEncoded]) {
         selfId = msg[selfIdEncoded];
         isJoined = true;
      }
      const arenaEncoded = encode('arena');
      if (msg[arenaEncoded]) {
         arena = msg[arenaEncoded];
         isJoined = true;
      }
      const lavaColorEncoded = encode('lavaColor');
      if (msg[lavaColorEncoded]) {
         lavaColor += msg[lavaColorEncoded];
      }
      const initPackEncoded = encode('initPack');
      if (msg[initPackEncoded]) {
         for (const data of msg[initPackEncoded]) {
            new Player(data);
         }
         isJoined = true;
      }
      if (selfId && players[selfId]) {
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
               const player = players[data[idEncoded]];
               if (player) {
                  if (data[posEncoded] !== undefined) {
                     if (data[lastProcessEncoded] && selfId && arena && players[selfId] && data[idEncoded] === selfId) {
                        recon(data, player);
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
   const x = Math.round(canvas.width / 2 - players[selfId].x);
   const y = Math.round(canvas.height / 2 - players[selfId].y);
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
      chatBox.setAttribute('maxlength', 45);
   } else {
      if (chatBox.value !== '' && chatBox.value !== '/') {
         const payload = Object.create(null);
         payload[encode('value')] = chatBox.value;
         payload[encode('type')] = 'chat';
         ws.send(JSON.stringify(payload));
      }
      chatHolder.style.display = 'none';
      chatBox.value = '';
      chatBox.setAttribute('maxlength', 45);
   }
}
function renderLava() {
   const [x, y] = [
      Math.round(arena.x / 2 - 200 - players[selfId].x + canvas.width / 2),
      Math.round(arena.y / 2 - 200 - players[selfId].y + canvas.height / 2),
   ];
   ctx.fillStyle = `rgb(${lavaColor},124,37)`;
   ctx.fillRect(x, y, 400, 400);
}
function renderMinimap(player) {
   ctx.fillStyle = PLAYER_COLOR;
   ctx.beginPath();
   ctx.arc(
      Math.round(55 + (player.x / arena.x) * 195),
      Math.round(655 + (player.y / arena.y) * 195),
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
   const expectedTick = Math.ceil((Date.now() - start) * 0.06);
   const simulateAmount = expectedTick - tick;
   if (isChatting || simulateAmount > 5) key = { left: false, right: false, up: false, down: false };
   const inputs = [];
   while (tick < expectedTick) {
      inputs.push({ input: key, tick });
      history.push({ tick, state: { players, arena } });
      simulatePlayer({ players, id: selfId, arena }, key);
      pendingInputs.push({ input: key, tick });
      tick++;
      updates++;
   }
   if (inputs.length > 0) {
      const object = Object.create(null);
      object[encode('inputs')] = inputs;
      ws.send(JSON.stringify(object));
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
      this.interpBuffer = []; // {time:Date.now(), pos}
      this.serverState = { time: Date.now(), pos: this.pos };
      this.lastState = { time: Date.now(), pos: this.pos };
      this.correctPosition = { pos: this.pos };
      this.x = this.pos.x;
      this.y = this.pos.y;
      players[this.id] = this;
   }
   update(delta) {
      if (this.id !== selfId) {
         const time = delta * 20;
         if (delta >= 1 / 20) {
            this.x = this.serverState.pos.x;
            this.y = this.serverState.pos.y;
            this.lastState.pos = this.serverState.pos;
            return;
         }
         /* this.lastState.pos.x = lerp(this.lastState.pos.x, this.serverState.pos.x, time);
         this.lastState.pos.y = lerp(this.lastState.pos.y, this.serverState.pos.y, time);*/
         this.pos.x = lerp(this.pos.x, this.serverState.pos.x, time);
         this.pos.y = lerp(this.pos.y, this.serverState.pos.y, time);
         this.x = lerp(this.x, this.pos.x, time);
         this.y = lerp(this.y, this.pos.y, time);
         simulatePlayer({ players, id: this.id, arena }, { up: false, down: false, right: false, left: false });
      } else {
         const time = delta * 20;
         if (delta >= 1 / 20) {
            this.x = this.pos.x;
            this.y = this.pos.y;
            return;
         }
         this.x = lerp(this.x, this.pos.x, time);
         this.y = lerp(this.y, this.pos.y, time);
         /* const time = delta * 30;
         this.pos.x = lerp(this.pos.x, this.correctPosition.pos.x, time);
         this.pos.y = lerp(this.pos.y, this.correctPosition.pos.y, time);*/
      }
   }
   draw() {
      const [x, y] = [
         Math.round(this.x - players[selfId].x + canvas.width / 2),
         Math.round(this.y - players[selfId].y + canvas.height / 2),
      ];
      ctx.fillStyle = PLAYER_COLOR;
      // ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(x, y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      if (debugMode && this.id === selfId) {
         ctx.fillStyle = 'blue';
         ctx.beginPath();
         const [serverX, serverY] = [
            Math.round(this.lastState.pos.x - players[selfId].x + canvas.width / 2),
            Math.round(this.lastState.pos.y - players[selfId].y + canvas.height / 2),
         ];
         ctx.arc(serverX, serverY, this.radius, 0, Math.PI * 2);
         ctx.fill();
      }
      if (debugMode) {
         ctx.fillStyle = 'red';
         ctx.beginPath();
         const [correctX, correctY] = [
            Math.round(this.correctPosition.pos.x - players[selfId].x + canvas.width / 2),
            Math.round(this.correctPosition.pos.y - players[selfId].y + canvas.height / 2),
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
