import { SET_ROUTER_COLOR, SET_STATUS_BAR_COLOR } from '../types';
import { COLORS } from '../../constants/colors';

const initialState = {
  color: COLORS.mainBackground,
  routerColor: COLORS.mainBackground,
};

const statusBar = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_STATUS_BAR_COLOR:
      return {
        ...state,
        color: payload,
      };
    case SET_ROUTER_COLOR:
      return {
        ...state,
        routerColor: payload,
      };
    default:
      return state;
  }
};

export default statusBar;
