import React, { Component } from 'react';
import "../styles/Header.css";
import "../styles/NavBar.css";

import {NavLink} from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
			<div>
	      <nav className="row">
	        <NavLink activeClassName="selected" className="nav-link" exact to="/">
	          Home
	        </NavLink>
	      </nav>
			</div>
    );
  }
}

export default NavBar;
