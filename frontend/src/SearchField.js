import React from 'react';
import './SearchField.css';
import {Button, Glyphicon, FormGroup, InputGroup, FormControl}
    from 'react-bootstrap';

const URL = 'http://localhost:3000';

const SearchField = React.createClass({

    propTypes: {
        addProductCallback: React.PropTypes.func.isRequired,
        cartId: React.PropTypes.string.isRequired,
    },

    getInitialState() {
        return {
            ean: '',
            quantity: 1,
        };
    },

    handleEanChange(event) {
        this.setState(
            {
                ean: event.target.value,
                quantity: 1,
            });
    },

    addProduct() {
        let data = JSON.stringify(this.state);
        fetch(URL + '/carts/' + this.props.cartId + '/ean', {
            method: 'PATCH',
            body: data,
            headers: {
                'content-type': 'application/json',
            },
            mode: 'cors',
        }).then((response) => {
            let contentType = response.headers.get('content-type');
            if(contentType && contentType.indexOf('application/json') !== -1) {
                this.setState({
                    ean: '',
                    quantity: 1,
                });
                this.props.addProductCallback();
            }
        });
    },

    render() {
        return(<div>
            <FormGroup>
                <InputGroup>
                    <FormControl className="form-control input-lg"
                                 type="text"
                                 placeholder="Ean"
                                 value={this.state.ean}
                                 onChange={this.handleEanChange}/>
                    <InputGroup className="input-group-btn">
                        <Button bsStyle="success" bsSize="large"
                                onClick={this.addProduct}>
                            <Glyphicon glyph="glyphicon glyphicon-arrow-right"/>
                        </Button>
                    </InputGroup>
                </InputGroup>
            </FormGroup>
        </div>);
    },
});

export default SearchField;
