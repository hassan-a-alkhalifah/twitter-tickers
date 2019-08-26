const tickerService = require('../service/tickerService');

module.exports = (app, io) => {
    let socketConnection;

    app.post('/searchTerm', async (req, res) => {
        const term = req.body.term;
        try {
            const newTweetsList = await tickerService(term);
            sendMessage(term, newTweetsList);
            //res.json(newTweetsList);
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