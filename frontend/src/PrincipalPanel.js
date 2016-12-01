import React from 'react';
import './PrincipalPanel.css';
import CategoryPanel from './CategoryPanel';
import Ticket from './Ticket';
import Menubar from './Menubar';

const PrincipalPanel = React.createClass({
   getInitialState() {
       return {

       };
   },

    propTypes: {
    },

    clearList() {
    },

    render() {
        return(
            <div>
                <Menubar/>
                <div>
                    <CategoryPanel name="Légumes" />
                    <CategoryPanel name="Carottes" />
                    <CategoryPanel name="Fruits" />
                    <CategoryPanel name="Viandes" />
                    <CategoryPanel name="Poissons" />
                </div>,
                <Ticket/>
            </div>

        );
    },
});

export default PrincipalPanel;
