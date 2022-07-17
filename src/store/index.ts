import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

import rootReducers from '../store/reducers';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig: any = {enhancers};
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  console.log('Test', store.getState());
});
const configureStore = () => {
  return {persistor, store};
};

sagaMiddleware.run(sagas);

export default configureStore;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
