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
      // spawn in...
      this.radius = 30;
      this.chatMsg = 'Hello';
      this.chatDuration = 7;
      this.chatTime = 3;
      this.sendingPos = pos.copy();
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
   static onDisconnect({ id, players, removePack }) {
      delete players[id];
      removePack.push(id);
   }
   static pack({ players, arena }) {
      const pack = [];
      const playersCopy = { ...players };
      for (const i in players) {
         players[i].update(arena, playersCopy);
         const object = players[i].getUpdatePack();
         if (Object.keys(object).length > 0) pack.push(object);
      }
      return pack;
   }
   getUpdatePack() {
      const object = Object.create(null);
      // if (this.pos.delta(this.sendingPos) > 1) {
      if (!this.pos.round().equal(this.sendingPos)) {
         object[encode('pos')] = this.pos.round().delta(this.sendingPos.round()).round();
         this.sendingPos.x += object[encode('pos')].x;
         this.sendingPos.y += object[encode('pos')].y;
         object[encode('lastProcessedTick')] = this.lastProcessedTick;
      }
      // console.log(object.pos);
      //}
      if (this.chatTime > 0) {
         object.chatTime = Math.round(this.chatTime * 100) / 100;
         if (this.chatMsg.length > 0) {
            object.chatMsg = this.chatMsg;
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
      const object = {
         radius: this.radius,
         chatTime: Math.round(this.chatTime * 100) / 100,
         chatMsg: this.chatMsg,
         maxSpd: this.maxSpd,
      };
      object[encode('pos')] = this.pos.round();
      object[encode('id')] = this.id;
      return object;
   }
   update(arena, players) {
      while (this.pendingInputs.length >= 1) {
         simulatePlayer({ players, id: this.id, arena }, this.pendingInputs[0].input);
         this.pos.round();
         if (this.pendingInputs.length === 1) this.lastProcessedTick = this.pendingInputs[0].tick;
         this.pendingInputs.shift();
      }
      /*this.vel.y *= Math.pow(this.friction, delta * 60)*/
      /*this.vel.x *= Math.pow(this.friction, delta * 60)*/
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
