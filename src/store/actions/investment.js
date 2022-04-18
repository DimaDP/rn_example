import handleSentry from '../../utils/handleSentry';
import axios from 'axios';

const getInvestmentInfo = () => async dispatch => {
  try {
    const { data } = await axios.get(``);
  } catch (e) {
    handleSentry(e, '');
  }
};
