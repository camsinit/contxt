import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import getContacts from '../global-functions/getContacts';
import randomNumber from '../global-functions/randomNumber';
import requestContactsPermissions from '../global-functions/requestContactsPermissions';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  Markdown,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Image, Modal, Platform, Text, View } from 'react-native';

const Onboarding5ContactsImportScreen = props => {
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
        if (contactsCountResult > 0) {
          navigation.navigate('Onboarding6NotificationsScreen');
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
    <ScreenContainer scrollable={false} hasSafeArea={true}>
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
            {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
            elevation={1}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                {
                  alignItems: 'center',
                  borderColor: theme.colors['Light Inverse'],
                  borderRadius: 8,
                  borderWidth: 1,
                  height: 40,
                  justifyContent: 'center',
                  width: 40,
                }
              ),
              dimensions.width
            )}
          >
            <Icon size={24} name={'Entypo/chevron-left'} />
          </Surface>
        </Pressable>
        <Icon name={'MaterialCommunityIcons/star-four-points'} size={32} />
      </View>
      <>
        {!showScreen ? null : (
          <SimpleStyleKeyboardAwareScrollView
            enableAutomaticScroll={false}
            enableResetScrollToCoords={false}
            showsVerticalScrollIndicator={true}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'always'}
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
                selectable={false}
                {...GlobalStyles.H2Styles(theme)['H2'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.H2Styles(theme)['H2'].style, {
                    fontSize: 32,
                  }),
                  dimensions.width
                )}
              >
                {'Let’s bring your people into Contxt!'}
              </H2>
              {/* InnerText */}
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      fontFamily: 'Poppins_400Regular_Italic',
                      fontSize: 20,
                      marginTop: 10,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {
                  'Quotes are linked to the phone number of the people you quote\n'
                }
              </Text>
              {/* InnerText 2 */}
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontFamily: 'Poppins_700Bold', marginTop: 20 }
                  ),
                  dimensions.width
                )}
              >
                {'Once imported, you can'}
              </Text>

              <Markdown
                style={StyleSheet.applyWidth(
                  { marginTop: 10 },
                  dimensions.width
                )}
              >
                {
                  '- Delete your contact data anytime\n- Email me if you have any questions'
                }
              </Markdown>
              {/* ImportButton */}
              <Button
                iconPosition={'left'}
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
                        navigation.navigate('Onboarding6NotificationsScreen');
                      } else {
                        setShowDenidedModal(true);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    { marginTop: 60 }
                  ),
                  dimensions.width
                )}
                title={'Import Contacts'}
              />
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontSize: 12, marginTop: 20 }
                  ),
                  dimensions.width
                )}
              >
                {
                  'Your contact data is private and will never be sold to 3rd parties. Pinky promise.'
                }
              </Text>
            </View>
          </SimpleStyleKeyboardAwareScrollView>
        )}
      </>
      {/* ImportModal */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        transparent={true}
        visible={showImportModal}
      >
        <Surface
          elevation={0}
          {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.SurfaceStyles(theme)['Surface'].style,
              {
                alignItems: 'center',
                backgroundColor: theme.colors['Background'],
                borderRadius: 16,
                height: '100%',
                justifyContent: 'center',
                paddingBottom: 40,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 40,
                width: '100%',
              }
            ),
            dimensions.width
          )}
        >
          <H2
            selectable={false}
            {...GlobalStyles.H2Styles(theme)['H2'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.H2Styles(theme)['H2'].style,
              dimensions.width
            )}
          >
            {'They’re coming!'}
          </H2>
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={Images.ImportPhotos1}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 354, width: 312 }
              ),
              dimensions.width
            )}
          />
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                marginTop: 12,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'Just a moment while we bring your people into Contxt...'}
          </Text>
        </Surface>
      </Modal>
      {/* DenyModal */}
      <>
        {Platform.OS === 'web' ? null : (
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType={'slide'}
            transparent={true}
            visible={showDenidedModal}
          >
            <BlurView
              intensity={50}
              tint={'default'}
              {...GlobalStyles.BlurViewStyles(theme)['Blur View'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.BlurViewStyles(theme)['Blur View'].style,
                  { alignItems: 'center', justifyContent: 'center' }
                ),
                dimensions.width
              )}
            >
              <Surface
                {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
                elevation={3}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.SurfaceStyles(theme)['Surface'].style,
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
                  selectable={false}
                  {...GlobalStyles.H2Styles(theme)['H2'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.H2Styles(theme)['H2'].style,
                    dimensions.width
                  )}
                >
                  {'Access Denied'}
                </H2>

                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      { textAlign: 'center' }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'You must enable Contacts permissions to continue using Contxt app. \n\nYou can enable it from  Settings > App Permissions > Contxt app screen'
                  }
                </Text>
                {/* Close Button */}
                <Button
                  iconPosition={'left'}
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
                  {...GlobalStyles.ButtonStyles(theme)['OutlineButton'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['OutlineButton'].style,
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

export default withTheme(Onboarding5ContactsImportScreen);
