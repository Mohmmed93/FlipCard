import React, {Component} from 'react';
import Navigation from './src/navigation';
import configureStore from './src/redux/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

const {persistor, store} = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0)"
          barStyle={'dark-content'}
          translucent={true}
        />
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
