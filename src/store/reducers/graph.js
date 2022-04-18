import { GET_TOKENS_GRAPH } from '../types';

const initialState = {
  graph: null,
};

const graph = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TOKENS_GRAPH:
      return {
        ...state,
        graph: payload,
      };
    default:
      return state;
  }
};

export default graph;
