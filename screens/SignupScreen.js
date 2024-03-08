import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthApiApi from '../apis/AuthApiApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ScreenComponents from '../custom-files/ScreenComponents';
import cleanNumber from '../global-functions/cleanNumber';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  DatePicker,
  Icon,
  Link,
  PinInput,
  Pressable,
  ScreenContainer,
  Surface,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { Text, View } from 'react-native';

const SignupScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [codeValue, setCodeValue] = React.useState('');
  const [currentForm, setCurrentForm] = React.useState('name');
  const [dob, setDob] = React.useState(new Date());
  const [errorMessage, setErrorMessage] = React.useState('');
  const [firstNameValue, setFirstNameValue] = React.useState('');
  const [lastNameValue, setLastNameValue] = React.useState('');
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
              if (currentForm === 'name') {
                navigation.goBack();
              } else {
                if (currentForm === 'number') {
                  setCurrentForm('name');
                } else {
                  setCurrentForm('number');
                }
              }
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
      {/* NameForm */}
      <>
        {!(currentForm === 'name') ? null : (
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
              {'First, what’s your name?'}
            </H2>
            {/* InnerText */}
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Text'],
                dimensions.width
              )}
            >
              {
                'While we love a good alter-ego, Contxt is for the people you know IRL\n\nSharing your name allows friends to find and attribute quotes to each other!'
              }
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
                  { marginTop: 60 },
                  dimensions.width
                )}
              >
                {/* FirstnameFormField */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20 },
                    dimensions.width
                  )}
                >
                  {/* FormFieldLabel */}
                  <Text
                    accessible={true}
                    allowFontScaling={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        { fontSize: 12 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'First Name'}
                  </Text>
                  {/* FirstNameInput */}
                  <TextInput
                    allowFontScaling={true}
                    autoCapitalize={'none'}
                    autoComplete={'given-name'}
                    changeTextDelay={500}
                    onChangeText={newFirstNameInputValue => {
                      try {
                        setFirstNameValue(newFirstNameInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    placeholder={'Enter your name'}
                    placeholderTextColor={theme.colors['Secondary']}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'],
                        { marginTop: 6 }
                      ),
                      dimensions.width
                    )}
                    value={firstNameValue}
                  />
                </View>
                {/* LastNameFormField */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20 },
                    dimensions.width
                  )}
                >
                  {/* FormFieldLabel */}
                  <Text
                    accessible={true}
                    allowFontScaling={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        { fontSize: 12 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Last Name'}
                  </Text>
                  {/* LastNameInput */}
                  <TextInput
                    allowFontScaling={true}
                    autoCapitalize={'words'}
                    autoComplete={'family-name'}
                    changeTextDelay={500}
                    onChangeText={newLastNameInputValue => {
                      try {
                        setLastNameValue(newLastNameInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    placeholder={'Enter your lastname'}
                    placeholderTextColor={theme.colors['Secondary']}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'],
                        { marginTop: 6 }
                      ),
                      dimensions.width
                    )}
                    value={lastNameValue}
                  />
                </View>
                {/* DobField */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20 },
                    dimensions.width
                  )}
                >
                  {/* FormFieldLabel */}
                  <Text
                    accessible={true}
                    allowFontScaling={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        { fontSize: 12 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Date of Birth'}
                  </Text>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderColor: theme.colors['Divider'],
                        borderRadius: 8,
                        borderWidth: 1,
                        height: 48,
                        paddingLeft: 8,
                      },
                      dimensions.width
                    )}
                  >
                    <DatePicker
                      autoDismissKeyboard={true}
                      borderColor={'rgba(0, 0, 0, 0)'}
                      date={dob}
                      label={''}
                      labelColor={theme.colors['Strong']}
                      labelSize={0}
                      leftIconMode={'inset'}
                      maximumDate={new Date()}
                      mode={'date'}
                      onDateChange={newDatePickerValue => {
                        try {
                          setDob(newDatePickerValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        {
                          fontFamily: 'Poppins_400Regular',
                          fontSize: 14,
                          margin: 0,
                          position: 'relative',
                          top: -4,
                        },
                        dimensions.width
                      )}
                      type={'underline'}
                    />
                  </View>
                </View>
                {/* ErrorText */}
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Error'],
                    }),
                    dimensions.width
                  )}
                >
                  {errorMessage}
                </Text>
                {/* ContinueButton */}
                <Button
                  onPress={() => {
                    try {
                      const isValidForm = validateNameForm();
                      if (!isValidForm) {
                        return;
                      }
                      setCurrentForm('number');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      { marginTop: 60 }
                    ),
                    dimensions.width
                  )}
                  title={'Continue'}
                />
              </View>

              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    textAlign: 'center',
                  }),
                  dimensions.width
                )}
              >
                {'Already have an account? '}
                <Link
                  accessible={true}
                  allowFontScaling={true}
                  onPress={() => {
                    try {
                      navigation.navigate('LoginScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.LinkStyles(theme)['Link'],
                    dimensions.width
                  )}
                  title={'Login In'}
                />
              </Text>
            </View>
          </View>
        )}
      </>
      {/* NumberForm */}
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
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H2Styles(theme)['H2'], {
                  fontSize: 32,
                }),
                dimensions.width
              )}
            >
              {'And your number?'}
            </H2>
            {/* InnerTextLink */}
            <Link
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'], {
                  color: theme.colors['DarkGray'],
                  textAlign: 'center',
                }),
                dimensions.width
              )}
              title={'Why do you need my number?'}
            />
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
                  { marginTop: 60 },
                  dimensions.width
                )}
              >
                {/* FirstnameFormField */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20 },
                    dimensions.width
                  )}
                >
                  {/* FormFieldLabel */}
                  <Text
                    accessible={true}
                    allowFontScaling={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        { fontSize: 12 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'First Name'}
                  </Text>
                  {/* PhoneNumberInput */}
                  <Utils.CustomCodeErrorBoundary>
                    <ScreenComponents.PhoneInput
                      number={phoneNumberValue}
                      setNumber={setPhoneNumberValue}
                      theme={props.theme}
                    />
                  </Utils.CustomCodeErrorBoundary>
                </View>
                {/* ErrorText 2 */}
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Error'],
                    }),
                    dimensions.width
                  )}
                >
                  {errorMessage}
                </Text>
                {/* ContinueButton */}
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const isValid = validateNumberForm();
                        if (!isValid) {
                          return;
                        }
                        const signupResult = (
                          await AuthApiApi.signupPOST(Constants, {
                            dob: dob,
                            first_name: firstNameValue,
                            last_name: lastNameValue,
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
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      { marginTop: 60 }
                    ),
                    dimensions.width
                  )}
                  title={'Continue'}
                />
              </View>

              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    textAlign: 'center',
                  }),
                  dimensions.width
                )}
              >
                {'Already have an account? '}
                <Link
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.LinkStyles(theme)['Link'],
                    dimensions.width
                  )}
                  title={'Login In'}
                />
              </Text>
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
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H2Styles(theme)['H2'], {
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
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Text'],
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
                  cellCount={5}
                  changeTextDelay={500}
                  clearOnCellFocus={true}
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
                          navigation.navigate('HomeScreen');
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
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.PinInputStyles(theme)['Pin Input'],
                      { borderColor: theme.colors['Divider'], borderRadius: 12 }
                    ),
                    dimensions.width
                  )}
                  value={codeValue}
                />
                {/* ErrorText 3 */}
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Error'],
                    }),
                    dimensions.width
                  )}
                >
                  {errorMessage}
                </Text>
                <>
                  {!(timerValue > 0) ? null : (
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Light'],
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
                      allowFontScaling={true}
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
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinkStyles(theme)['Link'],
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
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    textAlign: 'center',
                  }),
                  dimensions.width
                )}
              >
                {'Already have an account? '}
                <Link
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.LinkStyles(theme)['Link'],
                    dimensions.width
                  )}
                  title={'Login In'}
                />
              </Text>
            </View>
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(SignupScreen);
