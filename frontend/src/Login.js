import React, { Component } from 'react';
import { Panel, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Login extends Component {
    getInitialState() {
      return {
          login: 'pseudo',
          password: 'password'
      };
    }

    getValidationState() {
        const login = this.state.login;
        const password = this.state.password;

        if(login.length <= 0 || password.length <= 0) return 'error';
        return 'success';
    }

    handleLoginChange(event) {
        this.setState({ login : event.target.value }, () => {
            this.getValidationState();
        });
    }

    handlePasswordChange(event) {
        this.setState({ password : event.target.value }, () => {
            this.getValidationState();
        });
    }

    render() {
        const title = "Login";
        const panelColor = "primary"; // Please refer to bootstrap color notation
        return (
            <div>
                <Panel header={title} bsStyle={panelColor}>
                    <form>
                        <FormGroup
                            controlID="formLogin"
                            validationState={this.getValidationState}
                        >
                            <ControlLabel>Username :</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.login}
                                placeholder={this.state.login}
                                onChange={this.handleLoginChange}
                            />
                            <FormControl.Feedback />

                            <ControlLabel>Password :</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                placeholder={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </form>
                </Panel>
            </div>
        );
    }
}

export default Login;
