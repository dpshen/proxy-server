import React from 'react';
import {ButtonToolbar, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap'

var ToolBar = React.createClass({


    render() {
        var dropDownTitle = this.props.siftIP;
        if (this.props.siftIP == 'ALL') {
            dropDownTitle = ' 不过滤IP ';
        }
        return (
            <ButtonToolbar>
                <DropdownButton id={this.props.siftIP} title={dropDownTitle}>
                    <MenuItem id="-1" onClick={this.props.setSiftIP.bind(null, 'ALL')}>不过滤IP</MenuItem>
                    { this.props.IPList.map((ip, index) => {
                        return <MenuItem id={index} key={index} onClick={this.props.setSiftIP.bind(null,ip)}>{ip}</MenuItem>
                    })}
                </DropdownButton>
                <ButtonGroup className="checkbox">
                    <label>
                        <input type="checkbox" defaultChecked={true} id="autoScroll" onClick={this.props.setScroll.bind(null,1)}/><span>autoScroll</span>
                    </label>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
});

exports['default'] = ToolBar;
module.exports = exports['default'];