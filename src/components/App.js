import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import WatchList from './WatchList';
import TweetList from './TweetList';
import WindowSizeListener from 'react-window-size-listener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: '',
      currentTicker: '',
      savedTickerTweets: {},
      searchInputDisplayed: false
    };
  };

  handleInputChange = event => {
    this.setState({
      inputField: event.target.value
    });
  };

  handleEnterKeyPress = event => {
    if(event.key === 'Enter') {
      const term = this.state.inputField;
      if(!this.state.savedTickerTweets.hasOwnProperty(term)) {
        console.log(`Term: ${term} added`);
        const updatedSavedTickerTweets = {...this.state.savedTickerTweets, [`${term}`]: []};
        this.setState({
          currentTicker: term,
          savedTickerTweets: updatedSavedTickerTweets
        }, () => {
          this.handleSearchTerm(term);
        });
      };
    };
  };

  handleSearchTerm = term => {
    fetch('/searchTerm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ term })
    });
  };

  handleRemoveTerm = term => {
    fetch('/removeSearchTerm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ term })
    });
  };

  handleTickerSwitch = term => {
    console.log(term);
    this.setState({
      currentTicker: term
    });
  }; /// FIX

  handleSearchInputDisplay = () => {
    this.setState({
      searchInputDisplayed: this.state.searchInputDisplayed ? false : true
    });
  };

  componentDidMount() {
    const socket = socketIOClient('http://localhost:3000/');

    socket.on('connect', () => {
        console.log('Socket connected');
        socket.on('tweets', data => {
            const term = data.term;
            const newTweetsList = data.newTweetsList;
            const updatedCurrentTickerList = newTweetsList.concat(this.state.savedTickerTweets[term]);
            const updatedSavedTickerTweets = {...this.state.savedTickerTweets, [`${term}`]: updatedCurrentTickerList};
            this.setState({
              savedTickerTweets: updatedSavedTickerTweets
            });
        });
    });
    socket.on('disconnect', () => {
        socket.off('tweets');
        socket.removeAllListeners('tweets');
        console.log('Socket disconnected');
    });
  };

  render() {
    let searchControls =
    <div className='search-input'>
        <input 
            id='search'
            type='text'
            value={this.state.inputField}
            onKeyPress={this.handleEnterKeyPress}
            onChange={ this.handleInputChange }
        />
        <FontAwesomeIcon icon='search' />
    </div>;

    return (
      <div className="App">
        <WindowSizeListener 
            onResize={windowSize => {
                if (windowSize.windowWidth >= 760 && this.state.searchInputDisplayed === true) {
                    this.setState({
                        searchInputDisplayed: false
                    });
                }
            }}
        />
        <div className='header'>
            <div className='title-container'>
                <p>Twitter Tickers</p>
                <div className='search' onClick={ this.handleSearchInputDisplay }>
                    {this.state.searchInputDisplayed 
                        ? <FontAwesomeIcon icon='times' />
                        : <FontAwesomeIcon icon='search' />}
                </div>
            </div>
            <div className='search-input-none-mobile'>
                {searchControls}
            </div>
            {this.state.searchInputDisplayed
            ?   <div className='search-input-mobile'>
                    {searchControls}
                    <WatchList
                      savedTickerTweets={this.state.savedTickerTweets}
                      onTickerSwitch={this.handleTickerSwitch}
                    />
                </div>
            :   null}
        </div>
        <div className='body'>
            <WatchList
              savedTickerTweets={this.state.savedTickerTweets}
              onTickerSwitch={this.handleTickerSwitch}
            />
            <TweetList 
              currentTickerList={this.state.savedTickerTweets[this.state.currentTicker]}
              savedTickerTweets={this.state.savedTickerTweets}
            />
        </div>
      </div>
    );
  };
}

export default App;
