import React from 'react';
import {Panel, Table, InputGroup, Button, FormGroup, FormControl,
     Modal} from 'react-bootstrap';
import TicketLine from './TicketLine';
import Api from './Api';
import './Ticket.css';

const URL = Api.getUrl();

const Ticket = React.createClass({

    getInitialState() {
        return {
            ticketList: [],
            showModal: false,
            totalPrice: 0,
            priceList: [],
        };
    },

    propTypes: {
        newCartCallBack: React.PropTypes.func.isRequired,
        cartId: React.PropTypes.string.isRequired,
    },

    changeLinePrice(productId, total) {
        let tempList = this.state.priceList;
        let tempTotal = 0;
        tempList[productId] = total;

        for (let key in tempList) {
            if ({}.hasOwnProperty.call(tempList, key)) {
                tempTotal += tempList[key];
            }
        }

        this.setState({
            totalPrice: tempTotal,
            priceList: tempList,
        });
    },

    loadProducts() {
        fetch(URL + '/carts/' + this.props.cartId + '/complete', {
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
                        if (json.length >= 1) {
                            let listTemp = [];

                            json.forEach((entry) => {
                                listTemp.push(entry[0]);
                            });
                            this.setState({
                                ticketList: listTemp,
                            });
                        }else{
                            this.setState({
                                ticketList: [],
                            });
                        }
                    }
                });
            }
        });
    },

    openEditor() {
        if(this.state.totalPrice !== 0) {
            this.setState({
                showModal: true,
            });
        }
    },

    closeEditor() {
        let moneyReceived = document.getElementById('moneyReceivedInput');
        let change = moneyReceived.value - this.state.totalPrice;
        let tempTotal = this.state.totalPrice;
        if(change < 0) {
            change = 0;
        }
        let body = {
            amount: this.state.totalPrice,
            moneyReceived: moneyReceived.value,
            change: change,
        };
        body = JSON.stringify(body);
        fetch(URL + '/payments/new', {
            method: 'POST',
            body: body,
            headers: {
                'content-type': 'application/json',
            },
            mode: 'cors',
        }).then((response) => {
            let contentType = response.headers.get('content-type');
            if(contentType && contentType.indexOf('application/json') !== -1) {
                response.json().then((json) => {
                    let paymentId = json._id;
                    let body = {
                        date: new Date(),
                        cart: this.props.cartId,
                        payment: paymentId,
                        seller: paymentId,
                        discount: 0,
                        tax: 21,
                        total: tempTotal,
                    };
                    body = JSON.stringify(body);
                    fetch(URL + '/tickets/generateTicket', {
                        method: 'POST',
                        body: body,
                        headers: {
                            'content-type': 'application/json',
                        },
                        mode: 'cors',
                    }).then((response) => {
                        let contentType = response.headers.get('content-type');
                        if(contentType
                            && contentType.indexOf('application/json') !== -1) {
                            response.json().then((json) => {
                                
                            });
                        }
                    });
                });
            }
        });
        this.setState({
            totalPrice: 0,
            priceList: [],
            showModal: false,
        });
        this.props.newCartCallBack();
    },

    closeNoChange() {
        this.setState({
            showModal: false,
        });
    },

    render() {
        let list = [];
        if (this.state.ticketList != null) {
            this.state.ticketList.forEach((element, index) => {
                list.push(<TicketLine key={index}
                            product={this.state.ticketList[index]}
                            cartId={this.props.cartId}
                            getPriceCallBack={this.changeLinePrice}/>);
            });
        }

        return (
            <div >
                <Table responsive striped condensed>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
                <p>
                    <InputGroup>

                    </InputGroup>
                    Total : {this.state.totalPrice}€

                </p>
                <Panel>
                    <Button bsStyle="success" bsSize="large"
                            className="ticket-button"
                            onClick={this.openEditor}>
                        Pay
                    </Button>
                    <Button className="ticket-align-right ticket-button"
                            bsStyle="danger"
                            bsSize="large" onClick={this.props.newCartCallBack}>
                        Clear
                    </Button>
                </Panel>
                <Modal show={this.state.showModal} bsSize="sm">
                    <Modal.Header closeButton
                                  onHide={this.closeNoChange}>
                        <Modal.Title>Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>Total</InputGroup.Addon>
                                <FormControl type="text"
                                    value={this.state.totalPrice}
                                    readOnly="true"/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>
                                    Money received
                                </InputGroup.Addon>
                                <FormControl type="number"
                                             id="moneyReceivedInput"/>
                            </InputGroup>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.closeEditor}>
                            Pay
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>);
    },
});

export default Ticket;
