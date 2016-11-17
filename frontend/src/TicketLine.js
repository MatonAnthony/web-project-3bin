import React from 'react';
import {Button, Modal, InputGroup} from 'react-bootstrap';
import './TicketLine.css';

const TicketLine = React.createClass({

    propTypes: {
      product: React.PropTypes.object.isRequired,
    },

    getInitialState() {
      return {
         quantity: 1,
         showModal: false,
      };
    },

    openEditor() {
        this.setState({
           quantity: this.state.quantity,
           showModal: true,
        });
    },

    closeEditor() {
        let input = document.getElementById('inputModal');
        this.setState({
            quantity: input.value,
            showModal: false,
        });
    },

    closeNoChange() {
        this.setState({
            quantity: this.state.quantity,
            showModal: false,
        });
    },

    addOne() {
        let input = document.getElementById('inputModal');
        input.value++;
    },

    removeOne() {
        let input = document.getElementById('inputModal');
        if(input.value >1) {
            input.value--;
        }
    },

    render() {
        return (
                <tr>
                    <td>
                        <Button bsSize="large" onClick={this.openEditor}>
                            Edit
                        </Button>
                    </td>
                    <td className="ticketLine-vertical-align">
                        {this.props.product.productName}
                    </td>
                   <td className="ticketLine-vertical-align">
                        x{this.state.quantity}
                   </td>
                   <td className="ticketLine-vertical-align">
                        {this.props.product.price}€
                   </td>
                    <div>
                        <Modal show={this.state.showModal} bsSize="sm">
                            <Modal.Header closeButton
                                          onHide={this.closeNoChange}>
                                <Modal.Title>Change Quantity</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup>
                                    <span className="input-group-btn">
                                        <Button onClick={this.addOne}
                                                bsStyle="success"
                                                bsSize="large"
                                                >
                                            +
                                        </Button>
                                    </span>
                                    <input id="inputModal"
                                           type="number"
                                           className="form-control input-lg"
                                           defaultValue={this.state.quantity}
                                           />
                                    <span className="input-group-btn">
                                        <Button onClick={this.removeOne}
                                                bsStyle="danger" bsSize="large">
                                            -
                                        </Button>
                                    </span>
                                </InputGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closeEditor}>
                                    Valider
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </tr>
        );
    },

});

export default TicketLine;
