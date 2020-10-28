import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import reducer from "../reducers";
import saga from "../sagas";

export const makeStore = context => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, /*context, */applyMiddleware(sagaMiddleware));

  store.sagaTask = sagaMiddleware.run(saga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
