import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CategoryPanel from './CategoryPanel';

import './index.css';

let isLogged = false;
if(isLogged) {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
} else {
    ReactDOM.render(
        <CategoryPanel/>,
        document.getElementById('root')
    );
}
