import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import './TicketLine.css';


const TicketLine = React.createClass({
    render() {
        return (
            <div>
                <Panel>
                    <Button bsSize="xsmall" className="margin">x</Button>
                    <div className="inline-block margin">
                        {this.props.productName}
                    </div>
                    <div className="inline-block margin">
                        (x{this.props.quantity})
                    </div>
                    <div className="inline-block align-right">
                        {this.props.price}€
                    </div>
                </Panel>
            </div>);
    },

});

export default TicketLine;
