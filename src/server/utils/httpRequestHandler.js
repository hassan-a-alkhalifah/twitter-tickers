const axios = require('axios');
const qs = require('querystring');

module.exports = {
    getBearerToken: () => {
        const url = 'https://api.twitter.com/oauth2/token';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from('K3U48BZhJX7xlnuEoE6gTeooU:YVqVERrbYxXegkTrf5ME1qBvzzApMNyFDr8xfLwnM1YXKKREAT').toString('base64')}`
        };
        const data = qs.stringify({ grant_type: 'client_credentials' });
        return axios({
            method: 'post',
            url: url,
            headers: headers,
            data: data,
            withCredentials: true
        });
    }
};