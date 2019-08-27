import React from 'react';
import PropTypes from 'prop-types';
import './WatchList.css';
import WatchListItem from './WatchListItem';

const WatchList = ({ savedTickerTweets, onTickerSwitch, onRemoveTerm }) => {
    return (
        <div className='WatchList'>
            {Object.keys(savedTickerTweets).map((ticker, index) => 
                <WatchListItem 
                    key={index}
                    tickerName={ticker}
                    noOfTweets={savedTickerTweets[ticker].length}
                    onTickerSwitch={onTickerSwitch}
                    onRemoveTerm={onRemoveTerm}
                />
            )}
        </div>
    );
};

WatchList.propTypes = {
    savedTickerTweets: PropTypes.object,
    onTickerSwitch: PropTypes.func,
    onRemoveTerm: PropTypes.func
};

export default WatchList;