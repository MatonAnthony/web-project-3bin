import React from 'react';
import {Button} from 'react-bootstrap';
import './CategoryPanel.css';

const CategoryPanel = React.createClass({
    getInitialState() {
        return {
            name: this.props.name,
        };
    },

    propTypes: {
        name: React.PropTypes.string,
    },

    getCategoryPanel() {
        // TODO call API
    },

    render() {
        return (
            <Button className="categoryPanel-button" bsStyle="success">
                {this.state.name}
            </Button>
        );
    },
});

export default CategoryPanel;
