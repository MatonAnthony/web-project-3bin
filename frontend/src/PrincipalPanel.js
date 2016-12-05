import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './PrincipalPanel.css';
import CategoryPanel from './CategoryPanel';
import Ticket from './Ticket';
import Menubar from './Menubar';


const PrincipalPanel = React.createClass({
    getInitialState() {
        return {};
    },

    propTypes: {},

    clearList() {
    },
    /*TODO retrieve categories and create buttons fom them*/

    render() {
        return (
            <Grid fluid="true">
                <Row>
                    <Menubar/>
                </Row>
                <Row >
                    <Col lg="2" md="2" sm="2" xs="2">
                        <CategoryPanel name="Légumes"/>
                    </Col>
                    <Col lg="2" md="2" sm="2" xs="2">
                        <CategoryPanel name="Carottes"/>
                    </Col>
                    <Col lg="2" md="2" sm="2" xs="2">
                        <CategoryPanel name="Fruits"/>
                    </Col>
                    <Col lg="2" md="2" sm="2" xs="2">
                        <CategoryPanel name="Viandes"/>
                    </Col>
                    <Col lg="2" md="2" sm="2" xs="2">
                        <CategoryPanel name="Poissons"/>
                    </Col>
                    <Col lg="2" md="2" sm="2" xs="2">
                        <Ticket className="principal-panel-ticket"/>
                    </Col>
                </Row>

            </Grid>
        );
    },
});

export default PrincipalPanel;
