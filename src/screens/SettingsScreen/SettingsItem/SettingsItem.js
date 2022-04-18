import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import { COLORS } from '../../../constants/colors';
import Account from '../../../assets/icons/account.svg';
import Security from '../../../assets/icons/security.svg';
import Payments from '../../../assets/icons/payment.svg';
import Support from '../../../assets/icons/support.svg';
import MyDocuments from '../../../assets/icons/my_documents.svg';
import FAQ from '../../../assets/icons/faq.svg';
import Language from '../../../assets/icons/lang.svg';
import About from '../../../assets/icons/about.svg';
import Rate from '../../../assets/icons/rate.svg';
import ChevronRight from '../../../assets/icons/chvron_right.svg';
import { useNavigation } from '@react-navigation/native';
import { setAuthorizationFail } from '../../../store/actions/authorization';
import { useDispatch } from 'react-redux';
import LogoutModal from '../../../components/LogoutModal/LogoutModal';
import TextLight from '../../../components/TextWrappers/TextLight';
import config from '../../../constants/default';

const setIcon = fill => ({
  account: <Account fill={fill} />,
  security: <Security fill={fill} />,
  payments: <Payments fill={fill} />,
  support: <Support fill={fill} />,
  'my documents': <MyDocuments fill={fill} />,
  FAQ: <FAQ fill={fill} />,
  language: <Language fill={fill} />,
  about: <About fill={fill} />,
  'rate the app': <Rate fill={fill} />,
  'terms and service': <About fill={fill} />,
  logout: <About fill={fill} />,
});

const redirectItems = ['about', 'rate the app', 'terms and service'];

const SettingsItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [withRedirect, setWithRedirect] = useState(false);
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);

  let fill = COLORS.white;
  if (item.name === 'logout') {
    fill = COLORS.errorColor;
  }

  useEffect(() => {
    if (redirectItems.includes(item.name)) {
      setWithRedirect(true);
    }
  }, []);

  const onPress = () => {
    if (item.name === 'logout') {
      setIsOpenLogoutModal(true);
      return;
    }
    navigation.navigate(item.route);
  };

  const closeLogoutModal = () => setIsOpenLogoutModal(false);
  const logout = () => dispatch(setAuthorizationFail());

  const isAbout = item.name === 'about';

  return (
    <TouchableOpacity onPress={onPress}>
      {isOpenLogoutModal && (
        <LogoutModal
          handleClose={closeLogoutModal}
          isVisible={isOpenLogoutModal}
          logout={logout}
        />
      )}
      <View
        style={[
          styles.container,
          {
            borderBottomColor: withRedirect
              ? COLORS.favoriteButtonColor
              : COLORS.transparent,
            borderTopColor: isAbout
              ? COLORS.favoriteButtonColor
              : COLORS.transparent,
          },
        ]}>
        <View style={styles.name}>
          {setIcon(fill)[item.name]}
          <TextRegular
            style={{
              ...styles.text,
              color: fill,
              textTransform: item.name === 'FAQ' ? 'none' : 'capitalize',
            }}>
            {item.name}
          </TextRegular>
        </View>
        {!withRedirect && item.name !== 'logout' && (
          <ChevronRight style={styles.right} />
        )}
        {item.name === 'about' && (
          <TextLight style={styles.version}>
            {config.isProd
              ? `v.${config.version}`
              : `develop v.${config.version}`}
          </TextLight>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4,
    borderTopWidth: 0.4,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 15,
    // textTransform: 'capitalize',
  },
  right: {},
  version: {
    color: COLORS.darkTextColor,
    fontSize: 14,
  },
});

export default SettingsItem;
