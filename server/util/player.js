const Vector = require('./vector')
const { simulatePlayer } = require('../.././shared/simulate')
const randomConso = function() {
	const index = Math.round(Math.random() * 20)
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
	]
	return consos[index]
}
const randomVowel = function() {
	const index = Math.round(Math.random() * 4)
	const vowels = ['a', 'e', 'i', 'o', 'u']
	return vowels[index]
}
module.exports = class Player {
	constructor(
		id,
		pos = new Vector(
			30 + Math.round(Math.random() * 200),
			30 + Math.round(Math.random() * 200),
		),
		keys = [false, false, false, false],
	) {
		this.id = id
		this.pos = pos
		this.mvt = new Vector(0, 0)
		this.keys = keys
		this.pendingInputs = []
		this.vel = new Vector(0, 0)
		this.maxSpd = 500 * 1 / 60
		// spawn in...
		this.radius = 30
		this.chatMsg = 'Hello'
		this.chatDuration = 7
		this.chatTime = 3
		this.sendingPos = new Vector(0,0)
		this.sendingMessage = ''
		this.friction = 0.82
		this.lastProcessedTick = 0
	}
	decodeKeys(input, tick) {
		this.lastProcessedTick = tick
	  	this.input = input
	  	this.pendingInputs.push(this.input)
	}

	static getAllInitPack(players) {
		const initPacks = []
		for (const i in players) {
			initPacks.push(players[i].getInitPack())
		}
		return initPacks
	}
	static onDisconnect({id, players, removePack}) {
		delete players[id]
		removePack.push(id)
	}
	static pack({players, arena}) {
		const pack = []
		for (const i in players) {
			players[i].update(arena)
			pack.push(players[i].getUpdatePack())
		}
		return pack
	}
	getUpdatePack() {
		const object = {/*id:this.id*/}
		/*if((this.sendingPos.x !== this.pos.x) || (this.pos.y !== this.pos.y)) {
			object.pos = this.pos.round()
			this.sendingPos = this.pos
		}*/
		object.pos = this.pos.round()
		if(this.chatTime > 0) {
			object.chatTime = Math.round(this.chatTime*100)/100
			object.chatMsg = this.chatMsg
		}
		if(this.sendingMsg !== this.chatMsg) {
			this.sendingMsg = this.chatMsg
		}
		object.lastProcessedTick = this.lastProcessedTick
	    object.id = this.id
		return object
		/*return {
			id:this.id,
			pos:this.pos.round(),
			chatTime:this.chatTime,
			chatMsg: this.chatMsg
		}*/
	}
	static collision({playerArray, players}) {
		for (let i = 0; i < playerArray.length; i++) {
			for (let j = i + 1; j < playerArray.length; j++) {
				const player1 = players[playerArray[i][0]]
				const player2 = players[playerArray[j][0]]
				if (
					Math.sqrt(
						Math.abs(
							Math.pow(player2.pos.x - player1.pos.x, 2) +
                Math.pow(player2.pos.y - player1.pos.y, 2),
						),
					) < 60
				) {
					const distance = Math.sqrt(
						Math.abs(
							Math.pow(player2.pos.x - player1.pos.x, 2) +
                Math.pow(player2.pos.y - player1.pos.y, 2),
						),
					)
					const rotate = Math.atan2(
						player2.pos.y - player1.pos.y,
						player2.pos.x - player1.pos.x,
					)
					player2.pos.x += ((Math.cos(rotate) * 1) / distance) * 500
					player1.pos.x -= ((Math.cos(rotate) * 1) / distance) * 500
					player2.pos.y += ((Math.sin(rotate) * 1) / distance) * 500
					player1.pos.y -= ((Math.sin(rotate) * 1) / distance) * 500
				}
			}
		}
	}
	getInitPack() {
		return {
			id: this.id,
			pos: this.pos.round(),
			radius: this.radius,
			chatTime: Math.round(this.chatTime*100)/100,
			chatMsg: this.chatMsg,
			maxSpd: this.maxSpd,
 		}
	}
	update(arena) {
		while(this.pendingInputs.length >= 1) {
			simulatePlayer({player:this,arena}, this.pendingInputs[0])
			this.pendingInputs.shift()
		}
		/*this.vel.y *= Math.pow(this.friction, delta * 60)*/
		/*this.vel.x *= Math.pow(this.friction, delta * 60)*/
		this.chatTime -= 1 / 60
		if(this.chatTime <= 0) this.chatMsg = ''
	}
}
