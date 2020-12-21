'use strict';

require('./style.css');

const Client = require('./util/client');

const client = new Client();

client.applyEventListeners();

client.on('message', (data) => {
   client.addMessage(data);
});
