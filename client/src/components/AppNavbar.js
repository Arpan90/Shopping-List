import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';
  import RegisterModal from "./auth/RegisterModal";
  import LoginModal from "./auth/LoginModal";
  import Logout from "./auth/Logout";
  import { connect } from 'react-redux';
  import PropTypes from 'prop-types';

  function AppNavBar (props) {

    const [isOpen, setIsOpen] = useState(false);

    function toggle(){
        setIsOpen(!isOpen);
    }

    const { isAuthenticated, user } = props.auth;
    console.log("props: ", props.auth);
    const authLinks = (<>
         <NavItem>
             <span className="navbar-text mr-3" >
                 <strong>{ user ? `Welcome ${user.name}` : '' }</strong>
             </span>
         </NavItem>
         <NavItem>
            <Logout />
        </NavItem>
    </>);

    const guestLinks = (<>
        <NavItem>
            <RegisterModal />
        </NavItem>
        <NavItem>
            <LoginModal />
        </NavItem>
    </>);

    return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5" >
                <Container>
                    <NavbarBrand href="/" >Shopping List</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar >
                        <Nav className="ml-auto" >
                            <NavItem>
                                <NavLink href="https://github.com/Arpan90" >
                                    Github
                                </NavLink>
                            </NavItem>
                            { isAuthenticated ? authLinks : guestLinks }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
  }

  AppNavBar.propTypes = {
      auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state =>({
      auth: state.auth
  });

  export default connect( mapStateToProps , null )( AppNavBar );

