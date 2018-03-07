import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import customersReducer from '../reducers/customers';
import contentReducer from '../reducers/content';
import authReducer from '../reducers/authentication';
import loadingReducer from '../reducers/loading';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    combineReducers({
      customers: customersReducer,
      content: contentReducer,
      auth: authReducer,
      loading: loadingReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
};
