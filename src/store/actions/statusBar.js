import { SET_ROUTER_COLOR, SET_STATUS_BAR_COLOR } from '../types';

export const setStatusBarColor = color => ({
  type: SET_STATUS_BAR_COLOR,
  payload: color,
});

export const setRouterColor = color => ({
  type: SET_ROUTER_COLOR,
  payload: color,
});
