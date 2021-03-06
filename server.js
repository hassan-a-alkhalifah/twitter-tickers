const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();
require('dotenv').config();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

const server = http.createServer(app);
const io = socketio(server);

require('./routes/tickers')(app, io);
const health = require('./routes/health');
app.use('/health', health);

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});