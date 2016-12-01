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
        <div>
            <CategoryPanel name="Légumes" />
            <CategoryPanel name="Carottes" />
            <CategoryPanel name="Fruits" />
            <CategoryPanel name="Viandes" />
            <CategoryPanel name="Poissons" />
        </div>,
        document.getElementById('root')
    );
}
