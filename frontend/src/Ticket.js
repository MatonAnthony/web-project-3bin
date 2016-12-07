import React from 'react';
import {Panel, Table, Button} from 'react-bootstrap';
import TicketLine from './TicketLine';
import './Ticket.css';

const Ticket = React.createClass({

    getInitialState() {
        return {
            ticketList: this.props.ticketList,
        };
    },

    propTypes: {
      ticketList: React.PropTypes.array,
    },

    clearList() {
        this.setState({ticketList: []});
    },

    initiatePayment() {
        //TODO : initiate the payment process
    },

    render() {
        let list = [];
        if(this.state.ticketList != null) {
            this.state.ticketList.forEach((element, index) => {
                list.push(<TicketLine key={index}
                                      product={this.state.ticketList[index]}/>);
            });
        }

        return (
            <div className="ticket-panel-alignment">
                <Table responsive striped condensed >
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
                    <Button bsStyle="success" bsSize="large" className="ticket-button"
                            onClick={this.initiatePayment}>
                        Pay
                    </Button>
                    <Button className="ticket-align-right ticket-button" bsStyle="danger"
                            bsSize="large" onClick={this.clearList}>
                        Clear
                    </Button>
                </Panel>
            </div>);
    },
});

export default Ticket;
