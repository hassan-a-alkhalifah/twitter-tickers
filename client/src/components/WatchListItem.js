import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WatchListItem = ({ tickerName, noOfTweets, onTickerSwitch, onRemoveTerm, currentTicker }) => {
    
    
    const WatchListItemStyles = {
        'backgroundColor': tickerName === currentTicker && '#F6F6F6'
    };

    return (
        <div className='WatchListItem' style={WatchListItemStyles} onClick={() => { onTickerSwitch(tickerName) }}>
            <div className='trash' onClick={() => { onRemoveTerm(tickerName) }}>
                <FontAwesomeIcon icon='times' />
            </div>
            <p>{tickerName}</p>
            <p>{noOfTweets}</p>
        </div>
    );
};

WatchListItem.propTypes = {
    tickerName: PropTypes.string,
    noOfTweets: PropTypes.number,
    onTickerSwitch: PropTypes.func,
    onRemoveTerm: PropTypes.func,
    currentTicker: PropTypes.string
};

export default WatchListItem;