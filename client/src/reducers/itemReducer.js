import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

// const uuid = require('uuid').v4;

const initialState = {
    items: [
        // {id: uuid(), name: 'Eggs'},
        // {id: uuid(), name: 'Milk'},
        // {id: uuid(), name: 'Steak'}, 
        // {id: uuid(), name: 'Candy'}
    ],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items: action.payload
            };
        
        case ADD_ITEM:  
            return{
                    ...state,
                    items: [ action.payload, ...state.items ],
                    loading: false
                };

        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter(item => item._id !== action.payload )
            }
        
        case ITEMS_LOADING :
            console.log("item loading")
            return{
                ...state,
                loading:true
            }

        default:
            return state;
    }
}