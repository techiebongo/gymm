import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import appReducer from "./Reducers/index"
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react'
import rootSaga from './Saga/index'

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['loginReducer'] // see "Merge Process" section for details.
}

const persistedReducer = persistReducer(persistConfig, appReducer)

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware),
);

// console.log("appReducer--->", appReducer)
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
// console.log("appReducer===>"+JSON.stringify(persistor))
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
