import { combineReducers } from 'redux';
import statusBar from './statusBar';
import authorization from './authorization';
import kyc from './kyc';
import tokens from './tokens';
import graph from './graph';
import investment from './investment';
import settings from './settings';
import transactions from './transactions';

const root = combineReducers({
  authorization,
  statusBar,
  kyc,
  tokens,
  graph,
  investment,
  settings,
  transactions,
});

export default root;
