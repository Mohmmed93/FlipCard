import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './reducers';
import rootSaga from './sagas';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];

const persistConfig: any = {enhancers};
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig);
const configureStore = () => {
  return {persistor, store};
};

sagaMiddleware.run(rootSaga);

export default configureStore;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
