import axios from 'axios';
import handleSentry from '../../utils/handleSentry';
import { GET_TOKENS_GRAPH } from '../types';

export const getTokensGraph = () => async dispatch => {
  try {
    const { data } = await axios.get('api/tokens/graph/mobile');
    dispatch({
      type: GET_TOKENS_GRAPH,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, 'api/tokens/graph/mobile');
  }
};
