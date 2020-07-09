import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <Navbar className="header-container" color="faded" dark>
        <NavLink to="/" className="header-title-link"><h1 className="header-title">happy trails</h1></NavLink>
        <NavbarToggler onClick={toggleNavbar} className="header-nav-toggler" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={toggleNavbar}  className="header-nav-link" to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggleNavbar}  className="header-nav-link" to="/trails">Search Trails</NavLink>
            </NavItem>
            { props.logged_in &&
              <>
                <NavItem>
                  <NavLink onClick={toggleNavbar}  className="header-nav-link" to={`/user/${props.user_id}`}>Dashboard</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={toggleNavbar}  className="header-nav-link" to={`/user/${props.user_id}/favorites`}>Favorite Trails</NavLink>
                </NavItem>
                <NavItem>
                  <a className="header-nav-link" href= { props.sign_out_route }>Sign Out</a>
                </NavItem>
              </>
            }
             { !props.logged_in &&
             <NavItem>
             <a className="header-nav-link" href= { props.sign_in_route }>Sign In</a>
           </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

export default Header;