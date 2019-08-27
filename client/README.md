## Twitter Tickers

#### A Twitter stock ticker search application

### By _Hassan Al-khalifah_

##

The Twitter Tickers is a application that allows the user search Twitter for tweets regarding a stock(s) ticker(symbol) entered in the search bar. Each ticker searched for will be saved and displayed in a watch list. This watch list will display each saved ticker and the associated number of tweets returned. When a ticker is selected from the watch list, a list of the associated tweets will be displayed. This tweet list will automatically update when a new tweet is posted. The user will also have the ability to remove any ticker from the watch list.

## Setup Instructions

* Open terminal
* Make sure you are in the Desktop directory
```
~ $ cd desktop
```
* Clone the repo
```
~/Desktop $ git clone [REPO URL]
```
* Navigate into root directory of cloned REPO
```
~/Desktop $ cd directory-name
```
* Run npm install in terminal to install all required dependencies
```
~/Desktop/directory-name $ npm install
```
* As the application utilizes Twitter APIs, a consumer key and secret are required. You will need a Twitter account and an approved Twitter app created to retrieve both.
* If you do not have a Twitter account, go to https://twitter.com/i/flow/signup to signup.
* Once your account is created, go to https://developer.twitter.com/en/apps to create a new Twitter app.
    * Click the 'Create an app' button and follow the instructions. You should then have access to a consumer key and secret.
* Back in your terminal, create a .env file in the project root directory.
```
~/Desktop/directory-name $ touch .env
```
* Inside the .env file, you will need to add the following:
```
OAUTH2_TOKEN_URL=https://api.twitter.com/oauth2/token
TWITTER_SEARCH_BASE_URL=https://api.twitter.com/1.1/search/tweets.json?

CONSUMER_KEY=your Twitter app consumer key
CONSUMER_SECRET=your Twitter app consumer secret
BEARER_TOKEN=
```
* Run npm run start in terminal to run the backend and client servers. The application can be viewed at http://localhost:3000
```
~/Desktop/directory-name $ npm run start
```

## Resources Used

* [Socket.io](https://socket.io/) event emitter for client side and server side communication
* [Font Awesome](https://fontawesome.com/) for SVGs

## Technologies Used

* Javascript
* CSS3
* JSX
* React
* prop-types
* Node.js
* npm
* Express.js