import React from 'react';
import Websocket  from 'react-websocket';
import { socketServer } from '../../config'
import { Table } from 'react-bootstrap'


var ReqList = React.createClass({

    click: function (index) {
        console.log(index);
        this.setState({
            showOne: this.props.list[index]
        })
    },

    render() {
        var tdStyle = {
            width:'400px',
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        };
        return (
            <Table striped condensed hover>
                <tbody>
                {this.props.list.map((row, index) => {
                    return <tr key={index} id={"td_"+index} onClick={this.props.clickEvent.bind(null, index)}>
                        <td >
                            <div style={tdStyle} title={row.url}>{row.url}</div>
                        </td>
                    </tr>;
                }) }
                </tbody>
            </Table>
        )
    }
});

exports['default'] = ReqList;
module.exports = exports['default'];
