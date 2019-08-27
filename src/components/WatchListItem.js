import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WatchListItem = ({ tickerName, noOfTweets, onTickerSwitch, onRemoveTerm }) => {
    return (
        <div className='WatchListItem' onClick={() => { onTickerSwitch(tickerName) }}>
            <div className='trash' onClick={() => { onRemoveTerm(tickerName) }}>
                <FontAwesomeIcon icon='trash' />
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
    onRemoveTerm: PropTypes.func
};

export default WatchListItem;