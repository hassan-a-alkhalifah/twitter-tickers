import React from 'react';
import PropTypes from 'prop-types';

const TweetCard = ({ tweetData }) => {
    return(
        <div className='TweetCard'>
            <img src={tweetData.user.profile_image_url} alt={tweetData.user.name}/>
            <div className='tweet-card-content'>
                <div className='content-user-name-timestamp'>
                <a href={`http://twitter.com/${tweetData.user.screen_name} target='_blank`}>{`@${tweetData.user.screen_name}`}</a>
                    <div className='timestamp'>
                        <p>{new Date(tweetData.created_at).toLocaleDateString()}</p>
                        <p>{new Date(tweetData.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
                <p className='content-msg'>{tweetData.text}</p>
            </div>
        </div>
    );
};

TweetCard.propTypes = {
    tweetData: PropTypes.object
};

export default TweetCard;