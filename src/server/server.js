const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();
require('dotenv').config();
app.use(bodyParser.json());

const tickers = require('./routes/tickers');
const health = require('./routes/health');
app.use('/tickers', tickers);
app.use('/health', health);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});