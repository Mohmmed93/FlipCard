import React, {Component} from 'react';
import Navigation from './src/navigation';
import configureStore from './src/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';

const {persistor, store} = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
