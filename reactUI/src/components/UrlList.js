import './css/bootstrap/css/bootstrap.css'
import React from 'react';
import Websocket  from 'react-websocket';
import { socketServer } from '../../config'
import { Table } from 'react-bootstrap'


var UrlList = React.createClass({


    click: function (index) {
        //console.log(this.props.list[index].body);
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
                    return <tr key={index} onClick={this.click.bind(this,index)}>
                        <td style={tdStyle}>{row.url}</td>
                    </tr>;
                }) }
                </tbody>
            </Table>
        )
    }
});

exports['default'] = UrlList;
module.exports = exports['default'];