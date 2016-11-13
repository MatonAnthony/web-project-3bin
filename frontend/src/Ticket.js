import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import TicketLine from './TicketLine';
import './Ticket.css';

/*
 * TODO : This is a temporary solution until further discussion
 */

const Ticket = React.createClass({


    render() {
        for (let i=0; i<3; i++) {

        }

        return (
            <Panel className="panel-alignment">
                <TicketLine productName="Moufles"
                            quantity="12" price="100"/>
                <TicketLine productName="Moufles"
                            quantity="12" price="100"/>
                <TicketLine productName="Moufles"
                            quantity="12" price="100"/>
                <Panel>
                    <Button className="ticketButton" bsStyle="success"
                            bsSize="large">
                        Pay
                    </Button>
                    <Button bsStyle="danger" bsSize="large"
                            >
                        Clear
                    </Button>
                </Panel>
            </Panel>);
    },
});

export default Ticket;
