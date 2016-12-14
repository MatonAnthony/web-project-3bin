import React from 'react';
import './PrincipalPanel.css';
import CategoryPanel from './CategoryPanel';
import Ticket from './Ticket';
import Menubar from './Menubar';
import Auth from './Auth';
import Login from './Login';
import SearchField from './SearchField';
import {Col, Grid, Row} from 'react-bootstrap';
import Api from './Api';

const URL = Api.getUrl();

const PrincipalPanel = React.createClass({
    /*TODO retrieve categories and create buttons fom them*/
    getInitialState() {
        this.newCart();
        this.loadPreferredProducts();
        return ({
            preferredProducts: [],
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
        this.newCart();
    },

    loggedOutCallback() {
        this.setState({isLogged: Auth.isUserAuthenticated()});
    },

    loadPreferredProducts() {
        fetch(URL + '/products/preferred', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            mode: 'cors',
        }).then((response) => {
            let contentType = response.headers.get('content-type');
            if(contentType && contentType.indexOf('application/json') !== -1) {
                response.json().then((json) => {
                    if(response.ok) {
                       this.setState({
                            preferredProducts: json,
                       });
                    } else {
                        console.log(json);
                    }
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    },

    render() {
        if(this.state.isLogged) {
            let preferredList = [];
            if(this.state.preferredProducts.length) {
                this.state.preferredProducts.forEach((entry, index) => {
                    preferredList.push(<CategoryPanel name={entry.productName}
                               id={entry._id}
                               cartId={this.state.cartId}
                               addProductCallback={this.onNewProduct}
                               key={index}/>);
                });
            }

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
                                {preferredList}
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
