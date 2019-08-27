const httpRequestHandler = require('../utils/httpRequestHandler');

const updateTickerTweets = async (term, tweetId, noOfTweetsToSearch, bearerToken) => {
    let filteredTweetsList = [];
    try {
        const data = await httpRequestHandler.getUpdatedTweets(term, noOfTweetsToSearch, bearerToken);
        const updatedTweetsList = data.data.statuses;
        if(updatedTweetsList !== undefined) {
            for(let i = 0; i < updatedTweetsList.length; i++) {
                if(updatedTweetsList[i].id === tweetId) {
                    return;
                };
                filteredTweetsList.push(updatedTweetsList[i]);
            }
        }
        return filteredTweetsList;
    } catch(error) {
        console.log(error.message);
    }
};

module.exports = updateTickerTweets;