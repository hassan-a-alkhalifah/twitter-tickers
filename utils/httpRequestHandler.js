const axios = require('axios');
const qs = require('querystring');
const aws = require('aws-sdk');
let s3 = new aws.S3({
    oath2TokenUrl: process.env.OAUTH2_TOKEN_URL,
    twitterSearchBaseUrl: process.env.TWITTER_SEARCH_BASE_URL,
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET
});

module.exports = {
    getBearerToken: () => {
        const url = s3.config.oath2TokenUrl;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(s3.config.consumerKey + ':' + s3.config.consumerSecret).toString('base64')}`
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
    getUpdatedTweets: (term, noOfTweetsToSearch, bearerToken) => {
        const url = `${s3.config.twitterSearchBaseUrl}q=${term}&count=${noOfTweetsToSearch}&result_type=recent`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        };
        return axios({
            method: 'get',
            url: url,
            headers: headers,
            withCredentials: true
        });
    }
};