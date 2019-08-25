const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();
require('dotenv').config({ path: '../../.env' });
app.use(bodyParser.json());

const health = require('./routes/health');
app.use('/health', health);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});