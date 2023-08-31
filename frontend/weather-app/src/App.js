import './App.css';
import MainPage from './components/MainPage';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import React from 'react';


function App() {

  return (
    <Provider store={store}>
      <MainPage />
    </Provider >
  );
}

export default App;
