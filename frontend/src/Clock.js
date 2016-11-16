import React from 'react';

const Clock = React.createClass({
    getInitialState() {
        this.interval = null;
        return {
            now: new Date(),
        };
    },

    /**
     * Every second this function reloads
     * the date (to get the actual time).
     * */
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
            <div className="Clock">
                <p>{this.state.now.toTimeString().split(' ')[0]}</p>
            </div>
        );
    },
});

export default Clock;
