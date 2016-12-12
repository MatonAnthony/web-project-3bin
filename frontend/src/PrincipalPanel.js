import React from 'react';
import './PrincipalPanel.css';
import CategoryPanel from './CategoryPanel';
import Ticket from './Ticket';
import Menubar from './Menubar';
import Auth from './Auth';
import Login from './Login';
import SearchField from './SearchField';
import {Col, Grid, Row} from 'react-bootstrap';

const URL = 'http://localhost:3000';

const PrincipalPanel = React.createClass({
    /*TODO retrieve categories and create buttons fom them*/
    getInitialState() {
        this.newCart();
        return ({
            isLogged: Auth.isUserAuthenticated(),
            cartId: '',
        });
    },

    onNewProduct() {
        this.refs.ticket.loadProducts();
    },

    newCart() {
        fetch(URL + '/carts/new', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            mode: 'cors',
        }).then((response) => {
            let contentType = response.headers.get('content-type');
            if(contentType && contentType.indexOf('application/json') !== -1) {
                response.json().then((json) => {
                    if(response.ok) {
                        this.setState(
                            {
                                isLogged: Auth.isUserAuthenticated(),
                                cartId: json['cartId'],
                            });
                        this.refs.ticket.loadProducts();
                    } else {
                        console.log(json);
                    }
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    },

    loggedInCallback() {
        this.setState({isLogged: Auth.isUserAuthenticated()});
    },

    loggedOutCallback() {
        this.setState({isLogged: Auth.isUserAuthenticated()});
    },

    render() {
        if(this.state.isLogged) {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col >
                            <Menubar
                                callback={this.loggedOutCallback}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} xs={12}>
                            <SearchField cartId={this.state.cartId}
                                addProductCallback={this.onNewProduct}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} xs={12}>
                            <Ticket
                                ref='ticket'
                                cartId={this.state.cartId}
                                newCartCallBack={this.newCart}/>
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
                <Login callback={this.loggedInCallback}/>
            );
        }
    },
});

export default PrincipalPanel;
