import React from 'react';
import {Table} from 'react-bootstrap'


export default class ReqList extends React.Component {

    constructor(props) {
        super(props);
    }

    getReqList() {
        var reqList = [];
        var filter = this.props.filter;
        this.props.list.map((row, index) => {
            console.log(filter, row.url);
            if (filter && !row.url.includes(filter.trim())){
                return null
            }
            if (typeof row == "object" && this.props.siftIP == 'ALL' || this.props.siftIP == row.address) {
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

                let url = row.url.split("?")[0];
                reqList.push(<tr key={index} id={"tr_" + index} onClick={this.props.clickEvent.bind(null, index)}>
                    <td >
                        <span className={resTypeLabel}>{resType}</span>
                    </td>
                    <td >
                        <div className="req-row" title={url}>{url}</div>
                    </td>
                </tr>);
            }
        });
        return reqList;
    }

    render() {

        var reqList = this.getReqList();

        return (
            <Table striped condensed hover>
                <tbody>
                {reqList}
                </tbody>
            </Table>
        )
    }
}

