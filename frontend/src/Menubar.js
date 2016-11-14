import React from 'react';
import './Menubar.css';
import Time from 'react-time';

const Menubar = React.createClass({
        getInitialState() {
            this.interval = null;
            return {
                now: new Date(),
            };
        },

        componentDidMount: function() {
            const self = this;
            self.interval = setInterval(function() {
                self.setState({
                    now: new Date(),
                });
            }, 1000);
        },

        componentWillUnmount: function() {
            clearInterval(this.interval);
        },

        render() {
            return (
                <div className="Menubar">
                    <ul className="Menubar-menu">
                        <div className="">
                            <li className="Menubar-name">login name</li>
                            <li className="Menubar-date"><Time value={this.state.now} format="DD/MM/YYYY" /></li>
                            <li className="Menubar-time"><Time value={this.state.now} format="HH:mm:ss" /></li>
                        </div>
                    </ul>
                </div>
            );
        }
    });

export default Menubar;
