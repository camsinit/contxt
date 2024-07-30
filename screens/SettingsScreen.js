import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import ContactsViewBlock from '../components/ContactsViewBlock';
import PermissionsLabelBlock from '../components/PermissionsLabelBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import getContactPermissionsStatus from '../global-functions/getContactPermissionsStatus';
import getLocationPermissionsStatus from '../global-functions/getLocationPermissionsStatus';
import getNotificationPermissionsStatus from '../global-functions/getNotificationPermissionsStatus';
import requestLocationPermissions from '../global-functions/requestLocationPermissions';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { Text, View } from 'react-native';

const SettingsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [contactsPermissionsStatus, setContactsPermissionsStatus] =
    React.useState('');
  const [locationPermissionsStatus, setLocationPermissionsStatus] =
    React.useState('');
  const [notificationPermissionsStatus, setNotificationPermissionsStatus] =
    React.useState('');
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const contactsPermissionsResult = await getContactPermissionsStatus();
        setContactsPermissionsStatus(contactsPermissionsResult);
        const notificationPermissionsResult =
          await getNotificationPermissionsStatus();
        setNotificationPermissionsStatus(notificationPermissionsResult);
        const locationPermissionsResult = await getLocationPermissionsStatus();
        setLocationPermissionsStatus(locationPermissionsResult);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      {/* Body */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App.EEEEEE,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            flex: 1,
            gap: 5,
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { gap: 10, margin: '5%' },
            dimensions.width
          )}
        >
          {/* Title View */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row' },
              dimensions.width
            )}
          >
            {/* Filler */}
            <View
              style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
            />
            {/* Settings */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flex: 1 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontFamily: 'System', fontSize: 16, fontWeight: '700' }
                  ),
                  dimensions.width
                )}
              >
                {'Settings'}
              </Text>
            </View>
            {/* Done */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'flex-end', alignSelf: 'center', flex: 1 },
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      { fontFamily: 'System', fontWeight: '600' }
                    ),
                    dimensions.width
                  )}
                >
                  {'Done'}
                </Text>
              </Pressable>
            </View>
          </View>
          {/* Image */}
          <View
            style={StyleSheet.applyWidth(
              { alignSelf: 'center', margin: '3%' },
              dimensions.width
            )}
          >
            <Pressable
              onPress={() => {
                try {
                  navigation.navigate('ProfileScreen', {
                    id: Constants['CX_USER']?.id,
                    type: 'user',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <ContactsViewBlock
                avatarSize={50}
                contact={Constants['CX_USER']}
                imageOnly={true}
              />
            </Pressable>
          </View>
          {/* System Permissions */}
          <View
            style={StyleSheet.applyWidth({ padding: '3%' }, dimensions.width)}
          >
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['Custom Gray'],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '600',
                  }
                ),
                dimensions.width
              )}
            >
              {'System Permissions'}
            </Text>
          </View>

          <Surface
            {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
            elevation={2}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                { borderRadius: 10, gap: 20, padding: '3%' }
              ),
              dimensions.width
            )}
          >
            {/* ContactsPressable */}
            <Pressable
              onPress={() => {
                try {
                  Linking.openURL('app-settings:');
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* Row */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row', justifyContent: 'space-between' },
                  dimensions.width
                )}
              >
                {/* Left */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.App['Custom Gray'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '600',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Contacts'}
                  </Text>
                </View>
                <PermissionsLabelBlock />
              </View>
            </Pressable>

            <Pressable
              onPress={() => {
                const handler = async () => {
                  try {
                    if (notificationPermissionsStatus === 'granted') {
                      const result = await getPushTokenUtil({
                        permissionErrorMessage:
                          'Sorry, we need notifications permissions to make this work.',
                        deviceErrorMessage:
                          'Must use physical device for Push Notifications.',
                        showAlertOnPermissionError: true,
                        showAlertOnDeviceError: true,
                      });
                    } else {
                      Linking.openURL('app-settings:');
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* Row */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row', justifyContent: 'space-between' },
                  dimensions.width
                )}
              >
                {/* Left */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.App['Custom Gray'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '600',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Push Notifications'}
                  </Text>
                </View>
                <PermissionsLabelBlock />
              </View>
            </Pressable>
            {/* LocationPressable */}
            <Pressable
              onPress={() => {
                const handler = async () => {
                  try {
                    /* hidden 'Open App Link' action */
                    if (locationPermissionsStatus === 'granted') {
                    } else {
                      const requestResult = await requestLocationPermissions();
                      if (requestResult !== 'granted') {
                        Linking.openURL('app-settings:');
                      }
                      setLocationPermissionsStatus(requestResult);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* Row  */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row', justifyContent: 'space-between' },
                  dimensions.width
                )}
              >
                {/* Left */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.App['Custom Gray'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '600',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Location'}
                  </Text>
                </View>
                <PermissionsLabelBlock />
              </View>
            </Pressable>
          </Surface>
          {/* About */}
          <View
            style={StyleSheet.applyWidth({ padding: '3%' }, dimensions.width)}
          >
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['Custom Gray'],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '600',
                  }
                ),
                dimensions.width
              )}
            >
              {'About'}
            </Text>
          </View>

          <Surface
            {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
            elevation={2}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                { borderRadius: 10, gap: 20, padding: '3%' }
              ),
              dimensions.width
            )}
          >
            {/* Row */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-between' },
                dimensions.width
              )}
            >
              {/* Left */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: palettes.App['Custom Gray'],
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '600',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Contacts'}
                </Text>
              </View>
            </View>
            {/* Row */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'flex-start' },
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    setGlobalVariableValue({
                      key: 'CX_USER',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'CX_AUTH_TOKEN',
                      value: '',
                    });
                    setGlobalVariableValue({
                      key: 'RECENT_CONTACTS',
                      value: [],
                    });
                    navigation.navigate('Onboarding1WelcomeScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: palettes.App['Custom Red'],
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '600',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Sign Out'}
                </Text>
              </Pressable>
            </View>
          </Surface>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(SettingsScreen);
