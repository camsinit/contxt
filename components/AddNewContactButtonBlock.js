import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Pressable, TextInput, withTheme } from '@draftbit/ui';
import { ActivityIndicator, Text, View } from 'react-native';

const AddNewContactButtonBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [nameInputReturned, setNameInputReturned] = React.useState(false);
  const [newNameValue, setNewNameValue] = React.useState('');
  const [phoneInputReturned, setPhoneInputReturned] = React.useState(false);
  const [phoneNumberValue, setPhoneNumberValue] = React.useState('');
  const [searchStringDisplayValue, setSearchStringDisplayValue] =
    React.useState('');
  const [searchStringValue, setSearchStringValue] = React.useState('');
  const [showPhoneNumberInput, setShowPhoneNumberInput] = React.useState(false);
  const [showRecentContactsList, setShowRecentContactsList] =
    React.useState(false);
  const validatePhoneNumber = () => {
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
  const xANOAddNewContactPOST = XANOApi.useAddNewContactPOST();
  React.useEffect(() => {
    try {
      setNewNameValue(props.initialValue ?? null);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <View>
      {/* AddNewContactForm */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: theme.colors['Light Gray'],
            borderRadius: 36,
            flexDirection: 'row',
            minHeight: 40,
            paddingLeft: 8,
            paddingRight: 8,
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, flexDirection: 'row' },
            dimensions.width
          )}
        >
          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
            {/* NameInput */}
            <>
              {showPhoneNumberInput ? null : (
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      if (nameInputReturned) {
                        if (newNameValue === '') {
                          return;
                        }
                      } else {
                        setNameInputReturned(false);
                      }

                      props.onCancelCreate?.();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={newNameInputValue => {
                    try {
                      setNewNameValue(newNameInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onSubmitEditing={() => {
                    try {
                      if (newNameValue !== '') {
                        setShowPhoneNumberInput(true);
                        setErrorMessage('');
                      } else {
                        setErrorMessage('Please enter a valid contact name');
                      }

                      setNameInputReturned(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                  autoFocus={true}
                  placeholder={'Their name'}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                      {
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        fontSize: 12,
                        lineHeight: 17,
                        paddingBottom: 0,
                        paddingLeft: 8,
                        paddingTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                  value={newNameValue}
                />
              )}
            </>
            {/* PhoneNumberInput */}
            <>
              {!showPhoneNumberInput ? null : (
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      if (phoneInputReturned) {
                        if (!validatePhoneNumber()) {
                          return;
                        }
                      } else {
                        setPhoneInputReturned(false);
                      }

                      props.onCancelCreate?.();
                      setShowPhoneNumberInput(false);
                      setPhoneNumberValue('');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={newPhoneNumberInputValue => {
                    try {
                      setPhoneNumberValue(newPhoneNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onSubmitEditing={() => {
                    const handler = async () => {
                      try {
                        setPhoneInputReturned(true);
                        if (!validatePhoneNumber()) {
                          return;
                        }
                        setIsLoading(true);
                        const addContactResult = (
                          await xANOAddNewContactPOST.mutateAsync({
                            name: newNameValue,
                            phone_number: phoneNumberValue,
                          })
                        )?.json;
                        setIsLoading(false);
                        if (!addContactResult?.message) {
                          props.onChange?.(addContactResult);
                        }
                        setErrorMessage(addContactResult?.message);
                        setNewNameValue('');
                        setPhoneNumberValue('');
                        setShowPhoneNumberInput(false);
                        props.onCancelCreate?.();
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                  autoFocus={true}
                  keyboardType={'numeric'}
                  placeholder={'Their Number'}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                      {
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        paddingTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                  value={phoneNumberValue}
                />
              )}
            </>
          </View>
        </View>
        {/* AddButton */}
        <Pressable
          onPress={() => {
            const handler = async () => {
              try {
                setErrorMessage('');
                if (showPhoneNumberInput) {
                  if (!validatePhoneNumber()) {
                    return;
                  }
                  setIsLoading(true);
                  let addContactResult = (
                    await xANOAddNewContactPOST.mutateAsync({
                      name: newNameValue,
                      phone_number: phoneNumberValue,
                    })
                  )?.json;
                  setIsLoading(false);
                  setErrorMessage(addContactResult?.message);
                  /* hidden 'Set Variable' action */
                  console.log('resultt', addContactResult);
                  if (!addContactResult?.message) {
                    props.onChange?.(addContactResult);
                  }
                  setNewNameValue('');
                  setPhoneNumberValue('');
                  setShowPhoneNumberInput(false);
                  props.onCancelCreate?.();
                } else {
                  if (newNameValue !== '') {
                    setShowPhoneNumberInput(true);
                    setErrorMessage('');
                  } else {
                    setErrorMessage('Please enter a valid contact name');
                  }
                }
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          disabled={isLoading}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: theme.colors['Surface'],
                borderRadius: 30,
                justifyContent: 'center',
                paddingBottom: 2,
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 2,
              },
              dimensions.width
            )}
          >
            <>
              {isLoading ? null : (
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      { color: theme.colors['Medium'], fontSize: 12 }
                    ),
                    dimensions.width
                  )}
                >
                  {showPhoneNumberInput ? 'Add' : 'Next'}
                </Text>
              )}
            </>
            <>
              {!isLoading ? null : (
                <ActivityIndicator
                  animating={true}
                  hidesWhenStopped={true}
                  size={'small'}
                  {...GlobalStyles.ActivityIndicatorStyles(theme)[
                    'Activity Indicator'
                  ].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ActivityIndicatorStyles(theme)[
                        'Activity Indicator'
                      ].style,
                      { height: 12, width: 12 }
                    ),
                    dimensions.width
                  )}
                />
              )}
            </>
          </View>
        </Pressable>
      </View>
      {/* ErrorMessage */}
      <>
        {!errorMessage ? null : (
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: theme.colors['Error'],
                fontSize: 11,
              }),
              dimensions.width
            )}
          >
            {errorMessage}
          </Text>
        )}
      </>
    </View>
  );
};

export default withTheme(AddNewContactButtonBlock);
