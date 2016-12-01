import React from 'react';
import {Table} from 'react-bootstrap';
import './PrincipalPanel.css';
import CategoryPanel from './CategoryPanel';

const PrincipalPanel = React.createClass({
   getInitialState() {
       return {
           buttons: this.props.buttonList,
       };
   },

    propTypes: {
        buttonList: React.PropTypes.array,
    },

    clearList() {
        this.setState({buttonList: []});
    },

    render() {
        let list= [];
        if(this.state.list != null) {
            this.state.list.forEach((element, index) => {
               list.push(<CategoryPanel key={index}/>);
            });
        }

        return(
            <div className="principal-panel-alignment">
                <Table responsive striped condensed >
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </Table>
            </div>
        );
    },
});

export default PrincipalPanel;
