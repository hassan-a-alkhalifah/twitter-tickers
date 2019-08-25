const httpRequestHandler = require('../utils/httpRequestHandler');

const tickerService = async () => {
    try {
        const bearerToken = await httpRequestHandler.getBearerToken();
        return bearerToken.data;
    } catch(error) {
        console.error(error);
    }
};

module.exports = tickerService;