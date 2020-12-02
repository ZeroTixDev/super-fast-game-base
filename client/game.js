const ws = new WebSocket(location.origin.replace(/^http/, 'ws'))
ws.binaryType = 'arraybuffer'
const game = document.getElementById('game')
let players = Object.create(null)
let keys = new Array(4).fill(false)
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const chatBox = document.getElementById('chatBox')
const chatHolder = document.getElementById('chatHolder')
let arena = null
let scale = 0
let selfId = null
ctx.textAlign = 'center'
ctx.font = '20px Verdana, Geneva, sans-serif'
let chatlock = false
let enterPressed = false
let isChatting = false
let lavaColor = 107
let bytes = 0
let tick = 0
const start = window.performance.now()
let byteDisplay = 0
const PLAYER_COLOR = '#242424'
const mouse = { x: 0, y: 0 }
window.addEventListener('mouseout', () => {
	keys = new Array(4).fill(false)
})
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, radius) {
	var r = x + w
	var b = y + h
	this.beginPath()
	this.moveTo(x + radius, y)
	this.lineTo(r - radius, y)
	this.quadraticCurveTo(r, y, r, y + radius)
	this.lineTo(r, y + h - radius)
	this.quadraticCurveTo(r, b, r - radius, b)
	this.lineTo(x + radius, b)
	this.quadraticCurveTo(x, b, x, b - radius)
	this.lineTo(x, y + radius)
	this.quadraticCurveTo(x, y, x + radius, y)
	this.fill()
}
class Player {
	constructor(initPack) {
		this.pos = initPack.pos
		this.radius = initPack.radius
		this.id = initPack.id
		this.chatTime = initPack.chatTime
		this.chatMsg = initPack.chatMsg
		this.vel = initPack.vel
		this.maxSpd = initPack.maxSpd
		this.interpBuffer = [] // {time:window.performance.now(), pos}
		this.serverState = {time:window.performance.now(),pos:this.pos}
		this.lastState = {time:window.performance.now(),pos:this.pos}
		this.predictedPos = {pos:this.pos}
		players[this.id] = this
	}
	update(delta) {
		if(this.id === selfId) return
 		const time =  delta * 15
		if (delta >= 1 / 15 ) {
			this.pos = this.serverState.pos
			this.lastState.pos = this.serverState.pos
			return
		}
		this.lastState.pos.x = lerp(this.lastState.pos.x, this.serverState.pos.x, time)
		this.lastState.pos.y = lerp(this.lastState.pos.y, this.serverState.pos.y, time)
		this.pos.x = lerp(this.pos.x, this.lastState.pos.x, time)
		this.pos.y = lerp(this.pos.y, this.lastState.pos.y, time)
	}
	draw() {
		const [x, y] = [
			Math.round(this.pos.x - players[selfId].pos.x + canvas.width / 2),
			Math.round(this.pos.y - players[selfId].pos.y + canvas.height / 2)
		]
		ctx.fillStyle = PLAYER_COLOR
		// ctx.shadowBlur = 0;
		ctx.beginPath()
		ctx.arc(x, y, this.radius, 0, Math.PI * 2)
		ctx.fill()
		ctx.fillStyle = 'red'
		/*	ctx.beginPath()
		const [serverX, serverY] = [
			Math.round(this.serverState.pos.x - players[selfId].pos.x + canvas.width / 2),
			Math.round(this.serverState.pos.y - players[selfId].pos.y + canvas.height / 2)
		]
		ctx.arc(serverX, serverY, this.radius, 0, Math.PI * 2)
		ctx.fill()*/
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
			ctx.font = '20px Verdana, Geneva, sans-serif'
			ctx.fillStyle = `rgb(50, 50, 50, ${this.chatTime / 3})`
			// ctx.shadowColor = "white";
			// ctx.shadowBlur = 10;
			const width = ctx.measureText(this.chatMsg).width
			ctx.fillRect(
				Math.round(x - width / 2 - 3),
				Math.round(y - 67),
				Math.round((width * 2) / 2 + 6),
				30
			)
			ctx.fillStyle = `rgb(200, 200, 200, ${this.chatTime / 3})`
			ctx.fillText(this.chatMsg, x, Math.round(y - this.radius - 15))
		}
	}
}
function resize() {
	let winw = window.innerWidth
	let winh = window.innerHeight
	let xvalue = winw / canvas.width
	let yvalue = winh / canvas.height
	scale = Math.min(xvalue, yvalue)
	canvas.style.transform = 'scale(' + scale + ')'
	canvas.style.left = (winw - canvas.width) / 2 + 'px'
	canvas.style.top = (winh - canvas.height) / 2 + 'px'
}
resize()
window.addEventListener('resize', resize)
window.requestAnimationFrame(render)
ws.onopen = () => {
	const payload = {
		type: 'join'
	}
	ws.send(JSON.stringify(payload))
	window.addEventListener('keydown', trackKeys)
	window.addEventListener('keyup', trackKeys)
	document.getElementById('loading').style.display = 'none'
	canvas.addEventListener('mousemove', (e) => {
		let t = canvas.getBoundingClientRect()
		mouse.x = Math.round((e.pageX - t.left) / scale)
		mouse.y = Math.round((e.pageY - t.top) / scale)
	})
	game.style.backgroundColor = 'black'
}
setInterval(() => {
	byteDisplay = bytes / 1000
	bytes = 0
}, 1000)
ws.addEventListener('message', (datas) => {
	const msg = msgpack.decode(new Uint8Array(datas.data))
	bytes += datas.data.byteLength
	if(msg.initPack) console.log(msg)
 	if (msg.selfId) {
		selfId = msg.selfId
	}
	if (msg.arena) {
	  arena = msg.arena
	}
	if (msg.lavaColor) {
	  lavaColor = msg.lavaColor
	}
	if(msg.initPack && msg.initPack.length > 0) {
		for(let data of msg.initPack) {
			new Player(data)
		}
	}
	if(selfId && players[selfId]) {
		//update code
		if(msg.newData) {
			for(let data of msg.newData) {
				const player = players[data.id]
				if (player) {
		          if (data.pos !== undefined) {
		          	player.lastState = player.serverState
		          	player.serverState.pos = data.pos
		          	player.serverState.time = window.performance.now()
		          }
		          if (data.chatTime !== undefined) {
		            player.chatTime = data.chatTime
		          }
		          if (data.chatMsg !== undefined) {
		            player.chatMsg = data.chatMsg
		          }
		           if (data.maxSpd !== undefined) {
		            player.maxSpd = data.maxSpd
		          }
		           if (data.vel !== undefined) {
		            player.vel = data.vel
		          }
		        }
			}
		}
	}
	if(msg.removePack && msg.removePack.length > 0) {
		for(let data of msg.removePack) {
			delete players[data]
		}
	}})
