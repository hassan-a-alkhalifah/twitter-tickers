const express = require('express');
const router = express.Router();
const tickerService = require('../service/tickerService');

router.get('/', async (req, res) => {
    try {
        const bearerToken = await tickerService();
        res.json(bearerToken);
    } catch(error) {
        console.error('Failed to retrieve requested ticker', error.message);
    }
});

module.exports = router;