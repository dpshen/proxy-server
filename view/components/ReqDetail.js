import React from 'react';

export default class ReqDetail extends React.Component {

    expandHeader(header) {
        let jsxHeaders = [];
        var Cookies = [];
        var cookieList;
        for (let key in header) {
            if (key == "cookie") {
                cookieList = header[key].split(';');
            } else if (key == "set-cookie") {
                cookieList = header[key];
            }

            if (key == "cookie" || key == "set-cookie") {
                cookieList.map(function (item) {
                    Cookies.push(<div className="cookie">{item + ';'}</div>)
                });
                jsxHeaders.push(<div><b>{key}: </b>{Cookies}</div>);
            } else {
                jsxHeaders.push(<div><b>{key}:</b>{header[key]}</div>)
            }
        }
        return jsxHeaders;
    }

    render() {
        var detail = this.props.detail;

        var req = this.expandHeader(detail.req);
        var res = this.expandHeader(detail.res);

        if (this.props.detail.url == '') {
            return (<div></div>)
        }

        return (
            <div >
                <h4>General</h4>
                <div className="box">
                    <b>Request URL: </b> {detail.url}<br/>
                    <b>Request Method: </b> {detail.method}<br/>
                    <b>Status Code: </b> {detail.status}<br/>
                    <b>Remote Address: </b> {detail.address}<br/>
                </div>
                <h4>Request Header</h4>
                <div className="box">
                    {req}
                </div>
                <h4>Response Header</h4>
                <div className="box">
                    {res}
                </div>
            </div>
        )
    }
}

