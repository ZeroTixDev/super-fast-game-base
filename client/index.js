'use strict';

require('./style.css');

const Client = require('./util/client');

const client = new Client();

client.applyEventListeners();

client.listen(
   'message',
   (data) => {
      client.addMessage(data);
   },
   client.ws
);
