import React from 'react';
import PropTypes from 'prop-types';
import './TweetList.css';
import TweetCard from './TweetCard';

const TweetList = ({ currentTickerList, savedTickerTweets }) => {
        let tweetCards = 
        <div>
            <p>Watchlist</p>
            {Object.keys(savedTickerTweets).length > 0
                ? currentTickerList.map((tweetData, index) => {
                return <TweetCard 
                    key={index}
                    tweetData={tweetData}
                />
            })
                : null
            }
        </div>;

        return(
            <div className='TweetList'>
                <div>
                    {Object.keys(savedTickerTweets).length > 0 ? tweetCards : null}
                </div>
            </div>
        );
};

TweetList.propTypes = {
    currentTickerList: PropTypes.array,
    savedTickerTweets: PropTypes.object
};

export default TweetList;