function trackKeys(event) {
	if(!selfId || !players[selfId]) return
	const index = [
		[87, 38],
		[83, 40],
		[65, 37],
		[68, 39]
	].findIndex((e) => e.includes(event.keyCode))
	/*
  37 left
  38 up
  39 right
  40 down
  */
	if (index > -1) {
		keys[index] = event.type === 'keydown'
	}
	if (event.keyCode === 13) enterPressed = event.type === 'keydown'
}
function drawMap() {
	ctx.fillStyle = 'rgb(40,40,40)'
	ctx.fillRect(0,0,canvas.width,canvas.height)
	const x = Math.round(canvas.width / 2 - players[selfId].pos.x)
	const y = Math.round(canvas.height / 2 - players[selfId].pos.y)
	ctx.fillStyle = 'rgb(210,210,210)'
	ctx.roundRect(x, y, arena.x, arena.y, 10)
}
function renderChat() {
	if (enterPressed && !chatlock) {
		isChatting = !isChatting
		chatlock = true
	}
	if (!enterPressed) {
		chatlock = false
	}
	if (isChatting) {
		chatHolder.style.display = 'block'
		chatBox.focus()
		chatBox.setAttribute('maxlength', 120)
	} else {
		if (chatBox.value !== '' && chatBox.value !== '/') {
			const payLoad = {
				type: 'chat',
				value: chatBox.value
			}
			ws.send(JSON.stringify(payLoad))
		}
		chatHolder.style.display = 'none'
		chatBox.value = ''
		chatBox.setAttribute('maxlength', 45)
	}
}
function renderLava() {
	const [x, y] = [
		Math.round(arena.x / 2 - 200 - players[selfId].pos.x + canvas.width / 2),
		Math.round(arena.y / 2 - 200 - players[selfId].pos.y + canvas.height / 2)
	]
	ctx.fillStyle = `rgb(${lavaColor},124,37)`
	ctx.fillRect(x, y, 400, 400)
}
function renderMinimap(player) {
	ctx.fillStyle = PLAYER_COLOR
	ctx.beginPath()
	ctx.arc(
		Math.round(55 + (player.pos.x / arena.x) * 195),
		Math.round(655 + (player.pos.y / arena.y) * 195),
		4,
		0,
		Math.PI * 2
	)
	ctx.fill()
}
let lastTime = window.performance.now()
function render() {
	window.requestAnimationFrame(render)
	tick++
	if (!selfId || !players[selfId]) return
	renderChat()
	drawMap()
	renderLava()
	const delta = (window.performance.now() - lastTime) / 1000
	lastTime = window.performance.now()
	ctx.fillStyle = 'rgb(60, 60, 60, 0.8)'
	ctx.roundRect(50, 650, 200, 200, 10)
	const expectedTick = (window.performance.now() - start) / 60
	if(!isChatting)simulatePlayer({player:players[selfId],arena}, keys)
	while(tick < expectedTick) {
		if(!isChatting)simulatePlayer(players[selfId], keys)
		tick++
	}
	for (let i in players) {
		const player = players[i]
		player.update(delta)
		renderMinimap(player)
		player.draw()
	}
	ctx.fillStyle = 'black'
	ctx.font = '30px Arial'
	ctx.fillText(`${byteDisplay} kbps`, 1500, 800)
	if (!isChatting) {
		const payload = {
			type: 'keyUpdate',
			keys: keys
		}
		ws.send(JSON.stringify(payload))
	}
}
function lerp(a, b, t){
	return (1 - t) * a + t * b
}
