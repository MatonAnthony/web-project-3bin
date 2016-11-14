import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import './TicketLine.css';

const TicketLine = React.createClass({

    propTypes: {
      product: React.PropTypes.object.isRequired,
    },

    getInitialState() {
      return {
         'quantity': 1,
      };
    },

    addOne() {
        this.setState({'quantity': (this.state.quantity+1)});
    },

    removeOne() {
        if (this.state.quantity > 1) {
            this.setState({'quantity': (this.state.quantity - 1)});
        }
    },

    render() {
        return (
            <div>
                <Panel>
                    <Button bsSize="xsmall" className="ticketLine-margin"
                            onClick={this.addOne}>+</Button>
                    <Button bsSize="xsmall" className="ticketLine-margin"
                            onClick={this.removeOne}>-</Button>
                    <div className="ticketLine-inline-block ticketLine-margin">
                        {this.props.product.productName}
                    </div>
                    <div className="ticketLine-inline-block ticketLine-margin">
                        (x{this.state.quantity})
                    </div>
                    <div className="ticketLine-inline-block
                        ticketLine-align-right">
                        {this.props.product.price}€
                    </div>
                </Panel>
            </div>);
    },

});

export default TicketLine;
