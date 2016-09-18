import React from 'react';

var reactBootStrap = require('react-bootstrap');
console.log(reactBootStrap)
const {
    Nav,
    Button,
    ButtonGroup,
    DropdownButton,
    MenuItem,
    Input

} = reactBootStrap;

export default class ToolBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        var dropDownTitle = this.props.siftIP;
        var clearList = this.props.clearList;
        if (this.props.siftIP == 'ALL') {
            dropDownTitle = '不过滤IP ';
        }
        return (
            <Nav justified={true} pullRight={true}>
                <ButtonGroup>
                    <Button className="glyphicon glyphicon-refresh" onClick={clearList}/>
                </ButtonGroup>
                <DropdownButton id="dropdown-ipfilter" title={dropDownTitle}>
                    <MenuItem onClick={this.props.setSiftIP.bind(null, 'ALL')}>不过滤IP</MenuItem>
                    { this.props.IPList.map((ip, index) =>
                        <MenuItem key={index} onClick={this.props.setSiftIP.bind(null, ip)}>{ip}</MenuItem>)}
                </DropdownButton>
                <ButtonGroup >
                    <label>
                        <input type="checkbox" defaultChecked={true} id="autoScroll"
                               onClick={this.props.setScroll.bind(null, 1)}/><span>滚动</span>
                    </label>
                </ButtonGroup>
                <ButtonGroup >
                    <Input type="text" onChange={this.props.changeFilter} placeholder="输入关键词过滤"/>
                </ButtonGroup>
            </Nav>

        )
    }
}

