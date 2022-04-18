import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashBoardTabIcon, SettingsTabIcon, HomeTabIcon } from './icons/icons';
import { COLORS } from '../../constants/colors';
import { TabBarLabel } from './TabBarLabel';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import DashboardScreen from '../../screens/DashboardScreen/DashboardScreen';
import FavoritesScreen from '../../screens/SettingsScreen/SettingsScreen';
import I18n from 'i18n-js';

const Tab = createBottomTabNavigator();

const homeTabBarNavigationOptions = () => {
  return {
    tabBarLabel: ({ focused }) => (
      <TabBarLabel focused={focused} name={I18n.t('Home')} />
    ),
    headerShown: false,
    tabBarIcon: HomeTabIcon,
  };
};

const favoritesTabBarNavigationOptions = () => {
  return {
    tabBarLabel: ({ focused }) => (
      <TabBarLabel focused={focused} name={I18n.t('Settings')} />
    ),
    headerShown: false,
    tabBarIcon: SettingsTabIcon,
  };
};

const dashboardTabBarNavigationOptions = () => {
  return {
    tabBarLabel: ({ focused }) => (
      <TabBarLabel focused={focused} name={I18n.t('My Tokens')} />
    ),
    headerShown: false,
    tabBarIcon: DashBoardTabIcon,
  };
};

const RootBottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: '#2A3143',
          position: 'absolute',
          borderTopColor: 'transparent',
          height: 85,
          paddingTop: 12,
          shadowColor: '#242636',
          shadowOffset: {
            width: 0,
            height: -15,
          },
          shadowOpacity: 0.7,
          shadowRadius: 17,
        },
        tabBarItemStyle: {
          flexDirection: 'column',
          height: 50,
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.inActiveTabIcon,
      }}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={homeTabBarNavigationOptions}
      />
      <Tab.Screen
        name='Dashboard'
        component={DashboardScreen}
        options={dashboardTabBarNavigationOptions}
      />
      <Tab.Screen
        name='Settings'
        component={FavoritesScreen}
        options={favoritesTabBarNavigationOptions}
      />
    </Tab.Navigator>
  );
};

export default RootBottomNavigation;
