'use strict';

const Vector = require('./vector');
const { simulatePlayer } = require('../.././shared/simulate');
const { encode } = require('../.././shared/name');
module.exports = class Player {
   constructor(
      id,
      pos = new Vector(30 + Math.round(Math.random() * 200), 30 + Math.round(Math.random() * 200)),
      keys = [false, false, false, false]
   ) {
      this.id = id;
      this.pos = pos;
      this.mvt = new Vector(0, 0);
      this.keys = keys;
      this.pendingInputs = [];
      this.vel = new Vector(0, 0);
      this.maxSpd = (500 * 1) / 60;
      this.radius = 30;
      this.chatMsg = 'Hello';
      this.chatDuration = 7;
      this.chatTime = 3;
      this.sendingPos = this.pos.copy();
      this.sendingMsg = this.chatMsg;
      this.friction = 0.82;
      this.lastProcessedTick = 0;
   }
   decodeKeys(inputs) {
      for (const object of inputs) {
         this.pendingInputs.push({ input: object.input, tick: object.tick });
      }
   }

   static getAllInitPack(players) {
      const initPacks = [];
      for (const i in players) {
         initPacks.push(players[i].getInitPack());
      }
      return initPacks;
   }
   static updatePlayers({ players, arena }) {
      const oldState = { ...players };
      for (const i of Object.keys(players)) {
         players[i].update(arena, oldState);
      }
   }
   static pack(players) {
      const pack = [];
      for (const i in players) {
         const object = players[i].getUpdatePack();
         if (Object.keys(object).length > 0) pack.push(object);
      }
      return pack;
   }
   getUpdatePack() {
      const object = Object.create(null);
      if (!this.pos.equal(this.sendingPos)) {
         object[encode('pos')] = { x: this.pos.round().x, y: this.pos.round().y };
         object[encode('lastProcessedTick')] = this.lastProcessedTick;
         this.sendingPos = this.pos.copy();
      }
      if (this.chatTime > 0) {
         object[encode('chatTime')] = Math.round(this.chatTime * 100) / 100;
         if (this.chatMsg.length > 0) {
            object[encode('chatMsg')] = this.chatMsg;
         }
      }
      if (Object.keys(object).length > 0) {
         object[encode('id')] = this.id;
      }
      return object;
   }
   static collision({ playerArray, players }) {
      for (let i = 0; i < playerArray.length; i++) {
         for (let j = i + 1; j < playerArray.length; j++) {
            const player1 = players[playerArray[i][0]];
            const player2 = players[playerArray[j][0]];
            if (
               Math.sqrt(
                  Math.abs(Math.pow(player2.pos.x - player1.pos.x, 2) + Math.pow(player2.pos.y - player1.pos.y, 2))
               ) < 60
            ) {
               const distance = Math.sqrt(
                  Math.abs(Math.pow(player2.pos.x - player1.pos.x, 2) + Math.pow(player2.pos.y - player1.pos.y, 2))
               );
               const rotate = Math.atan2(player2.pos.y - player1.pos.y, player2.pos.x - player1.pos.x);
               player2.pos.x += ((Math.cos(rotate) * 1) / distance) * 500;
               player1.pos.x -= ((Math.cos(rotate) * 1) / distance) * 500;
               player2.pos.y += ((Math.sin(rotate) * 1) / distance) * 500;
               player1.pos.y -= ((Math.sin(rotate) * 1) / distance) * 500;
            }
         }
      }
   }
   getInitPack() {
      const object = Object.create(null);
      object[encode('radius')] = this.radius;
      object[encode('maxSpd')] = this.maxSpd;
      object[encode('chatTime')] = Math.round(this.chatTime * 100) / 100;
      object[encode('chatMsg')] = this.chatMsg;
      object[encode('pos')] = { x: this.pos.round().x, y: this.pos.round().y };
      object[encode('id')] = this.id;
      return object;
   }
   update(arena, players) {
      if (this.pendingInputs.length === 0) {
         simulatePlayer({ players, id: this.id, arena }, { up: false, down: false, left: false, right: false });
      } else {
         while (this.pendingInputs.length >= 1) {
            simulatePlayer({ players, id: this.id, arena }, this.pendingInputs[0].input);
            this.lastProcessedTick = this.pendingInputs[0].tick;
            this.pendingInputs.shift();
         }
      }
      this.chatTime -= 1 / 60;
      if (this.chatTime <= 0) this.chatMsg = '';
   }
};
/*const randomConso = function () {
   const index = Math.round(Math.random() * 20);
   const consos = [
      'b',
      'c',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'm',
      'n',
      'p',
      'q',
      'r',
      's',
      't',
      'v',
      'w',
      'x',
      'y',
      'z',
   ];
   return consos[index];
};
const randomVowel = function () {
   const index = Math.round(Math.random() * 4);
   const vowels = ['a', 'e', 'i', 'o', 'u'];
   return vowels[index];
};*/
