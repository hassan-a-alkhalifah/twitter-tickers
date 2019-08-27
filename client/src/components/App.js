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
      const terms = this.state.inputField;
      const termsArry = terms.split(",").map(item => item.trim());
      let updatedSavedTickerTweets = this.state.savedTickerTweets;
      termsArry.forEach(async term => {
        try {
          if(!this.state.savedTickerTweets.hasOwnProperty(term) && term !== "") {
            updatedSavedTickerTweets = {...updatedSavedTickerTweets, [`${term}`]: []};
            await this.handleSearchTerm(term);
          };
        } catch(error) {
          console.log('Failed to handle search term', error.message);
        }
      });
      this.setState({
        currentTicker: Object.keys(updatedSavedTickerTweets)[0],
        savedTickerTweets: updatedSavedTickerTweets,
        inputField: ''
      });
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
    })
      .then(res => res.json())
      .then(data => {
        if(data.msg === 'ticker deleted successfully') {
          const savedTickerTweets = this.state.savedTickerTweets;
          let updatedSavedTickerTweets = {};
          Object.keys(savedTickerTweets).forEach((tickerTerm) => {
            if(tickerTerm !== term) {
              updatedSavedTickerTweets = {...updatedSavedTickerTweets, [`${tickerTerm}`]:this.state.savedTickerTweets[tickerTerm]};
            };
          });
          this.setState({
            savedTickerTweets: updatedSavedTickerTweets,
            currentTicker: Object.keys(updatedSavedTickerTweets).length > 0 ? Object.keys(updatedSavedTickerTweets)[0] : ''
          }, () => {
            if(Object.keys(this.state.savedTickerTweets).length > 0) {
              this.handleStartTickerTweetsInterval();
            }
          });
        }
      });
  };

  handleTickerSwitch = term => {
    if(term !== this.state.currentTicker) {
      this.setState({
        currentTicker: term
      });
    }
  };

  handleSearchInputDisplay = () => {
    this.setState({
      searchInputDisplayed: this.state.searchInputDisplayed ? false : true
    });
  };

  handleStartTickerTweetsInterval = () => {
    fetch('/startTickerTweetsInterval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };

  componentDidMount() {
    // const socket = socketIOClient('http://localhost:3000/');
    const socket = socketIOClient();
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
    socket.on('disconnect', reason => {
        socket.off('tweets');
        socket.removeAllListeners('tweets');
        console.log('Socket disconnected', reason);
    });
  };

  render() {
    let searchControls =
    <div className='search-input'>
        <input 
            id='search'
            type='text'
            placeholder='Symbol or Symbol,Symbol for multiple'
            value={this.state.inputField}
            onKeyPress={this.handleEnterKeyPress}
            onChange={ this.handleInputChange }
            required
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
                      onRemoveTerm={this.handleRemoveTerm}
                      currentTicker={this.state.currentTicker}
                    />
                </div>
            :   null}
        </div>
        <div className='body'>
            <WatchList
              savedTickerTweets={this.state.savedTickerTweets}
              onTickerSwitch={this.handleTickerSwitch}
              onRemoveTerm={this.handleRemoveTerm}
              currentTicker={this.state.currentTicker}
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
