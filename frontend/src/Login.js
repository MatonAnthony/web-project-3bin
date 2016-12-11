import React from 'react';
import {Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import {FormControl, Button} from 'react-bootstrap';
import CardScanner from './CardScanner';
import Auth from './Auth';
import './Login.css';

/*
 * TODO : This is a temporary solution until further discussion
 */
const URL = 'http://localhost:3001';

const Login = React.createClass({
    getInitialState() {
        return {
            pseudo: 'pseudo',
            password: 'password',
            accessCardId: -1,
        };
    },

    getValidationState() {
        const pseudo = this.state.pseudo;
        const password = this.state.password;

        if(pseudo.length <= 0 || password.length <= 0) return 'error';

        return 'success';
    },

    handleLoginChange(event) {
        this.setState({pseudo: event.target.value}, () => {
            this.getValidationState();
        });
    },

    handlePasswordChange(event) {
        this.setState({password: event.target.value}, () => {
            this.getValidationState();
        });
    },

    handleCardScannerChange(number) {
        this.setState({accessCardId: number});
    },

    /*
     * TODO : Will require a refactor once the const URL refactor is settled
     */
    submitForm() {
        let data = JSON.stringify(this.state);
        fetch(URL + '/login', {
            method: 'POST',
            body: data,
            headers: {
                'content-type': 'application/json',
            },
            mode: 'cors',
        }).then((response) => {
           let contentType = response.headers.get('content-type');
           if(contentType && contentType.indexOf('application/json') !== -1) {
               return response.json().then((json) => {
                   if(response.ok) {
                       /* JSON Processing successfull connection
                        * TODO : Finish the processing block based on mock 
                        * or backend 
                        */
                       Auth.authenticateUser(json.jwt);
                   } else {
                       /* JSON Processing + unsucessfull redirection */
                       console.log(json);
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
                                    value={this.state.pseudo}
                                    placeholder={this.state.pseudo}
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
                                className="login-btn"
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
