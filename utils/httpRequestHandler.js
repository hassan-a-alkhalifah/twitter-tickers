const axios = require('axios');
const qs = require('querystring');

module.exports = {
    getBearerToken: () => {
        const url = process.env.OAUTH2_TOKEN_URL;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(process.env.CONSUMER_KEY + ':' + process.env.CONSUMER_SECRET).toString('base64')}`
        };
        const data = qs.stringify({ grant_type: 'client_credentials' });
        return axios({
            method: 'post',
            url: url,
            headers: headers,
            data: data,
            withCredentials: true
        });
    },
    getUpdatedTweets: (term, noOfTweetsToSearch) => {
        const url = `${process.env.TWITTER_SEARCH_BASE_URL}q=${term}&count=${noOfTweetsToSearch}&result_type=recent`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
        };
        return axios({
            method: 'get',
            url: url,
            headers: headers,
            withCredentials: true
        });
    }
};