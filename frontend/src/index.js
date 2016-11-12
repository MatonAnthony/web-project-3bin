import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Register from './Register';
import './index.css';

let isLogged = true;
if(isLogged) {
    ReactDOM.render(
        <Login />,
        document.getElementById('root')
    );
} else {
    ReactDOM.render(
        <Register />,
        document.getElementById('root')
    );
}
