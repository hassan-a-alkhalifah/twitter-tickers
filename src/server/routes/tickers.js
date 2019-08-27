const tickerService = require('../service/tickerService');
const updateTickerTweets = require('../service/updateTickerTweets');

module.exports = (app, io) => {
    let socketConnection;
    let termObjList = {};
    let updateTickerTweetsInterval;

    app.post('/searchTerm', async (req, res) => {
        const term = req.body.term;
        try {
            const newTweetsList = await tickerService(term, 20);
            termObjList = {...termObjList, [`${term}`]: newTweetsList[0].id};
            await sendMessage(term, newTweetsList);
            if(updateTickerTweetsInterval === undefined) {
                updateTickerTweetsInterval = setInterval(() => {
                    Object.keys(termObjList).map(async term => {
                        let tweetId = termObjList[term];
                        try {
                            let updatedTickerTweetsList = await updateTickerTweets(term, tweetId, 1);
                            if(updatedTickerTweetsList !== undefined) {
                                termObjList = {...termObjList, [`${term}`]: updatedTickerTweetsList[0].id};
                                await sendMessage(term, updatedTickerTweetsList);
                            }
                        } catch(error) {
                            console.log('Unable to retrieve updated ticker tweets list', error.message);
                        }
                    });
                }, 5000);
            }
        } catch(error) {
            console.error('Failed to retrieve new tweets', error.message);
        }
    });

    app.post('/removeSearchTerm', (req, res) => {
        const term= req.body.term;

    });

    io.on('connection', socket => {
        socketConnection = socket;

        socket.on('connection', () => console.log('Client connected'));
        socket.on('disconnect', reason => console.log('Client disconnected', reason));
    });

    const sendMessage = (term, newTweetsList) => {
        const data = {
            term: term,
            newTweetsList: newTweetsList
        }
        socketConnection.emit('tweets', data);
    }; ///////// MAKE THIS A SERVICE
}