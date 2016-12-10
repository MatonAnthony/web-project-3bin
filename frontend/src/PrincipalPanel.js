import React from 'react';
import './PrincipalPanel.css';
import CategoryPanel from './CategoryPanel';
import Ticket from './Ticket';
import Menubar from './Menubar';
import Auth from './Auth';
import Login from './Login';

const PrincipalPanel = React.createClass({
    /*TODO retrieve categories and create buttons fom them*/
    getInitialState() {
        return ({
            isLogged: Auth.isUserAuthenticated(),
        });
    },

    loggedOutCallback() {
        this.setState({isLogged: Auth.isUserAuthenticated()});
    },

    render() {
        let list = [];
        list.push({name: 'Moules', price: '1.5'});
        list.push({name: 'Frites', price: '1250'});
        
        if(this.state.isLogged) {
        return (
            <div>
                <Menubar callback={this.loggedOutCallback.bind(this)}/>
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
        } else {
            return (
                <Login/>
            );
        }
    },
});

export default PrincipalPanel;
