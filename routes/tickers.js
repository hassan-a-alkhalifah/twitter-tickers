const tickerService = require('../service/tickerService');
const updateTickerTweets = require('../service/updateTickerTweets');
const httpRequestHandler = require('../utils/httpRequestHandler');

module.exports = (app, io) => {
    let socketConnection;
    let termObjList = {};
    let tickerTweetsInterval;
    let bearerToken;

    app.post('/searchTerm', async (req, res) => {
        const term = req.body.term;
        stopTickerTweetsInterval();
        try {
            const newTweetsList = await tickerService(term, 20, bearerToken);
            termObjList = {...termObjList, [`${term}`]: newTweetsList[0].id};
            await sendMessage(term, newTweetsList);
            updateTickerTweetsInterval();
            res.json({ msg: newTweetsList });
        } catch(error) {
            console.error('Failed to retrieve new tweets', error.message);
        }
    });

    app.post('/removeSearchTerm', (req, res) => {
        const term= req.body.term;
        let updatedTermObjList = {};

        Object.keys(termObjList).forEach((tickerTerm) => {
          if(tickerTerm !== term) {
            updatedTermObjList = {...updatedTermObjList, [`${tickerTerm}`]:termObjList[tickerTerm]};
          };
        });
        stopTickerTweetsInterval()
        termObjList = updatedTermObjList
        res.json({ msg :'ticker deleted successfully' });
    });

    app.post('/startTickerTweetsInterval', (req, res) => {
        updateTickerTweetsInterval();
        res.json({ msg: 'interval started' });
    });

    io.on('connection', async socket => {
        try {
            if(bearerToken === undefined) {
                const bearerTokenData = await httpRequestHandler.getBearerToken();
                bearerToken = bearerTokenData.data.access_token;
            }
        } catch(error) {
            console.log(error.message);
        }
        socketConnection = socket;
        socket.on('connection', () => console.log('Client connected'));
        socket.on('disconnect', reason => console.log('Client disconnected', reason));
    });

    const updateTickerTweetsInterval = () => {
        if(tickerTweetsInterval === undefined) {
            tickerTweetsInterval = setInterval(() => {
                Object.keys(termObjList).forEach(async term => {
                    let tweetId = termObjList[term];
                    try {
                        let updatedTickerTweetsList = await updateTickerTweets(term, tweetId, 1, bearerToken);
                        if(updatedTickerTweetsList != undefined) {
                            termObjList = {...termObjList, [`${term}`]: updatedTickerTweetsList[0].id};
                            await sendMessage(term, updatedTickerTweetsList);
                        }
                    } catch(error) {
                        console.log('Unable to retrieve updated ticker tweets list', error.message);
                    }
                });
            }, 5000);
        }
    };

    const stopTickerTweetsInterval = () => {
        if(tickerTweetsInterval !== undefined) {
            clearInterval(tickerTweetsInterval);
            tickerTweetsInterval = undefined;
        };
    };

    const sendMessage = (term, newTweetsList) => {
        const data = {
            term: term,
            newTweetsList: newTweetsList
        }
        socketConnection.emit('tweets', data);
    };
}