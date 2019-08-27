const httpRequestHandler = require('../utils/httpRequestHandler');

const updateTickerTweets = async (term, tweetId, noOfTweetsToSearch) => {
    let filteredTweetsList = [];
    try {
        const data = await httpRequestHandler.getUpdatedTweets(term, noOfTweetsToSearch);
        const updatedTweetsList = data.data.statuses;
        for(let i = 0; i < updatedTweetsList.length; i++) {
            if(updatedTweetsList[i].id === tweetId) {
                return;
            };
            filteredTweetsList.push(updatedTweetsList[i]);
        }
        return filteredTweetsList;
    } catch(error) {
        console.log(error.message);
    }
};

module.exports = updateTickerTweets;