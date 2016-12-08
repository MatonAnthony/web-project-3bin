import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PrincipalPanel from './PrincipalPanel';

import './index.css';

let isLogged = false;
if(isLogged) {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
} else {
    ReactDOM.render(
        <PrincipalPanel/>,
        document.getElementById('root')
    );
}
