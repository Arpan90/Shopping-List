import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED, 
    USER_LOADING, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    REGISTER_FAIL, 
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    AUTH_ERROR
} from '../actions/types';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });
    
    axios.get('/api/auth/user', tokenConfig(getState) )
         .then(res => dispatch({
             type: USER_LOADED,
             payload: res.data
         }))
         .catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status));
             dispatch({
                 type: AUTH_ERROR
             });
         });
} 

// Register user

export const register = ({ name, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-type':  'application/json'
        }
    }

    // Request body
    console.log("authactions body: ", { name, email, password })
    const body = JSON.stringify({ name, email, password });
    axios.post('/api/users', body, config)
         .then(res => dispatch({
             type: REGISTER_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
             dispatch({
                 type: REGISTER_FAIL
             });
         });
}

// Login user

export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-type':  'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, password });
    axios.post('/api/auth', body, config)
         .then(res => dispatch({
             type: LOGIN_SUCCESS,
             payload: res.data
         }))
         .catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
             dispatch({
                 type: LOGIN_FAIL
             });
         });
}


// Logout user
export const logout = () => { // we do not need dispatch() here as logout works purely on frontend with no async calls to backend.
    return {
        type: LOGOUT_SUCCESS
    };
};

// Setup config/headers and token 
export const tokenConfig = getState => { // helper function to retrieve token from local storage
     // Get token from localStorage
    const token = getState().auth.token; // getState() is a redux store method. For more: https://redux.js.org/api/store#getstate

    // Headers
    const config = {
        headers: {
            'Content-type':  'application/json'
        }
    }

    // If token add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}
