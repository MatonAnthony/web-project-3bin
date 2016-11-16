import React from 'react';
import {Button} from 'react-bootstrap';
import './Menubar.css';
import clock from './images/clock.jpg';
import ClockJs from './Clock.js'

const Menubar = React.createClass({
    getInitialState() {
        this.interval = null;
        this._onButtonClick = this._onButtonClick.bind(this);
        return {
            now: new Date(),
            login: 'login name',
            showComponent: false,
        };
    },

    /**
     * Function that toggles showComponent
     * */
    _onButtonClick() {
        if (this.state.showComponent){
            this.setState({
                showComponent: false,
            });
        } else {
            this.setState({
                showComponent: true,
            });
        }
    },

    /**
     * TODO
     * */
    logout(){

    },

    /**
     * If showComponent is true, prints out
     * the time gotten from component Clock,
     * else prints out a clock icon
     * @return {HTML} the rendered html
     */
    render() {
        const today = new Date();
        return (
            <div className="Menubar">
                <div className="Menubar-name">
                    <p>{this.state.login}</p>
                </div>
                <div className="Menubar-date">
                    <p>{today.getDate()}/{today.getMonth()}
                        /{today.getFullYear()}</p>
                </div>

                {this.state.showComponent ?
                    <div
                        onClick={this._onButtonClick}
                        className="Menubar-time-display"
                    >
                        <ClockJs />
                    </div>:
                    <input
                        type="image"
                        src={clock}
                        className="Menubar-time"
                        onClick={this._onButtonClick}
                    />
                }

                <Button
                    type="button"
                    bsStyle="success"
                    onClick={this.logout}
                > Logout </Button>
            </div>
        );
    },
});

export default Menubar;
