import React from 'react';
import PropTypes from 'prop-types';
import './TweetList.css';
import TweetCard from './TweetCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TweetList = ({ currentTickerList, savedTickerTweets }) => {
        let tweetCards = 
        <div>
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

        const noTweetsMsg =
        <div className='noTweetsMsg'>
            <FontAwesomeIcon icon='search' />
            <p>Your search results will appear here.</p>
        </div>;

        return(
            <div className='TweetList'>
                <div>
                    {Object.keys(savedTickerTweets).length > 0 ? tweetCards : noTweetsMsg}
                </div>
            </div>
        );
};

TweetList.propTypes = {
    currentTickerList: PropTypes.array,
    savedTickerTweets: PropTypes.object
};

export default TweetList;