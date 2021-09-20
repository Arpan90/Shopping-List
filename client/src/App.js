import './App.css';
import AppNavbar  from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import { Provider } from 'react-redux';
import { Container  } from 'reactstrap';
import store from './store';
import { loadUser } from './actions/authActions';

function App() {

 useEffect(() => {
    store.dispatch(loadUser());
 },[]);

  return (
    <Provider store={ store } >
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
