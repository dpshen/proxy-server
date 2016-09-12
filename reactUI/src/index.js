import './css/bootstrap/css/bootstrap.css'
import './css/index.css.less'

import React, { Component } from 'react';
import WebSocket  from 'react-websocket';
import { render } from 'react-dom';
import { socketServer } from '../../config'

import ReqList from './components/ReqList';
import ReqDetail from './components/ReqDetail';
import ToolBar from './components/ToolBar';

var Container = React.createClass({

        getInitialState(){
            return {
                scroll: true,
                siftIP: 'ALL',
                IPList: [],
                list: [],
                windowHeight: {
                    height: window.innerHeight - 60
                },
                detailIndex: -1,
                detail: {
                    url: ''
                }
            }
        },

        onWebSocket(data) {
            var list = this.state.list;
            var IPList = this.state.IPList;
            list.push(data);
            if (IPList.toString().indexOf(data.address) == -1) {
                IPList.push(data.address);
            }
            this.setState({
                list: list,
                IPList: IPList
            });
        },

        showDetail(index){
            // 判断选中的url
            if (this.state.detailIndex != -1) {
                document.getElementById('tr_' + this.state.detailIndex).className = '';
            }
            document.getElementById('tr_' + index).className = 'info';
            // detail 模块置顶
            document.getElementById('detailDiv').scrollTop = 0;

            this.setState({
                detailIndex: index,
                detail: this.state.list[index]
            });
        },

        setScroll() {
            var scroll = document.getElementById('autoScroll').checked;
            this.setState({
                scroll: scroll
            })
        },

        setSiftIP(IP){
            this.setState({
                siftIP: IP
            })
        },

        handleResize: function () {
            var height = window.innerHeight - 60;
            document.getElementById('listDiv').style.height = height;
            document.getElementById('detailDiv').style.height = height;
            this.setState({
                windowHeight: {height: height}
            })
        },

        componentDidMount: function () {
            window.addEventListener('onresize', this.handleResize);
        },

        componentWillUnmount: function () {
            window.removeEventListener('onresize', this.handleResize);
        },

        componentDidUpdate(){
            // 判断是否开启列表自动滚动
            if (this.state.scroll) {
                var listDiv = document.getElementById('listDiv');
                listDiv.scrollTop = listDiv.scrollHeight;
            }
            // 判断是否已调整页面高度
            var height = window.innerHeight - 60;
            if (height != this.state.windowHeight.height) {
                console.log('todo handleResize');
                this.handleResize()
            }
        },

        render(){
            var debug = false;

            var toolBarParam = {
                scroll: this.state.scroll,
                IPList: this.state.IPList,
                siftIP: this.state.siftIP,
                setScroll: this.setScroll,
                setSiftIP: this.setSiftIP
            };

            var reqListParam = {
                list:this.state.list,
                clickEvent:this.showDetail,
                siftIP:this.state.siftIP
            };
            return (
                <div className="container-fluid">
                    <div className="toolbar">
                        <ToolBar {...toolBarParam}/>
                    </div>
                    <div>
                        <div id="listDiv" className="left-list" style={this.state.windowHeight}>
                            <ReqList {...reqListParam} />
                        </div>
                        <div id="detailDiv" className="right-detail" style={this.state.windowHeight}>
                            <ReqDetail detail={this.state.detail}/>
                        </div>
                    </div>
                    <WebSocket url={socketServer} onMessage={this.onWebSocket} debug={debug}/>
                </div>
            )
        }
    })
    ;

render(<Container />, document.getElementById('container'));
