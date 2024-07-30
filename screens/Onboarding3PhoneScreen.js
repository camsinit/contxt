import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthApiApi from '../apis/AuthApiApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ScreenComponents from '../custom-files/ScreenComponents';
import cleanNumber from '../global-functions/cleanNumber';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  Link,
  PinInput,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { Text, View } from 'react-native';

const Onboarding3PhoneScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [codeValue, setCodeValue] = React.useState('');
  const [currentForm, setCurrentForm] = React.useState('number');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [phoneNumberValue, setPhoneNumberValue] = React.useState('');
  const [timerValue, setTimerValue] = React.useState(119);
  const validateNameForm = () => {
    if (firstNameValue.length < 1) {
      setErrorMessage('Please enter a valid first name');
      return false;
    }

    if (lastNameValue.length < 1) {
      setErrorMessage('Please enter a valid last name');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const validateNumberForm = () => {
    const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if (phoneNumberValue.length < 1) {
      setErrorMessage('Please enter phone number');
      return false;
    }

    if (!phoneNumberRegex.test(phoneNumberValue)) {
      setErrorMessage('Please enter valid phone number');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const formattedTimerValue = () => {
    const minutes = Math.floor(timerValue / 60);
    const seconds = timerValue % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`;
    return formattedTime;
  };
  React.useEffect(() => {
    if (currentForm === 'code') {
      const interval = setInterval(() => {
        setTimerValue(prevState => {
          if (prevState === 0) {
            clearInterval(interval);
            return '';
          }
          return prevState - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentForm, timerValue]);

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
              navigation.navigate('Onboarding2NameScreen');
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
                  borderColor: palettes.Brand['Light Inverse'],
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

      <SimpleStyleKeyboardAwareScrollView
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps={'always'}
        style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
        viewIsInsideTabBar={true}
      >
        {/* PhoneNumberForm */}
        <>
          {!(currentForm === 'number') ? null : (
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
                {'And your number?'}
              </H2>
              {/* Inner Container */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, justifyContent: 'space-between' },
                  dimensions.width
                )}
              >
                {/* PhoneNumberField */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20 },
                    dimensions.width
                  )}
                >
                  {/* PhoneNumberInput */}
                  <Utils.CustomCodeErrorBoundary>
                    <ScreenComponents.PhoneInput
                      number={phoneNumberValue}
                      setNumber={setPhoneNumberValue}
                      theme={props.theme}
                    />
                  </Utils.CustomCodeErrorBoundary>
                  {/* ConsentText */}
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: theme.colors.text.strong,
                          fontFamily: 'Poppins_400Regular_Italic',
                          fontSize: 12,
                          marginTop: 12,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      'By entering your phone number and clicking "Continue" you agree to receive automated texts from Contxt for authentication purposes. You can text "STOP" to unsubscribe.\n\n'
                    }
                  </Text>
                </View>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 500 },
                  dimensions.width
                )}
              >
                {/* ErrorText 2 */}
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      { color: theme.colors.background.danger }
                    ),
                    dimensions.width
                  )}
                >
                  {errorMessage}
                </Text>
                {/* ContinueButton */}
                <Button
                  iconPosition={'left'}
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const isValid = validateNumberForm();
                        if (!isValid) {
                          return;
                        }
                        const signupResult = (
                          await AuthApiApi.signupPOST(Constants, {
                            dob: Constants['REGISTERING_USER']?.dob,
                            first_name:
                              Constants['REGISTERING_USER']?.firstname,
                            last_name: Constants['REGISTERING_USER']?.lastname,
                            phone: cleanNumber(phoneNumberValue),
                          })
                        )?.json;
                        if (signupResult?.message) {
                          setErrorMessage(signupResult?.message);
                        } else {
                          setErrorMessage('');
                          setCurrentForm('code');
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
                      { marginBottom: 12, marginTop: 60 }
                    ),
                    dimensions.width
                  )}
                  title={'Continue'}
                />
              </View>
            </View>
          )}
        </>
        {/* CodeInputForm */}
        <>
          {!(currentForm === 'code') ? null : (
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
                {'Enter Code'}
              </H2>
              {/* InnerText */}
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  dimensions.width
                )}
              >
                {'We’ve sent an SMS with an activation code to your phone '}
                {phoneNumberValue}
              </Text>
              {/* Inner Container */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, justifyContent: 'space-between' },
                  dimensions.width
                )}
              >
                {/* Form */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: 1,
                      justifyContent: 'space-between',
                      marginTop: 60,
                      paddingBottom: 60,
                    },
                    dimensions.width
                  )}
                >
                  <PinInput
                    autoComplete={'one-time-code'}
                    blurOnFull={true}
                    changeTextDelay={500}
                    clearOnCellFocus={true}
                    focusedBorderColor={theme.colors.branding.primary}
                    keyboardType={'number-pad'}
                    onChangeText={newPinInputValue => {
                      try {
                        setCodeValue(newPinInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onInputFull={finalValue => {
                      const handler = async () => {
                        try {
                          const loginResult = (
                            await AuthApiApi.loginPOST(Constants, {
                              code: codeValue,
                              phone: cleanNumber(phoneNumberValue),
                            })
                          )?.json;
                          if (loginResult?.message) {
                            setErrorMessage(loginResult?.message);
                          } else {
                            setGlobalVariableValue({
                              key: 'CX_AUTH_TOKEN',
                              value: loginResult?.authToken,
                            });
                            setGlobalVariableValue({
                              key: 'CX_USER',
                              value: loginResult?.user,
                            });
                            setCodeValue('');
                            setCurrentForm('name');
                            navigation.navigate('Onboarding4DOBScreen');
                          }
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    renderItem={({ cellValue, isFocused }) => {
                      return null;
                    }}
                    secureTextEntry={false}
                    {...GlobalStyles.PinInputStyles(theme)['Pin Input'].props}
                    cellCount={5}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.PinInputStyles(theme)['Pin Input'].style,
                        {
                          borderColor: theme.colors.border.brand,
                          borderRadius: 12,
                        }
                      ),
                      dimensions.width
                    )}
                    value={codeValue}
                  />
                  {/* ErrorText 3 */}
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        { color: theme.colors.background.danger }
                      ),
                      dimensions.width
                    )}
                  >
                    {errorMessage}
                  </Text>
                  <>
                    {!(timerValue > 0) ? null : (
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            {
                              color: theme.colors.text.light,
                              fontFamily: 'Poppins_500Medium',
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Send code again in '}
                        {formattedTimerValue()}
                      </Text>
                    )}
                  </>
                  {/* SendAgainLink */}
                  <>
                    {timerValue > 0 ? null : (
                      <Link
                        accessible={true}
                        onPress={() => {
                          const handler = async () => {
                            try {
                              const resendResult = (
                                await AuthApiApi.resendPOST(Constants, {
                                  phone: phoneNumberValue,
                                })
                              )?.json;
                              if (resendResult?.message) {
                                setErrorMessage(resendResult?.message);
                              } else {
                                setTimerValue(119);
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        {...GlobalStyles.LinkStyles(theme)['Link'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinkStyles(theme)['Link'].style,
                            {
                              textAlign: 'center',
                              textDecorationLine: 'underline',
                            }
                          ),
                          dimensions.width
                        )}
                        title={'Send the code again'}
                      />
                    )}
                  </>
                </View>

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
                  {'Already have an account? '}
                  <Link
                    accessible={true}
                    {...GlobalStyles.LinkStyles(theme)['Link'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      dimensions.width
                    )}
                    title={'Login In'}
                  />
                </Text>
              </View>
            </View>
          )}
        </>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Onboarding3PhoneScreen);
