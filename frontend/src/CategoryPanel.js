import React from 'react';
import {Button, Image} from 'react-bootstrap';
import './CategoryPanel.css';

const CategoryPanel = React.createClass({
    propTypes: {
        button: React.PropTypes.element,
        name: String,
    },

    getInitialState(name) {
        return {
            button: this.props.button,
            name: name,
        };
    },

    clearList() {
        this.setState({button: undefined});
    },

    getCategoryPanel() {

    },

    render() {
        return (
            <div className="category-panel-alignment">
                <Button bsStyle="success" bsSize="medium"
                        onClick={this.getCategoryPanel()}>
                    data
                </Button>
                <p>CategoryName</p>
            </div>
        );
    },
});

export default CategoryPanel;
