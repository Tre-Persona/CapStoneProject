import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Button, Nav, NavItem, NavLink } from 'reactstrap';
// import { NavLink } from 'react-router-dom'

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <Navbar className="header-container" color="faded" dark>
        <NavLink to="/" className="header-title-link"><h1 className="header-title">happy trails</h1></NavLink>

        <div className="header-nav-search-toggler-wrapper">
          <NavLink className="header-nav-search-link" to="/trails">
            <div className="header-nav-search-button">
              Search Trails
            </div>
          </NavLink>
          

          <NavbarToggler onClick={toggleNavbar} className="header-nav-toggler" />
        </div>

          <Collapse isOpen={!collapsed} navbar>
            <div className="header-nav-group">
            <Nav navbar className="header-nav-all-wrapper">

              {props.logged_in &&
                <>
                  <NavItem className="header-nav-dashboard-wrapper">

                    <NavLink onClick={toggleNavbar} className="header-nav-link" to={`/user/${props.user_id}`}>Dashboard</NavLink>

                    <NavLink onClick={toggleNavbar} className="header-nav-link" to={`/user/${props.user_id}`}><img src={props.avatar} className="header-nav-avatar" /></NavLink>

                  </NavItem>

                  <NavItem>
                    <NavLink onClick={toggleNavbar} className="header-nav-link" to={`/user/${props.user_id}/favorites`}>Favorite Trails</NavLink>
                  </NavItem>
                  <NavItem>
                    <a className="header-nav-link" href={props.sign_out_route}>Sign Out</a>
                  </NavItem>
                </>
              }
              {!props.logged_in &&
                <NavItem>
                  <a className="header-nav-link" href={props.sign_in_route}>Sign In</a>
                </NavItem>
              }
              {!props.logged_in &&
                <NavItem>
                  <a className="header-nav-link" href={props.sign_up_route}>Sign Up</a>
                </NavItem>
              }
            </Nav>
            </div>
          </Collapse>
      </Navbar>
    </>
  );
}

export default Header;