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


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
};

export default function(state = initialState, action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            }
        
        case USER_LOADED:
            console.log("loaded payload is: ", action.payload);
            return{
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            }

            case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
                console.log("success payload is: ", action.payload);
                localStorage.setItem('token', action.payload.token);
                return{
                    ...state,
                    ...action.payload,
                    isLoading: false,
                    isAuthenticated: true,
                    user: action.payload.user
                }

            case LOGIN_FAIL:
            case LOGOUT_SUCCESS:
            case AUTH_ERROR:
            case REGISTER_FAIL:
                localStorage.removeItem('token');
                return{
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    user: null
                }

            default:
                return state;
    }
}