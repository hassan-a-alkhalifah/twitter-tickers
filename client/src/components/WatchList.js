import React from 'react';
import PropTypes from 'prop-types';
import './WatchList.css';
import WatchListItem from './WatchListItem';

const WatchList = ({ savedTickerTweets, onTickerSwitch, onRemoveTerm, currentTicker }) => {
    return (
        <div className='WatchList'>
            <p>Watchlist</p>
            {Object.keys(savedTickerTweets).map((ticker, index) => 
                <WatchListItem 
                    key={index}
                    tickerName={ticker}
                    noOfTweets={savedTickerTweets[ticker].length}
                    onTickerSwitch={onTickerSwitch}
                    onRemoveTerm={onRemoveTerm}
                    currentTicker={currentTicker}
                />
            )}
        </div>
    );
};

WatchList.propTypes = {
    savedTickerTweets: PropTypes.object,
    onTickerSwitch: PropTypes.func,
    onRemoveTerm: PropTypes.func,
    currentTicker: PropTypes.string
};

export default WatchList;