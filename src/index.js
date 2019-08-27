import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faTimes, faTrash);

ReactDOM.render(<App />, document.getElementById('root'));
