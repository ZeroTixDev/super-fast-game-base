'use strict';
const Vector = require('./vector');
const Lava = require('../.././shared/lava');
const WebSocket = require('ws');
const { encode } = require('../.././shared/name');
const msgpack = require('msgpack-lite');
const Player = require('./player');
const { getId } = require('./id');

module.exports = class Server {
   constructor({ updateRate = 60, sendRate = 40, arenaSize }) {
      this.clients = {};
      this.players = {};
      this.arena = new Vector(arenaSize, arenaSize);
      this.sendRate = sendRate;
      this.updateRate = updateRate;
      this.lava = new Lava();
      this.tick = 0;
      this.start = Date.now();
      this.initPack = [];
      this.removePack = [];
      this.sendPack = null;
      this.startServer();
   }
   validate({ data, id }) {
      if (data.type === 'join') {
         if (this.clients[id] !== undefined) return false;
      }
      if (data.type === 'input') {
         for (const input of data[encode('inputs')]) {
            if (
               Math.round(input.tick) <= this.players[id].pendingInputs[this.players[id].pendingInputs.length - 1]
                  ? this.players[id].pendingInputs[this.players[id].pendingInputs.length - 1].tick
                  : 0
            ) {
               return false;
            }
         }
         if (this.clients[id] !== undefined) return false;
      }
      if (data.type === 'chat') {
         if (this.clients[id] !== undefined) return false;
         if (data.value.length > 45) return false;
      }
      return true;
   }
   handle({ data, id, ws }) {
      if (this.validate({ data, id })) {
         if (data[encode('type')] === 'join') {
            this.newClient({ id, ws });
            ws.send(msgpack.encode(this.initMessage(id)));
         } else if (data[encode('inputs')]) {
            this.players[id].decodeKeys(data[encode('inputs')]);
         } else if (data[encode('type')] === 'chat') {
            this.players[id].chat({ value: data[encode('value')] });
         }
      } else {
         console.log('not valid', data);
      }
   }
   initMessage(id) {
      const object = Object.create(null);
      object[encode('arena')] = this.arena;
      object[encode('initPack')] = [...Player.getAllInitPack(this.players)];
      object[encode('selfId')] = id;
      object[encode('lava')] = { color: this.lava.color, down: this.lava.down, up: this.lava.up };
      return object;
   }
   uniqueId() {
      return getId(Object.keys(this.clients));
   }
   clientLeave(id) {
      delete this.players[id];
      delete this.clients[id];
      this.removePack.push(id);
   }
   newClient({ id, ws }) {
      this.clients[id] = { ws };
      this.players[id] = new Player(id);
      this.initPack.push(this.players[id].getInitPack());
   }
   startServer() {
      this.sendInterval = setInterval(this.sendState.bind(this), 1000 / this.sendRate);
      this.updateInterval = setInterval(this.update.bind(this), 1000 / this.updateRate);
   }
   stopServer() {
      clearInterval(this.sendInterval);
      clearInterval(this.updateInterval);
   }
   sendState() {
      if (!this.sendPack) return;
      for (const i of Object.keys(this.clients)) {
         const clientSocket = this.clients[i].ws;
         if (clientSocket.readyState === WebSocket.OPEN) {
            const object = Object.create(null);
            if (this.sendPack.length > 0) {
               object[encode('newData')] = this.sendPack;
            }
            if (this.initPack.length > 0) {
               object[encode('initPack')] = [...this.initPack];
            }
            if (this.removePack.length > 0) {
               object[encode('removePack')] = [...this.removePack];
            }
            if (Object.keys(object).length > 0) {
               clientSocket.send(msgpack.encode(object));
            }
         }
      }
      this.initPack = [];
      this.removePack = [];
   }
   update() {
      this.tick++;
      const expectedTick = Math.ceil((Date.now() - this.start) / this.updateRate);
      this.lava.simulate();
      Player.updatePlayers({ players: this.players, arena: this.arena });
      while (this.tick < expectedTick) {
         this.lava.simulate();
         Player.updatePlayers({ players: this.players, arena: this.arena });
      }
      this.sendPack = Player.pack(this.players);
   }
};
