import React from 'react';
import TextMedium from '../../../components/TextWrappers/TextMedium';
import { COLORS } from '../../../constants/colors';

const Faq = () => {
  return (
    <TextMedium
      style={{ color: COLORS.white, marginVertical: 20 }}
      numberOfLines={0}>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur saint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum."
    </TextMedium>
  );
};

export default Faq;
