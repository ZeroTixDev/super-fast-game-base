'use strict';

const express = require('express');
const WebSocket = require('ws');
const app = express();
const wss = new WebSocket.Server({ noServer: true });
const server = app.listen(process.env.PORT || 4000, () => console.log('Server running at port 4000'));
const path = require('path');
const Player = require('./util/player');
const Vector = require('./util/vector');
const msgpack = require('msgpack-lite');
const { filterMessage } = require('./util/filter');
const { getId } = require('./util/id');
const { encode } = require('.././shared/name');
const { validateMessage } = require('./util/message');
const clients = {};
const players = {};
const arena = new Vector(1000, 1000);
const sendRate = 20;
const updateRate = 60;
let lavaColor = 107;
let lavaUp = true;
let lavaDown = false;
let initPack = [];
let removePack = [];
let sendPack = null;
let tick = 0;
let lastLavaColor = 0;
const start = Date.now();
app.use(express.static('dist'));
app.use(express.static('shared'));
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '/dist/index.html'));
});
app.get('/simulate', function (req, res) {
   res.sendFile(path.join(__dirname, '/shared/simulate.js'));
});
server.on('upgrade', (request, socket, head) => {
   wss.handleUpgrade(request, socket, head, (socket) => {
      wss.emit('connection', socket, request);
   });
});
function gameUpdate() {
   tick++;
   const expectedTick = Math.ceil((Date.now() - start) / updateRate);
   //const playerArray = Object.entries({...players})
   //Player.collision({playerArray, players})
   let pack = Player.pack({ players, arena });
   while (tick < expectedTick) {
      pack = Player.pack({ players, arena });
      tick++;
   }
   sendPack = pack;
   if (lavaUp) lavaColor++;
   if (lavaDown) lavaColor--;
   if (lavaDown && lavaColor < 0) {
      lavaDown = false;
      lavaUp = true;
   }
   if (lavaUp && lavaColor > 255) {
      lavaUp = false;
      lavaDown = true;
   }
}
function sendState(clients) {
   if (!sendPack) return;
   for (const i in clients) {
      const clientSocket = clients[i].ws;
      if (clientSocket.readyState === WebSocket.OPEN) {
         const object = Object.create(null);
         const lavaDelta = lavaColor - lastLavaColor;
         lastLavaColor = lavaColor;
         object[encode('lavaColor')] = lavaDelta;
         if (sendPack.length > 0) {
            object[encode('newData')] = sendPack;
         }
         if (initPack.length > 0) {
            object[encode('initPack')] = [...initPack];
         }
         if (removePack.length > 0) {
            object[encode('removePack')] = [...removePack];
         }
         clientSocket.send(msgpack.encode(object));
      }
   }
   initPack = [];
   removePack = [];
}
wss.on('connection', (ws) => {
   const clientId = getId(players);
   let joined = false;
   ws.on('message', (msg) => {
      try {
         const data = JSON.parse(msg);
         if (validateMessage(data, { joined, tick })) {
            if (data.type === 'join') {
               joined = true;
               clients[clientId] = { ws };
               players[clientId] = new Player(clientId);
               initPack.push(players[clientId].getInitPack());
               const object = Object.create(null);
               object[encode('arena')] = arena;
               object[encode('initPack')] = [...Player.getAllInitPack(players)];
               object[encode('selfId')] = clientId;
               ws.send(msgpack.encode(object));
            } else if (data.inputs) {
               players[clientId].decodeKeys(data.inputs);
            } else if (data.type === 'chat') {
               players[clientId].chatMsg = filterMessage(data.value);
               players[clientId].chatTime = players[clientId].chatDuration;
            }
         } else {
            console.log('not valid');
         }
      } catch (err) {
         console.log(err);
      }
   });
   ws.on('close', () => {
      delete clients[clientId];
      Player.onDisconnect({ id: clientId, players, removePack });
   });
});
setInterval(() => {
   sendState(clients);
}, 1000 / sendRate);
setInterval(() => {
   gameUpdate();
}, 1000 / updateRate);
