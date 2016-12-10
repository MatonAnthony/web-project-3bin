import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import Auth from './Auth';
import './Menubar.css';

const moment = require('moment');

const Menubar = React.createClass({
    propTypes: {
        callback: React.PropTypes.func.isRequired,
    },

    getDefaultProps() {
        return {
            date: moment().format('LLL'),
        };
    },

    getInitialState() {
        return {
            username: undefined,
            clock: moment().format('LLL'),
        };
    },

    componentDidMount() {
        window.setInterval(() => {
            this.setState({
                clock: moment().format('LLL'),
            });
        }, 5000);
    },

    handleLogout() {
        Auth.deauthenticateUser();
        this.props.callback();
    },

    render() {
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand
                        className="menubar-brand">
                        <a href="#">La caissière</a>
                    </Navbar.Brand>
                    {/* This is a specific tag to make the Navbar more 
                      *  responsive 
                      */}
                    <Navbar.Toggle />
                </Navbar.Header>
                {/* This is also a tag to increase responsiveness */}
            <Navbar.Collapse>
                <Nav pullRight>
                    <Navbar.Text className="menubar-time">
                        {this.state.clock}
                    </Navbar.Text>
                    {/* Add link to the actual logout page */}
                    <Button
                        bsStyle="danger"
                        href="#"
                        className="menubar-logout navbar-btn"
                    >Logout</Button>
                </Nav>
             </Navbar.Collapse>
            </Navbar>
        );
    },
});

export default Menubar;
