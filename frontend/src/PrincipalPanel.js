import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './PrincipalPanel.css';
import CategoryPanel from './CategoryPanel';
import Ticket from './Ticket';
import Menubar from './Menubar';


const PrincipalPanel = React.createClass({
    getInitialState() {
        return {};
    },

    propTypes: {},

    clearList() {
    },
    /*TODO retrieve categories and create buttons fom them*/

    render() {
        let list = [];
        list.push({productName: 'Moules', price: '12.5'});
        list.push({productName: 'Bananes', price: '1.25'});
        list.push({productName: 'Frites', price: '3'});
        return (
            <div>
                <Menubar/>
                <Ticket className='col-xs-6 col-md-4' 
                    ticketList={list} />

                <div className='col-xs-12 col-sm-6 col-md-8'>
                    <CategoryPanel name='Moules'/>
                    <CategoryPanel name='Bananes'/>
                    <CategoryPanel name='Frites'/>
                    <CategoryPanel name='Bièraubeurre'/>
                    <CategoryPanel name='Dragées'/>

                    <CategoryPanel name='Dragées'/>
                    <CategoryPanel name='Dragées'/>
                    <CategoryPanel name='Dragées'/>
                    <CategoryPanel name='Dragées'/>
                    <CategoryPanel name='Dragées'/>
                    <CategoryPanel name='Dragées'/>
                    <CategoryPanel name='Dragées'/>
                    <CategoryPanel name='Dragées'/>
                    <CategoryPanel name='Dragées'/>
                    <CategoryPanel name='Dragées'/>
                </div>
            </div>
        );
    },
});

export default PrincipalPanel;
