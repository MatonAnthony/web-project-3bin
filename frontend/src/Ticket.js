import React from 'react';
import {Panel, Table, Button} from 'react-bootstrap';
import TicketLine from './TicketLine';
import './Ticket.css';

const URL = 'http://localhost:3000';

const Ticket = React.createClass({

    getInitialState() {
        return {
            ticketList: [],
        };
    },

    propTypes: {
        newCartCallBack: React.PropTypes.func.isRequired,
        cartId: React.PropTypes.string.isRequired,
    },

    initiatePayment() {
        //TODO : initiate the payment process
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

    render() {
        let list = [];
        if (this.state.ticketList != null) {
            this.state.ticketList.forEach((element, index) => {
                list.push(<TicketLine key={index}
                            product={this.state.ticketList[index]}
                            cartId={this.props.cartId}/>);
            });
        }

        return (
            <div >
                <Table responsive striped condensed>
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
                <Panel>
                    <Button bsStyle="success" bsSize="large"
                            className="ticket-button"
                            onClick={this.initiatePayment}>
                        Pay
                    </Button>
                    <Button className="ticket-align-right ticket-button"
                            bsStyle="danger"
                            bsSize="large" onClick={this.props.newCartCallBack}>
                        Clear
                    </Button>
                </Panel>
            </div>);
    },
});

export default Ticket;
