import React from 'react';
import {FormControl, InputGroup, Button} from 'react-bootstrap';


const CardScanner = React.createClass({

    getInitialState() {
        return {
          cardNumber: null,
        };
    },

    getValidationState() {
        const cardNumber = this.state.cardNumber;
        if(typeof cardNumber !== 'number') return 'error';

        return 'success';
    },

    handleCardNumberChange(event) {
        this.setState({cardNumber: event.target.value}, () => {
            this.getValidationState();
        });
    },

    /**
     * Scan the card and fill the form with the number coming
     * from the EAN barcode.
     * @param {Event} event Clicked on the scanning button.
     */
    scanCard(event) {
        /*
         * TODO : Add the code regarding a card scanning by the machine.
         * Assuming we get a Number
         */
        let readValue = '00000000';
        this.setState({cardNumber: readValue}, () => {
            this.getValidationState();
        });
    },

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroup.Button>
                        <Button
                            onClick={this.scanCard}
                        >Scan</Button>
                    </InputGroup.Button>
                    <FormControl type="text" />
                </InputGroup>
            </div>
        );
    },
});

export default CardScanner;
