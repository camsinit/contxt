import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import getContacts from '../global-functions/getContacts';
import randomNumber from '../global-functions/randomNumber';
import requestContactsPermissions from '../global-functions/requestContactsPermissions';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  Pressable,
  ScreenContainer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Modal, Platform, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ContactsImportScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [isImporting, setIsImporting] = React.useState(false);
  const [showDenidedModal, setShowDenidedModal] = React.useState(false);
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [showScreen, setShowScreen] = React.useState(false);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const contactsCountResult = (
          await XANOApi.getContactsCountGET(Constants)
        )?.json;
        console.log(contactsCountResult);
        if (contactsCountResult > 0) {
          navigation.navigate('HomeScreen');
        } else {
          setShowScreen(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          },
          dimensions.width
        )}
      >
        <Pressable
          onPress={() => {
            try {
              /* 'If/Else' action requires configuration: select If Condition */
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Surface
            elevation={1}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.SurfaceStyles(theme)['Surface'], {
                alignItems: 'center',
                borderColor: theme.colors['Light Inverse'],
                borderRadius: 8,
                borderWidth: 1,
                height: 40,
                justifyContent: 'center',
                width: 40,
              }),
              dimensions.width
            )}
          >
            <Icon name={'Entypo/chevron-left'} size={24} />
          </Surface>
        </Pressable>
        <Icon name={'MaterialCommunityIcons/star-four-points'} size={32} />
      </View>
      <>
        {!showScreen ? null : (
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={true}
            viewIsInsideTabBar={true}
          >
            {/* NameForm */}
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, padding: 20 },
                dimensions.width
              )}
            >
              {/* HeaderText */}
              <H2
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.H2Styles(theme)['H2'], {
                    fontSize: 32,
                  }),
                  dimensions.width
                )}
              >
                {'Can we import your contacts, please?'}
              </H2>
              {/* InnerText */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    marginTop: 50,
                  }),
                  dimensions.width
                )}
              >
                {
                  'In Contxt, we link the quotes you keep to the phone number of the person you quoted.\n\nWe don’t share your contact information with third parties. \n\nWe promise. Pinky promise.'
                }
              </Text>
              {/* ImportButton */}
              <Button
                onPress={() => {
                  const handler = async () => {
                    try {
                      const contactsPermissionsResult =
                        await requestContactsPermissions();
                      if (contactsPermissionsResult === 'granted') {
                        setShowImportModal(true);
                        setIsImporting(true);
                        const getContactsData = await getContacts();
                        console.log(getContactsData);
                        (
                          await XANOApi.importContactsPOST(Constants, {
                            contacts: getContactsData,
                          })
                        )?.json;
                        setIsImporting(false);
                        setShowImportModal(false);
                        navigation.navigate('HomeScreen');
                      } else {
                        setShowDenidedModal(true);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'],
                    { marginTop: 60 }
                  ),
                  dimensions.width
                )}
                title={'Import Contacts'}
              />
            </View>
          </KeyboardAwareScrollView>
        )}
      </>
      {/* ImportModal */}
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={showImportModal}
      >
        <BlurView
          intensity={50}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.BlurViewStyles(theme)['Blur View'],
              { alignItems: 'center', justifyContent: 'center' }
            ),
            dimensions.width
          )}
          tint={'default'}
        >
          <Surface
            elevation={0}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.SurfaceStyles(theme)['Surface'], {
                alignItems: 'center',
                backgroundColor: theme.colors['Background'],
                borderRadius: 16,
                paddingBottom: 40,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 40,
                width: '90%',
              }),
              dimensions.width
            )}
          >
            <Icon name={'AntDesign/download'} size={64} />
            <H2
              style={StyleSheet.applyWidth(
                GlobalStyles.H2Styles(theme)['H2'],
                dimensions.width
              )}
            >
              {'Importing contacts'}
            </H2>

            <Text
              accessible={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  textAlign: 'center',
                }),
                dimensions.width
              )}
            >
              {'Just a moment while we bring you people into Contxt'}
            </Text>
          </Surface>
        </BlurView>
      </Modal>
      {/* DenyModal */}
      <>
        {Platform.OS === 'web' ? null : (
          <Modal
            animationType={'slide'}
            transparent={true}
            visible={showDenidedModal}
          >
            <BlurView
              intensity={50}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.BlurViewStyles(theme)['Blur View'],
                  { alignItems: 'center', justifyContent: 'center' }
                ),
                dimensions.width
              )}
              tint={'default'}
            >
              <Surface
                elevation={3}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.SurfaceStyles(theme)['Surface'],
                    {
                      alignItems: 'center',
                      backgroundColor: theme.colors['Light Inverse'],
                      borderRadius: 16,
                      paddingBottom: 40,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 40,
                      width: '90%',
                    }
                  ),
                  dimensions.width
                )}
              >
                <Icon name={'FontAwesome/hand-stop-o'} size={64} />
                <H2
                  style={StyleSheet.applyWidth(
                    GlobalStyles.H2Styles(theme)['H2'],
                    dimensions.width
                  )}
                >
                  {'Access Denied'}
                </H2>

                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      textAlign: 'center',
                    }),
                    dimensions.width
                  )}
                >
                  {
                    'You must enable Contacts permissions to continue using Contxt app. \n\nYou can enable it from  Settings > App Permissions > Contxt app screen'
                  }
                </Text>
                {/* Close Button */}
                <Button
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'CX_AUTH_TOKEN',
                        value: null,
                      });
                      setGlobalVariableValue({
                        key: 'CX_USER',
                        value: null,
                      });
                      setShowDenidedModal(false);
                      navigation.navigate('LoginScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['OutlineButton'],
                      { marginTop: 20 }
                    ),
                    dimensions.width
                  )}
                  title={'Close'}
                />
              </Surface>
            </BlurView>
          </Modal>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(ContactsImportScreen);
