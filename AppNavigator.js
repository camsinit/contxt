import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/Draftbit.js';
import LinkingConfiguration from './LinkingConfiguration.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import * as AuthApiApi from './apis/AuthApiApi.js';
import * as XANOApi from './apis/XANOApi.js';
import * as GlobalVariables from './config/GlobalVariableContext';
import getContacts from './global-functions/getContacts';
import randomNumber from './global-functions/randomNumber';
import requestContactsPermissions from './global-functions/requestContactsPermissions';
import Breakpoints from './utils/Breakpoints';
import useWindowDimensions from './utils/useWindowDimensions';

import ContactsImportScreen from './screens/ContactsImportScreen';
import HomeScreen from './screens/HomeScreen';
import InboxScreen from './screens/InboxScreen';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

export default function RootAppNavigator() {
  const Constants = GlobalVariables.useValues();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#FFFFFF',
        },
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator
        initialRouteName="OnboardingScreen"
        screenOptions={({ navigation }) => ({
          gestureEnabled: false,
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
          headerShown: false,
        })}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
          })}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={({ navigation }) => ({
            gestureEnabled: true,
            title: 'Onboarding',
          })}
        />
        <Stack.Screen
          name="InboxScreen"
          component={InboxScreen}
          options={({ navigation }) => ({
            title: 'Inbox',
          })}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={({ navigation }) => ({
            title: 'Profile',
          })}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={({ navigation }) => ({
            title: 'Signup',
          })}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({ navigation }) => ({
            title: 'Login',
          })}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={({ navigation }) => ({
            title: 'Settings',
          })}
        />
        <Stack.Screen
          name="ContactsImportScreen"
          component={ContactsImportScreen}
          options={({ navigation }) => ({
            title: 'Contacts Import',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});
