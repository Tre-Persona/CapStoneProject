import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
            { props.logged_in &&
             <NavItem>
             <NavLink href= { props.sign_out_route }>Sign Out</NavLink>
           </NavItem>
            }  
             { !props.logged_in &&
             <NavItem>
             <NavLink href= { props.sign_in_route }>Sign In</NavLink>
           </NavItem>
            }  
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;