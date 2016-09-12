import React from 'react';
import { Table } from 'react-bootstrap'


var ReqList = React.createClass({

    render() {
        var tdStyle = {
            width: '360px',
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        };

        var reqList = this.props.list.map((row, index) => {
            if (this.props.siftIP == 'ALL' || this.props.siftIP == row.address) {
                var resType = row.res['content-type'] || '其他';
                var resTypeLabel = "label";
                if (resType.indexOf('text') > -1) {
                    resType = 'text';
                    resTypeLabel = "label label-success";
                } else if (resType.indexOf('application') > -1) {
                    resType = 'application';
                    resTypeLabel = "label label-success";
                } else if (resType.indexOf('image') > -1) {
                    resType = 'image';
                    resTypeLabel = "label label-warning";
                } else if (resType.indexOf('audio') > -1) {
                    resType = 'audio';
                    resTypeLabel = "label label-warning";
                } else {
                    resTypeLabel = "label label-info";
                }
                return <tr key={index} id={"tr_"+index} onClick={this.props.clickEvent.bind(null, index)}>
                    <td >
                        <div style={tdStyle} title={row.url}>{row.url}</div>
                    </td>
                    <td>
                        <span className={resTypeLabel}>{resType}</span>
                    </td>
                </tr>;
            }
        });

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
