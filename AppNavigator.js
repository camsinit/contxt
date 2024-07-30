import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import palettes from './themes/palettes.js';
import LinkingConfiguration from './LinkingConfiguration.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import * as AuthApiApi from './apis/AuthApiApi.js';
import * as XANOApi from './apis/XANOApi.js';
import * as GlobalVariables from './config/GlobalVariableContext';
import randomNumber from './global-functions/randomNumber';
import requestContactsPermissions from './global-functions/requestContactsPermissions';
import Breakpoints from './utils/Breakpoints';
import useWindowDimensions from './utils/useWindowDimensions';

import AddQuoteHelpScreen from './screens/AddQuoteHelpScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Onboarding1WelcomeScreen from './screens/Onboarding1WelcomeScreen';
import Onboarding2NameScreen from './screens/Onboarding2NameScreen';
import Onboarding3PhoneScreen from './screens/Onboarding3PhoneScreen';
import Onboarding4DOBScreen from './screens/Onboarding4DOBScreen';
import Onboarding5ContactsImportScreen from './screens/Onboarding5ContactsImportScreen';
import Onboarding6NotificationsScreen from './screens/Onboarding6NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuoteBoxScreen from './screens/QuoteBoxScreen';
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
  const theme = useTheme();
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
          gestureEnabled: true,
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
          name="Onboarding1WelcomeScreen"
          component={Onboarding1WelcomeScreen}
          options={({ navigation }) => ({
            gestureEnabled: true,
            title: 'Onboarding - 1 Welcome Screen',
          })}
        />
        <Stack.Screen
          name="QuoteBoxScreen"
          component={QuoteBoxScreen}
          options={({ navigation }) => ({
            title: 'Quote Box',
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
          name="Onboarding5ContactsImportScreen"
          component={Onboarding5ContactsImportScreen}
          options={({ navigation }) => ({
            title: 'Onboarding - 5 Contacts Import',
          })}
        />
        <Stack.Screen
          name="Onboarding2NameScreen"
          component={Onboarding2NameScreen}
          options={({ navigation }) => ({
            title: 'Onboarding - 2 Name',
          })}
        />
        <Stack.Screen
          name="Onboarding3PhoneScreen"
          component={Onboarding3PhoneScreen}
          options={({ navigation }) => ({
            title: 'Onboarding - 3 Phone',
          })}
        />
        <Stack.Screen
          name="Onboarding6NotificationsScreen"
          component={Onboarding6NotificationsScreen}
          options={({ navigation }) => ({
            title: 'Onboarding -  6  Notifications',
          })}
        />
        <Stack.Screen
          name="AddQuoteHelpScreen"
          component={AddQuoteHelpScreen}
          options={({ navigation }) => ({
            title: 'Add Quote Help Screen',
          })}
        />
        <Stack.Screen
          name="Onboarding4DOBScreen"
          component={Onboarding4DOBScreen}
          options={({ navigation }) => ({
            title: 'Onboarding - 4 DOB',
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
