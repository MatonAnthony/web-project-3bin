import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Ticket from './Ticket';
import './index.css';

let isLogged = false;
if(isLogged) {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
} else {
    let list = [];
    list.push({productName: 'Moules', price: '12'});
    list.push({productName: 'Frites', price: '5'});
    list.push({productName: 'Mayo', price: '2'});

    ReactDOM.render(
        <Ticket ticketList={list}/>,
        document.getElementById('root')
    );
}
