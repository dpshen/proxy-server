//import './css/css.less';
//import 'bootstrap'
import './css/bootstrap/css/bootstrap.css'
import React, { Component } from 'react';
import { render } from 'react-dom';
import Websocket  from 'react-websocket';
import { socketServer } from '../config'
import { Table } from 'react-bootstrap'

import ReqList from './components/ReqList';


var Container = React.createClass({

    render() {
        return (
            <div className="container-fluid">
                <div className="row-fluid">
                    <div id="reqList" className="span2">
                        <ReqList ></ReqList>
                    </div>
			        <div id="detail" className="span10">
			        </div>
		        </div>
	        </div>
        )
    }
});

render(<Container />, document.getElementById('container'));
//render(<Meun />, document.getElementById('list'));