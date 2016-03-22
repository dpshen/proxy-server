import './css/bootstrap/css/bootstrap.css'
import './css/index.css.less'

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
            windowHeight: {
                height: window.innerHeight - 30
            },
            detail: {
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

    handleResize: function (e) {
        this.setState(
            {
                windowHeight: {
                    height: window.innerHeight - 30
                }
            });
    },

    componentDidMount: function () {
        window.addEventListener('onresize', this.handleResize);
    },

    componentWillUnmount: function () {
        window.removeEventListener('onresize', this.handleResize);
    },

    render() {
        var debug = false;
        return (
            <div className="container-fluid">
                <div>
                    <div className="left-list" style={this.state.windowHeight}>
                        <ReqList list={this.state.list} clickEvent={this.showDetail}/>
                    </div>
                    <div className="right-detail" style={this.state.windowHeight}>
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