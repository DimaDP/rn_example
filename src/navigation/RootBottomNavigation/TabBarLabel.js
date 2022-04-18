import React from 'react';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { COLORS } from '../../constants/colors';

export const TabBarLabel = ({ name, focused }) => (
  <TextRegular
    style={{
      color: focused ? COLORS.white : COLORS.inActiveTabIcon,
      fontSize: 12,
      marginTop: 15,
    }}>
    {name}
  </TextRegular>
);
