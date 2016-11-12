import React from 'react';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button, InputGroup} from 'react-bootstrap';
import CardScanner from './CardScanner';
import './Register.css';

const URL = 'http://localhost:3001';

const Register = React.createClass({
    getInitialState() {
        return {
            "login": "",
            "password": "",
            "email": "",
            "firstname": "",
            "lastname": "",
            "cardNumber": "",
        };
    },

    getValidationState() {
        const login = this.state.login;
        const password = this.state.password;
        const email = this.state.email;
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const cardNumber = this.state.cardNumber;

        /*
         * TODO: Decide on a proper way to validate complex forms
         * Thinking about passing event.target as a parameter in the handler
         * and using it to change the validationState value for specific part of the form.
         */

        return 'success';
    },

    /**
     * Scan the card and fill the form with the number coming from the EAN barcode
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

    /*
     * TODO: Will require a refactor once the API design is done and URL is settled
     */
    submitForm() {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });

        fetch(URL + '/register', {
            method: 'POST',
            body: this.state,
            headers: headers,
        }).then((response) => {
            let contentType = response.headers.get('content-type');
            if(contentType && contentType.indexOf('application/json') !== -1) {
                return response.json().then((json, response) => {
                    if(response.ok) {
                        /*
                         * JSON Processing successful registration
                         * TODO: Finish the redirection block based on Application Design
                         */
                    } else {
                        /*
                         * JSON Processing unsuccessful registration -- erroring
                         */
                    }
                });
            }
        });
    },

    render() {
        let title = 'Registration';
        let panelColor = 'primary';
        let emailPlaceholder = 'xxx@example.com';

        return (
            <div className="container center-box vertical-centering">
                <div>
                    <Panel header={title} bsStyle={panelColor}>
                        <form>
                            <FormGroup
                                validationState={this.getValidationState}
                            >
                                <ControlLabel>Username :</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.login}
                                    placeholder={this.state.login}
                                    onChange={this.handleLoginChange}
                                />

                                <ControlLabel>Password :</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.password}
                                    placeholder={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />

                                <ControlLabel>Email :</ControlLabel>
                                <FormControl
                                    type="email"
                                    value={this.state.email}
                                    placeholder={emailPlaceholder}
                                    onChange={this.handleEmailChange}
                                />

                                <hr/>

                                <ControlLabel>Firstname :</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.firstname}
                                    placeholder="firstname"
                                    onChange={this.handleFirstnameChange}
                                />

                                <ControlLabel>Lastname :</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.lastname}
                                    placeholder="lastname"
                                    onChange={this.handleLastNameChange}
                                />

                                <ControlLabel>Card Number :</ControlLabel>
                                <CardScanner />

                            </FormGroup>

                            <Button
                                type="button"
                                bsStyle="success"
                                onClick={this.submitForm}
                            > Register </Button>
                        </form>
                    </Panel>
                </div>
            </div>
        )
    }

});

export default Register;