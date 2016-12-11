import React from 'react';
import './PrincipalPanel.css';
import CategoryPanel from './CategoryPanel';
import Ticket from './Ticket';
import Menubar from './Menubar';
import Auth from './Auth';
import Login from './Login';
import {Col, Grid, Row} from 'react-bootstrap';

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
        list.push({productName: 'Moules', price: '1.5'});
        list.push({productName: 'Frites', price: '1250'});
        
        if(this.state.isLogged) {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col md={12} xs={12}>
                            <Menubar
                                callback={this.loggedOutCallback.bind(this)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} xs={12}>
                            <Ticket
                                ticketList={list} />
                        </Col>
                        <Col md={8} xs={12}>
                            <div >
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
                        </Col>
                    </Row>
                </Grid>
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
