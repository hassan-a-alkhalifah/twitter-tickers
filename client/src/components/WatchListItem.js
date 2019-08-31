import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WatchListItem = ({ tickerName, noOfTweets, onTickerSwitch, onRemoveTerm, currentTicker }) => {
    
    
    const WatchListItemFocusStyles = {
        'color': tickerName === currentTicker && '#000'
    };

    return (
        <div className='WatchListItem' onClick={() => { onTickerSwitch(tickerName) }}>
            <div className='trash' onClick={() => { onRemoveTerm(tickerName) }}>
                <FontAwesomeIcon icon='times' />
            </div>
            <p style={WatchListItemFocusStyles}>{tickerName}</p>
            <p style={WatchListItemFocusStyles}>{noOfTweets}</p>
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