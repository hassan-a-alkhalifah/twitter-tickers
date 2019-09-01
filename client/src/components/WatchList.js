import React from 'react';
import PropTypes from 'prop-types';
import './WatchList.css';
import WatchListItem from './WatchListItem';

const WatchList = ({ savedTickerTweets, onTickerSwitch, onRemoveTerm, currentTicker }) => {
    return (
        <div>
            {Object.keys(savedTickerTweets).length > 0
            ?   <div className='WatchList'>
                    <p>Watchlist</p>
                    <div>
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
                </div>
            :   null}
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