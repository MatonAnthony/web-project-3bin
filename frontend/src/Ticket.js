import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import TicketLine from './TicketLine';
import './Ticket.css';

const Ticket = React.createClass({

    getInitialState() {
        return {
            ticketList: this.props.ticketList,
        };
    },

    propTypes: {
      ticketList: React.PropTypes.array.isRequired,
    },

    clearList() {
        this.setState({ticketList: []});
    },

    initiatePayment() {
        //TODO : initiate the payment process
    },

    render() {
        let list = [];
        for (let i = 0; i<this.state.ticketList.length; i++) {
            list.push(<TicketLine key={i} product={this.state.ticketList[i]}/>);
        }

        return (
            <Panel className="panel-alignment">
                {list}
                <Panel>
                    <Button bsStyle="success" bsSize="large"
                            onClick={this.initiatePayment}>
                        Pay
                    </Button>
                    <Button className="ticket-align-right" bsStyle="danger"
                            bsSize="large" onClick={this.clearList}>
                        Clear
                    </Button>
                </Panel>
            </Panel>);
    },
});

export default Ticket;
