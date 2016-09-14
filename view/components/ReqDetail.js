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

    syntaxHighlight(json) {
        let callback = null;
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        } else {
            callback = json.match(/([^\{]*)/);
            if (callback && callback.length == 2){
                callback = callback[1]
            }
        }
        try{
            json = JSON.stringify(JSON.parse(json),undefined, 2);
            console.log(json)
        } catch (e){
            console.log(e)
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        let spanList = [];
        json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                    spanList.push( <span className={cls}>{match} </span>)
                    return null
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            console.log(match, typeof match)
            spanList.push( <span className={cls}>{match} </span>)
        });
        console.log(spanList)
        return spanList;
    }

    render() {
        var detail = this.props.detail;
        var body = detail.body;
        if (body.type == "Buffer") {
            body = new Buffer(detail.body.data)
        }
        // console.log(detail.url.substring(detail.url.indexOf("?")))
        let paramList = [];
        if (detail.url.includes("?")){
            let params = this.parseQueryString(detail.url.substr(detail.url.indexOf("?")));
            Object.keys(params).map(key=>{
                paramList.push(<p className="p-l-50" key={key}><b>{key}</b>:{params[key]}</p>)
            })
        }

        var req = this.expandHeader(detail.req);
        var res = this.expandHeader(detail.res);

        if (detail.url == '') {
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
                <pre className="box">
                    {this.syntaxHighlight(body.toString())}
                </pre>
            </div>
        )
    }
}

