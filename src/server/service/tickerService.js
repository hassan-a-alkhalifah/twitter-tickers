const httpRequestHandler = require('../utils/httpRequestHandler');
const fse = require('fs-extra');
const envfile = require('envfile');
const sourcePath = '.env';

const tickerService = async term => {
    try {
        if(process.env.BEARER_TOKEN === undefined) {
            const bearerToken = await httpRequestHandler.getBearerToken();
            let parsedFile = envfile.parseFileSync(sourcePath);
            parsedFile.BEARER_TOKEN = bearerToken.data.access_token;
            fse.writeFileSync('./.env', envfile.stringifySync(parsedFile));
        }
        const data = await httpRequestHandler.getUpdatedTweets(term);
        return data.data.statuses;
    } catch(error) {
        console.error(error);
    }
};

module.exports = tickerService;