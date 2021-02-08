'use strict';

const express = require('express');
const WebSocket = require('ws');
const app = express();
const wss = new WebSocket.Server({ noServer: true });
const gameServer = app.listen(process.env.PORT || 8080, () => console.log('Server running at port 8080'));
const path = require('path');
const Server = require('./util/server');
const server = new Server({ updateRate: 60, sendRate: 100, arenaSize: 2000 });

app.use(express.static('dist'));

app.use(express.static('shared'));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/dist/index.html'));
});

gameServer.on('upgrade', (request, socket, head) => {
   wss.handleUpgrade(request, socket, head, (socket) => {
      wss.emit('connection', socket, request);
   });
});

wss.on('connection', (ws) => {
   const clientId = server.uniqueId();

   ws.on('message', (msg) => {
      server.handle({ data: JSON.parse(msg), id: clientId, ws });
   });

   ws.on('close', () => {
      server.clientLeave(clientId);
   });
});
