import './css/bootstrap/css/bootstrap.css'

import React, { Component } from 'react';
import Websocket  from 'react-websocket';
import { render } from 'react-dom';
import { socketServer } from '../config'
import { Table } from 'react-bootstrap'

import ReqList from './components/ReqList';
import ReqDetail from './components/ReqDetail';

var Container = React.createClass({

    getInitialState(){
        return {
            list: [],
            detail:{
                url: '',
                status: '',
                method: '',
                address: '',
                req: '',
                res: '',
                body: ''
            }
        }
    },

    onWebSocket(data) {
        var list = this.state.list;
        list.push(data);
        this.setState({
            list: list
        });
    },

    showDetail(index){
        var detail = this.state.list[index];
        this.setState({
            detail: detail
        });
        console.log(index);
    },

    render() {
        var debug = false;
        return (
            <div className="container-fluid">
                <div className="row-fluid">
                    <div className="col-md-6">
                        <ReqList list={this.state.list} clickEvent={this.showDetail} />
                    </div>
                    <div className="col-md-6">
                        <ReqDetail detail={this.state.detail}/>
                    </div>
                </div>
                <Websocket url={socketServer} onMessage={this.onWebSocket} debug={debug}/>
            </div>
        )
    }
});

render(<Container />, document.getElementById('container'));
//render(<Meun />, document.getElementById('list'));