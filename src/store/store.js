import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Reactotron from '../../ReactotronConfig';
import root from './reducers/root';

const middleWare = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  root,
  composeEnhancers(middleWare, Reactotron.createEnhancer()),
);

export default store;
