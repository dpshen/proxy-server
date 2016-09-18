import React from 'react';

export default class ReqDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewSource: false
        }
    }

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
                    Cookies.push(<div className="p-l-50">{item + ';'}</div>)
                });
                jsxHeaders.push(<div><b>{key}: </b>{Cookies}</div>);
            } else {
                jsxHeaders.push(<div><b>{key}:</b>{header[key]}</div>)
            }
        }
        return jsxHeaders;
    }

    parseQueryString(str) {
        var reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
        var result = {};
        var match;
        var key;
        var value;
        while (match = reg.exec(str)) {
            key = match[2];
            value = match[3] || '';
            result[key] = decodeURIComponent(value);
        }
        return result;
    }

    jsonp(json) {
        return JSON.stringify(json, undefined, 4);
    }

    syntaxHighlight(json) {
        let callback = null;
        try {
            if (typeof json != 'string') {
                json = this.jsonp(json)
            } else {
                callback = json.match(/[^\(]*/);
                let jsonp = json.replace(/[^\(]*/, m => "this.jsonp");
                if (callback && jsonp.startsWith("this.jsonp(")) {
                    json = `${callback}(${eval(jsonp)})`
                } else {
                    json = "解析失败"
                }
            }
        } catch (e) {
            console.log(e)
        }
        return json
    }

    viewSource(e) {
        this.setState({
            viewSource: e.target.checked
        })
    }

    render() {
        var detail = this.props.detail;
        var body = detail.body;
        if (body.type == "Buffer") {
            body = new Buffer(detail.body.data)
        }
        let paramList = [];
        if (detail.url.includes("?")) {
            let params = this.parseQueryString(detail.url.substr(detail.url.indexOf("?")));
            Object.keys(params).map(key=> {
                paramList.push(<p className="p-l-50" key={key}><b>{key}</b>:{params[key]}</p>)
            })
        }

        var req = this.expandHeader(detail.req);
        var res = this.expandHeader(detail.res);

        if (detail.url == '') {
            return (<div></div>)
        }

        var changeViewSource = this.viewSource.bind(this);
        var viewSource = this.state.viewSource;

        return (
            <div >
                <h4>General</h4>
                <div className="box">
                    <b>Request URL: </b> {detail.url}<br/>
                    <b>Request Method: </b> {detail.method}<br/>
                    <b>Status Code: </b> {detail.status}<br/>
                    <b>Remote Address: </b> {detail.address}<br/>
                    <b>Params:</b>{paramList}
                </div>
                <h4>Request Header</h4>
                <div className="box">
                    {req}
                </div>
                <h4>Response Header</h4>
                <div className="box">
                    {res}
                </div>
                <h4>Response Body</h4>
                <label>
                    <input type="checkbox" defaultChecked={false} onChange={changeViewSource}/><span> view source</span>
                </label>
                <pre className="box">
                    {viewSource ? body.toString() : this.syntaxHighlight(body.toString())}
                </pre>
            </div>
        )
    }
}

