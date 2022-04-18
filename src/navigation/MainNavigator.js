import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RestoreScreen from '../screens/RestoreScreen/RestoreScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import RootBottomNavigation from './RootBottomNavigation/RootBottomNavigation';
import PropertyScreen from '../screens/PropertyScreen/PropertyScreen';
import { HeaderLeft } from '../screens/PropertyScreen/PropertyHeader';
import { HeaderRight as InvestmentHeader } from '../screens/InvestementScreen/Header/InvestmentHeader';
import { COLORS } from '../constants/colors';
import LanguageSelectorScreen from '../screens/LanguageSelectorScreen/LanguageSelectorScreen';
import OnboardScreen from '../screens/OnboardingScreen/OnboardScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen/TransactionHistoryScreen';
import ConfirmRegistrationScreen from '../screens/ConfirmRegistrationScreen/ConfirmRegistrationScreen';
import InvestmentScreen from '../screens/InvestementScreen/InvestementScreen';
import ContractsScreen from '../screens/ContractsScreen/ContractsScreen';
import TokensListScreen from '../screens/TokensListScreen/TokensListScreen';
import TokenScreen from '../screens/TokenScreen/TokenScreen';
import HeaderTitle from '../screens/TokenScreen/Header/HeaderTitle';
import { HeaderRight as TokensHeaderRight } from '../screens/TokenScreen/Header/HeaderRight';
import BundlesScreen from '../screens/BundlesScreen/BundlesScreen';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import KYCScreen from '../screens/KYCScreen/KYCScreen';
import Step2Screen from '../screens/KYCScreen/Step2Screen';
import Step3Screen from '../screens/KYCScreen/Step3Screen';
import Step4Screen from '../screens/KYCScreen/Step4Screen';
import Step5Screen from '../screens/KYCScreen/Step5Scren';
import BiometricsScreen from '../screens/BiometricsScreen/BiometricsScreen';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KYCWeb from '../screens/KYCScreen/KYCWeb';
import ConfirmPasswordResetScreen from '../screens/ConfirmPasswordResetScreen/ConfirmPasswordResetScreen';
import CreateNewPasswordScreen from '../screens/CreateNewPaswordScreen/CreateNewPasswordScreen';
import TermsScreen from '../screens/TermsScreen/TermsScreen';
import FAQScreen from '../screens/FAQScreen/FAQScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen/ChangePasswordScreen';
import EditInvestmentScreen from '../screens/EditInvestmentScreen/EditInvestmentScreen';
import PDFScreen from '../screens/PDFScreen/PDFScreen';
import OpenedPdfScreen from '../screens/OpenedPdfScreen/OpenedPdfScreen';
import I18n from 'i18n-js';
import FirstInvestmentStepsScreen from '../screens/FirstInvestmentStepsScreen/FirstInvestmentStepsScreen';
import PdfModal from '../screens/FirstInvestmentStepsScreen/PdfModal/PdfModal';

const Stack = createStackNavigator();

const { Screen, Navigator } = Stack;

const mainNavigatorScreenOptions = () => ({
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: COLORS.mainBackground,
    elevation: 0,
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: COLORS.white,
  },
  headerLeft: HeaderLeft,
  headerBackTitle: null,
});

const KYCStepsScreenOptions = () => ({
  headerStyle: {
    height: 70,
    backgroundColor: COLORS.linkColor,
    elevation: 0,
    shadowColor: 'transparent',
  },
});

