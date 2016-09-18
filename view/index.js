import 'bootstrap/dist/css/bootstrap.css'
import './css/index.less';

import React, {Component} from 'react';
import WebSocket  from 'react-websocket';
import {render} from 'react-dom';
import {socketServer} from '../config'

import ReqList from './components/ReqList';
import ReqDetail from './components/ReqDetail';
import ToolBar from './components/ToolBar';

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scroll: true,
            siftIP: 'ALL',
            filter: null,
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
    }

    onWebSocket(data) {
        var list = this.state.list;
        var IPList = this.state.IPList;
        try {
            data = JSON.parse(data)
        } catch (e) {

        }
        list.push(data);
        if (!IPList.includes(data.address)) {
            IPList.push(data.address);
        }
        this.setState({
            list: list,
            IPList: IPList
        });
    }

    showDetail(index) {
        // 判断选中的url
        if (this.state.detailIndex != -1) {
            document.getElementById('tr_' + this.state.detailIndex).className = '';
        }
        document.getElementById('tr_' + index).className = 'info';
        // detail 模块置顶
        let detailDiv = document.getElementById('detailDiv');
        if (detailDiv) {
            document.getElementById('detailDiv').scrollTop = 0;
        }

        this.setState({
            detailIndex: index,
            detail: this.state.list[index]
        });
    }

    setScroll() {
        var scroll = document.getElementById('autoScroll').checked;
        this.setState({
            scroll: scroll
        })
    }

    setSiftIP(IP) {
        this.setState({
            siftIP: IP
        })
    }

    clearList(){
        this.setState({
            list: [],
            IPList: []
        });
    }

    handleResize() {
        var height = window.innerHeight - 60;
        this.setState({
            windowHeight: {height: height}
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    componentDidUpdate() {
        // 判断是否开启列表自动滚动
        if (this.state.scroll) {
            var listDiv = document.getElementById('listDiv');
            listDiv.scrollTop = listDiv.scrollHeight;
        }
        // 判断是否已调整页面高度
        var height = window.innerHeight - 60;
        if (height != this.state.windowHeight.height) {
            this.handleResize()
        }
    }

    removeDetail() {
        this.setState({
            detailIndex: -1
        })
    }

    changeFilter(e){
        this.setState({
            filter:e.target.value
        })
    }

    render() {
        var debug = false;

        let {scroll, list, IPList, siftIP,filter, detailIndex, detail, windowHeight} = this.state;
        let setScroll = this.setScroll.bind(this);
        let setSiftIP = this.setSiftIP.bind(this);
        let removeDetail = this.removeDetail.bind(this);
        let clearList = this.clearList.bind(this);

        var toolBarParam = {
            scroll,
            IPList,
            siftIP,
            setScroll,
            setSiftIP,
            clearList,
            changeFilter: this.changeFilter.bind(this)
        };

        var reqListParam = {
            filter,
            list,
            siftIP,
            clickEvent: this.showDetail.bind(this),
        };
        let detailBlock = null;
        let detailBlockClose = null;
        let listClass = "req-list full-list";
        if (detailIndex >= 0) {
            detailBlock = (
                <div id="detailDiv" className="req-detail" style={windowHeight}>
                    <ReqDetail detail={detail}/>
                </div>
            );
            detailBlockClose = (
                <div className="req-detail-close" onClick={removeDetail}>
                    <span className="glyphicon glyphicon-remove"/>
                </div>
            );
            listClass = "req-list left-list";
        }
        return (
            <div className="page">
                <div className="toolbar p-lr-10">
                    <ToolBar {...toolBarParam}/>
                </div>
                <div className="main-container p-lr-10">
                    <div id="listDiv" className={listClass} style={windowHeight}>
                        <ReqList {...reqListParam} />
                    </div>
                    {detailBlock}
                    {detailBlockClose}
                </div>
                <WebSocket url={socketServer} onMessage={this.onWebSocket.bind(this)} debug={debug}/>
            </div>
        )
    }
}

render(<Container />, document.getElementById('Page'));
