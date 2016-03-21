import React from 'react';
import Websocket  from 'react-websocket';
import { socketServer } from '../../config'
import { Table } from 'react-bootstrap'

//import UrlTable from './UrlTable'


var ReqList = React.createClass({


    click: function (index) {
        console.log(index);
        this.setState({
            showOne: this.props.list[index]
        })
    },

    render() {
        var tdStyle = {
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        };
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>URL</th>
                </tr>
                </thead>
                <tbody>
                {this.props.list.map((row, index) => {
                    return <tr key={index} onClick={this.props.clickEvent.bind(this,index)}>
                        <td style={tdStyle}>{row.url}</td>
                    </tr>;
                }) }
                </tbody>
            </Table>
        )
    }
});

exports['default'] = ReqList;
module.exports = exports['default'];
//render(<Meun />, document.getElementById('list'));