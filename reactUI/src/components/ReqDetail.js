//import '../css/bootstrap/css/bootstrap.css'
import React from 'react';

var ReqDetail = React.createClass({

    render() {
        console.log(this.props.detail.address);
        console.log(this.props.detail.req);
        return (
            <div>
                <div>
                    <p>{this.props.detail.url}</p>
                    <p>{this.props.detail.method} {this.props.detail.status}</p>
                    <p>{this.props.detail.address}</p>
                </div>
            </div>
        )
    }
});

exports['default'] = ReqDetail;
module.exports = exports['default'];
//render(<Meun />, document.getElementById('list'));