//import '../css/bootstrap/css/bootstrap.css'
import React from 'react';
import Websocket  from 'react-websocket';
import { socketServer } from '../../config'

import UrlList from 'UrlList'


var ReqList = React.createClass({

    getInitialState(){
        return {
            list: []
        }
    },

    handleData(data) {
        var list = this.state.list;
        list.push(data);
        this.setState({
            list: list
        });
        //console.log(list);
    },

    render() {
        //
        //var rows = [];
        var debug = false;
        return (
            <div>
                <Websocket url={socketServer} onMessage={this.handleData} debug={debug}/>
                <UrlList list={this.state.list}/>
            </div>
        )
    }
});

exports['default'] = ReqList;
module.exports = exports['default'];
//render(<Meun />, document.getElementById('list'));