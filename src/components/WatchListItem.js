import React from 'react';
import PropTypes from 'prop-types';

const WatchListItem = ({ tickerName, noOfTweets, onTickerSwitch }) => {
    return (
        <div className='WatchListItem'>
            <p onClick={() => { onTickerSwitch(tickerName) }}>{tickerName}</p>
            <p>{noOfTweets}</p>
        </div>
    );
};

WatchListItem.propTypes = {
    tickerName: PropTypes.string,
    noOfTweets: PropTypes.number,
    onTickerSwitch: PropTypes.func
};

export default WatchListItem;