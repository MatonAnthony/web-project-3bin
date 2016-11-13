import React from 'react';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button} from 'react-bootstrap';
import CardScanner from './CardScanner';
import './Login.css';

/*
 * TODO : This is a temporary solution until further discussion
 */
const URL = 'http://localhost:3001';

const Login = React.createClass({
    getInitialState() {
        return {
            login: 'pseudo',
            password: 'password',
            cardNumber: -1,
        };
    },

    getValidationState() {
        const login = this.state.login;
        const password = this.state.password;

        if(login.length <= 0 || password.length <= 0) return 'error';

        return 'success';
    },

    handleLoginChange(event) {
        this.setState({login: event.target.value}, () => {
            this.getValidationState();
        });
    },

    handlePasswordChange(event) {
        this.setState({password: event.target.value}, () => {
            this.getValidationState();
        });
    },

    handleCardScannerChange(number) {
        this.setState({cardNumber: number});
    },

    /*
     * TODO : Will require a refactor once the const URL refactor is settled
     */
    submitForm() {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        fetch(URL + '/authenticate', {
            method: 'POST',
            body: this.state,
            headers: headers,
        }).then((response) => {
           let contentType = response.headers.get('content-type');
           if(contentType && contentType.indexOf('application/json') !== -1) {
               return response.json().then((json, response) => {
                   if(response.ok) {
                       /* JSON Processing successfull connection
                        * TODO : Finish the processing block based on mock 
                        * or backend 
                        */
                   } else {
                       /* JSON Processing + unsucessfull redirection */
                   }
               });
           }
        });
    },

    render() {
        let title = 'Login';
        let panelColor = 'primary'; 
        return (
            <div className="container center-box vertical-centering">
                <div>
                    <Panel header={title} bsStyle={panelColor}>
                        <form>
                            <FormGroup
                                validationState={this.getValidationState()}
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

                                <p>Or connect using the card scanner :</p>

                                <CardScanner 
                                    onChange={this.handleCardScannerChange} 
                                />
                            </FormGroup>

                            <Button
                                type="button"
                                bsStyle="success"
                                onClick={this.submitForm}
                            > Submit </Button>
                        </form>
                    </Panel>
                </div>
            </div>
        );
    },
});

export default Login;
