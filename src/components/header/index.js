import React, { Component } from 'react';

import './header.css';
import '../../App.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container group">
          <h1 className="logo">Jason Awbrey</h1>
        </div>
      </header>
    )
  }
}

export default Header;
