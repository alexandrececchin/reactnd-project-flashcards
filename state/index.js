import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import {all, takeLatest } from 'redux-saga/effects';

import rootSaga from "./operationsSaga"
import decks from "./reducers"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(decks, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