const MainNavigator = () => {
  const [isBiometricsShown, setBiometricsShown] = useState(false);
  const isAuthorized = useSelector(store => store.authorization.isAuthorized);

  useEffect(() => {
    AsyncStorage.getItem('BIOMETRICS_NOT_NOW').then(value => {
      if (value) {
        setBiometricsShown(JSON.parse(value));
      } else {
        setBiometricsShown(true);
      }
    });
  }, []);

  return (
    <Navigator screenOptions={mainNavigatorScreenOptions}>
      {!isAuthorized ? (
        <>
          <Screen
            name={'LanguageSelection'}
            component={LanguageSelectorScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name={'Onboarding'}
            component={OnboardScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name={'SignInScreen'}
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name={'LoginScreen'}
            component={LoginScreen}
            options={{ headerTitle: I18n.t('Login') }}
          />
          <Screen
            name={'Registration'}
            component={RegistrationScreen}
            options={{ headerTitle: I18n.t('Registration') }}
          />
          <Screen
            name={'ConfirmRegistration'}
            component={ConfirmRegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name={'ConfirmPasswordReset'}
            component={ConfirmPasswordResetScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name={'RestoreScreen'}
            component={RestoreScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name={'CreateNewPasswordScreen'}
            component={CreateNewPasswordScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          {isBiometricsShown && (
            <Screen
              name={'Biometrics'}
              component={BiometricsScreen}
              options={{ headerShown: false }}
            />
          )}
          <Screen
            name={'Root'}
            component={RootBottomNavigation}
            options={{ headerShown: false }}
          />
          <Screen
            name={'Property'}
            component={PropertyScreen}
            options={({ route }) => ({
              title: I18n.t('Property'),
              gestureEnabled: false,
            })}
          />
          <Screen name={'Transactions'} component={TransactionHistoryScreen} />
          <Screen
            name={'Investment'}
            component={InvestmentScreen}
            options={props => ({
              title: I18n.t('Investment'),
              headerRight: () => <InvestmentHeader {...props} />,
            })}
          />
          <Screen
            name={'EditInvestment'}
            component={EditInvestmentScreen}
            options={({ route }) => ({
              title: I18n.t('Edit Investment'),
            })}
          />
          <Screen
            name={'PDFScreen'}
            component={PDFScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name={'Contracts'}
            component={ContractsScreen}
            options={{ headerTitle: I18n.t('Contracts') }}
          />
          <Screen
            name={'Tokens'}
            component={TokensListScreen}
            options={{ headerTitle: I18n.t('Tokens') }}
          />
          <Screen
            name={'Token'}
            component={TokenScreen}
            options={params => ({
              headerTitle: () => <HeaderTitle {...params} />,
              // headerRight: props => (
              //   <TokensHeaderRight {...{ ...params, ...props }} />
              // ),
            })}
          />
          <Screen
            name={'Bundles'}
            component={BundlesScreen}
            options={({ route }) => ({
              title: I18n.t('Properties Bundle'),
            })}
          />
          <Screen
            name={'Account'}
            options={{ title: I18n.t('Account') }}
            component={AccountScreen}
          />
          <Screen
            name={'Personal information'}
            component={KYCScreen}
            options={{
              ...KYCStepsScreenOptions(),
              title: I18n.t('Personal Information'),
            }}
          />
          <Screen
            name={'KYC WEB'}
            component={KYCWeb}
            options={KYCStepsScreenOptions}
          />
          <Screen
            name={'Step 2'}
            component={Step2Screen}
            options={() => ({
              ...KYCStepsScreenOptions(),
              title: 'Select your nationality',
            })}
          />
          <Screen
            name={'Step 3'}
            component={Step3Screen}
            options={() => ({
              ...KYCStepsScreenOptions(),
              title: 'Address',
            })}
          />
          <Screen
            name={'Step 4'}
            component={Step4Screen}
            options={() => ({
              ...KYCStepsScreenOptions(),
              title: 'TAX',
            })}
          />
          <Screen
            name={'Step 5'}
            component={Step5Screen}
            options={() => ({
              ...KYCStepsScreenOptions(),
              title: 'Documents',
            })}
          />
          <Screen
            name={'TermsScreen'}
            component={TermsScreen}
            options={({ route }) => ({
              title: I18n.t('Terms and service'),
            })}
          />
          <Screen
            name={'FAQScreen'}
            component={FAQScreen}
            options={({ route }) => ({
              title: I18n.t('FAQ'),
            })}
          />
          <Screen
            name={'ChangePasswordScreen'}
            component={ChangePasswordScreen}
            options={({ route }) => ({
              title: I18n.t('Security'),
            })}
          />
          <Screen
            name={'OpenedPdfScreen'}
            component={OpenedPdfScreen}
            options={({ route }) => ({
              title: `${route.params.item.name}`,
            })}
          />
          <Screen
            name={'FirstInvestmentStepsScreen'}
            component={FirstInvestmentStepsScreen}
            options={params => ({
              gestureEnabled: false,
              headerTitle: () => <HeaderTitle {...params} />,
            })}
          />
          <Screen
            name={'PdfModal'}
            component={PdfModal}
            options={() => ({
              headerShown: false,
              gestureEnabled: false,
            })}
          />
        </>
      )}
    </Navigator>
  );
};

export default MainNavigator;
