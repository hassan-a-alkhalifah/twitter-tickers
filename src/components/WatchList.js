import React from 'react';
import PropTypes from 'prop-types';
import './WatchList.css';
import WatchListItem from './WatchListItem';

const WatchList = ({ savedTickerTweets, onTickerSwitch }) => {
    return (
        <div className='WatchList'>
            {Object.keys(savedTickerTweets).map((ticker, index) => 
                <WatchListItem 
                    key={index}
                    tickerName={ticker}
                    noOfTweets={savedTickerTweets[ticker].length}
                    onTickerSwitch={onTickerSwitch}
                />
            )}
        </div>
    );
};

WatchList.propTypes = {
    savedTickerTweets: PropTypes.object,
    onTickerSwitch: PropTypes.func
};

export default WatchList;