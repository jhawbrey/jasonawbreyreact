import React, { Component } from 'react';
import { Link } from 'react-router';
import { stack as Menu } from 'react-burger-menu';
import Radium from 'radium';

let RadiumLink = Radium(Link);


import './nav.css';
import '../../App.css';

class MenuWrap extends Component {
  constructor(props) {
     super(props);
     this.state = {
         hidden: false,
     };
 }

  componentWillReceiveProps(nextProps) {
    const sideChanged = this.props.children.props.right !== nextProps.children.props.right;
    if (sideChanged) {
      this.setState({hidden : true});

      setTimeout(() => {
        this.show();
      }, this.props.wait);
    }
  }

  show() {
    this.setState({hidden : false});
  }

  render() {
    let style;

    if (this.state.hidden) {
      style = {display: 'none'};
    }

    return (
      <div style={style} className='right'>
        {this.props.children}
      </div>
    )
  }
}

class Nav extends Component {

  getItems() {
    let items;

    items = [
      <RadiumLink to='/' className="nav__link" key={1}>Home</RadiumLink>,
      <RadiumLink to='/about' className="nav__link" key={2}>About</RadiumLink>,
      <RadiumLink to='/schedule' className="nav__link" key={3}>Schedule</RadiumLink>,
      <RadiumLink to='/audio' className="nav__link" key={4}>Audio</RadiumLink>
    ];

    return items;
  }
  render() {
    return(
      <MenuWrap wait={20} side={'right'}>
        <Menu isOpen={false} id={'elastic'} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} right>
          {this.getItems()}
        </Menu>
      </MenuWrap>
    )
  }
}

export default Nav;
