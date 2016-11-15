import React from 'react';
import './Menubar.css';

const Menubar = React.createClass({
    getInitialState() {
        var now = new Date();
        this.interval = null;
        return {
            now: new Date(),
            login: 'login name',
        };
    },

    /**
     * Every second this function reloads
     * the date (to get the actual time).
     * */
    componentDidMount: function() {
        const self = this;
        self.interval = setInterval(function() {
            var now = new Date();
            self.setState({
                now: now,
            });
        }, 1000);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    /**
     * The component will only be rerendered
     * when the seconds are equal to 59
     * */
    shouldComponentUpdate(nextProps, nextState){
        if (this.state.now.getSeconds() === 59){
            return true;
        }
        return false;
    },

    /**
     * Time gets updated every second, but it is only
     * rerendered every minute.
     * time gets displayed like follows normally with:
     * the function toTimeString():hh:mm:ss, we only
     * need hh:mm. This is done with the substring
     * as below
     */
    render() {
        const today = new Date();
        let time = this.state.now.toTimeString().split(' ')[0];
        return (
            <div className="Menubar">
                <div className="Menubar-name">
                    <p>{this.state.login}</p>
                </div>
                <div className="Menubar-date">
                    <p>{today.getDate()}/{today.getMonth()}/{today.getFullYear()}</p>
                </div>
                <div className="Menubar-time">
                    <p>{time.substring(0, time.length - 3)}</p>
                </div>
            </div>
        );
    },
});

export default Menubar;
