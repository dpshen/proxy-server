import './css/css.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Websocket  from 'react-websocket';
import { socketServer } from '../config'


var UrlList = React.createClass({


    click: function (index) {
        console.log(index);
    },


    render() {
        return (
            <table>
                <tbody>
                {this.props.list.map((row, index) => {
                    return <tr key={index} onClick={this.click.bind(this,index)}>
                        <td> {row.url}</td>
                    </tr>;
                }) }
                </tbody>
            </table>
        )
    }
});

var ShowAll = React.createClass({

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
        console.log('rows');
        var debug = false;
        return (
            <div>
                <Websocket url={socketServer} onMessage={this.handleData} debug={debug}/>
                <UrlList list={this.state.list}/>
            </div>
        )
    }
});

render(<ShowAll />, document.getElementById('body'));
//render(<Meun />, document.getElementById('list'));