import './css/css.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Websocket  from 'react-websocket';
import { socketServer } from '../config'

//class Meun extends Component {
//    render () {
//        return (
//            <div>
//                <h1 className="middle">这是index页面</h1>
//                <h2 className="blue">这是入口index加载的list</h2>
//                <List />
//            </div>
//        );
//    }
//}

class UrlList extends Component {
    render() {
        return (
            <table>
                <tbody>
                {this.props.list.map((row,index) =>{ return <tr key={index}><td>{row.url}</td></tr>;}) }
                </tbody>
            </table>
        )
    }
}

class ShowAll extends Component {

    constructor(props) {
        super(props);
        this.state = {list: [{url:'qweqweqwe'},{url:'asdzdasda'}]};
    }

    handleData(data) {
        this.setState({
            list: list.push(data)
        });
        console.log(list);
    }

    render() {
        //
        //var rows = [];
        console.log('rows');
        var debug = true;
        return (
            <div>
                <p>123123123</p>
                <Websocket url={socketServer} onMessage={this.handleData} debug={debug}/>
                <UrlList list={this.state.list} />
            </div>
        )
    }
}

render(<ShowAll />, document.getElementById('body'));
//render(<Meun />, document.getElementById('list'));