import React from 'react';
import {Button} from 'react-bootstrap';
import './CategoryPanel.css';

const URL = 'http://localhost:3000';

const CategoryPanel = React.createClass({

    propTypes: {
        name: React.PropTypes.string,
        id: React.PropTypes.string.isRequired,
        cartId: React.PropTypes.string.isRequired,
        addProductCallback: React.PropTypes.func.isRequired,
    },

    addProduct() {
        let body = {
            productId: this.props.id,
            quantity: 1,
        };
        body = JSON.stringify(body);
        fetch(URL + '/carts/' + this.props.cartId + '/productId', {
            method: 'PATCH',
            body: body,
            headers: {
                'content-type': 'application/json',
            },
            mode: 'cors',
        }).then((response) => {
            let contentType = response.headers.get('content-type');
            if(contentType && contentType.indexOf('application/json') !== -1) {
                this.props.addProductCallback();
            }
        });
    },

    render() {
        return (
            <Button className="categoryPanel-button"
                    bsStyle="success"
                    onClick={this.addProduct}>
                {this.props.name}
            </Button>
        );
    },
});

export default CategoryPanel;
