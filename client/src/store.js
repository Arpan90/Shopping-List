import { applyMiddleware, createStore, compose } from 'redux'; // compose is needed to use redux devtools in chrome
import rootReducer from './reducers'; // no need to specify the js file as it is named index.js
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];
let store;

if (window.navigator.userAgent.includes('Chrome')) { // Redux devtools work only in Chrome, and cause an error in other broswers in the production build.
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware), 
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
  } 
  
  else {
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware)
        )
    );
  }

export default store;
