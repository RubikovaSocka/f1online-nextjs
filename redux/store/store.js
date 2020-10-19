import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import saga from "../sagas";

const makeStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  store.sagaTask = sagaMiddleware.run(saga);
  return store;
};

export default makeStore;
