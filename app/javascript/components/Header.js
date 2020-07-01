import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">happytrails</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink to ="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to ="/trails">Search Trails</NavLink>
            </NavItem>
            { props.logged_in &&
              <>
                <NavItem>
                  <NavLink to={`/user/${props.user_id}`}>User Dashboard</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`/user/${props.user_id}/favorites`}>Favorite Trails</NavLink>
                </NavItem>
                <NavItem>
                  <a href= { props.sign_out_route }>Sign Out</a>
                </NavItem>
              </>
            }
             { !props.logged_in &&
             <NavItem>
             <a href= { props.sign_in_route }>Sign In</a>
           </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
