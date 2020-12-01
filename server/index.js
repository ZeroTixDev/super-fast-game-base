const express = require('express')
const WebSocket = require('ws')
const app = express()
const wss = new WebSocket.Server({noServer: true})
const server = app.listen(process.env.PORT || 4000, () => console.log('Server running at port 4000'))
const uuid = require('node-uuid')
const path = require('path')
const Player = require('./player')
const Vector = require('./vector')
const msgpack = require('msgpack-lite')
const clients = {}
const players = {}
const arena = new Vector(1000, 1000)
const sendRate = 20
const updateRate = 60
let lavaColor = 107
let lavaUp = true
let lavaDown = false
let initPack = []
let removePack = []
let sendPack = null
let tick = 0
const start = Date.now()
app.use(express.static('client'))
app.use(express.static('shared'))
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/client/index.html'))
})
app.get('/simulate', function(req, res) {
	res.sendFile(path.join(__dirname, '/client/index.html'))
})
server.on('upgrade', (request, socket, head) => {
	wss.handleUpgrade(request, socket, head, (socket) => {
		wss.emit('connection', socket, request)
	})
})
const idLength = 3

function getId() {
	let id = uuid.v4().slice(0, idLength)
	let done = false
	while (!done) {
		let hasId = false
		for (let i of Object.keys(players)) {
			if (i === id) hasId = true
		}
		done = !hasId
		if (!done) id = uuid.v4().slice(0, idLength)
	}
	return id
}
function gameUpdate() {
	tick++
	const expectedTick = Math.ceil((Date.now() - start) / updateRate)
	const playerArray = Object.entries({...players})
	//Player.collision({playerArray, players})
	let pack = Player.pack({players, arena})
	while(tick < expectedTick) {
		pack = Player.pack({players, arena})
		tick++
	}
	sendPack = pack
	if (lavaUp) lavaColor++
	if (lavaDown) lavaColor--
	if (lavaDown && lavaColor < 0) {
		lavaDown = false
		lavaUp = true
	}
	if (lavaUp && lavaColor > 255) {
		lavaUp = false
		lavaDown = true
	}
}
function updateGameState(clients, players) {
	if(!sendPack) return
	for (const i in clients) {
		const clientSocket = clients[i].ws
		if (clientSocket.readyState === WebSocket.OPEN) {
			const object = {lavaColor, newData: sendPack}
			if (initPack.length > 0) {
				object.initPack = [...initPack]
			}
			if (removePack.length > 0) {
				object.removePack = [...removePack]
			}
			clientSocket.send(
				msgpack.encode(object),
			)
		}
	}
	initPack = []
	removePack = []
}
wss.on('connection', (ws) => {
	const clientId = getId()
	let joined = false
	ws.on('message', (msg) => {
		try {
			const data = JSON.parse(msg)
			if (data.type === 'join') {
				if(joined) return
				joined = true
				clients[clientId] = {ws}
				players[clientId] = new Player(clientId)
				initPack.push(players[clientId].getInitPack())
				ws.send(msgpack.encode({
					selfId: clientId,
					initPack: [...Player.getAllInitPack(players)],
					arena,
				}))
			} else if (data.type === 'keyUpdate') {
				players[clientId].decodeKeys(data.keys)
			} else if (data.type === 'chat') {
				players[clientId].chatMsg = data.value
				players[clientId].chatTime = 5
			}
		} catch(err){}
	})
	ws.on('close', () => {
		delete clients[clientId]
		Player.onDisconnect({id: clientId, players, removePack})
	})
})
setInterval(() => {
	updateGameState(clients, players)
}, 1000 / sendRate)
setInterval(() => {
	gameUpdate()
}, 1000 / updateRate)