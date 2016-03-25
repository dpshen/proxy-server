import React from 'react';
import Websocket  from 'react-websocket';
import { Table } from 'react-bootstrap'


var ReqList = React.createClass({

    render() {
        var tdStyle = {
            width:'400px',
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        };

        var reqList = this.props.list.map((row, index) => {
            if (this.props.siftIP == 'ALL' || this.props.siftIP == row.address){
                return <tr key={index} id={"tr_"+index} onClick={this.props.clickEvent.bind(null, index)}>
                    <td >
                        <div style={tdStyle} title={row.url}>{row.url}</div>
                    </td>
                </tr>;
            }
        }) ;

        return (
            <Table striped condensed hover>
                <tbody>
                {reqList}
                </tbody>
            </Table>
        )
    }
});

exports['default'] = ReqList;
module.exports = exports['default'];
