import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { logout } from '../../actions/authActions';
import {  NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

function Logout(props){

    return(
        <NavLink onClick={props.logout} href="#" >Logout</NavLink>
    );
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout); 