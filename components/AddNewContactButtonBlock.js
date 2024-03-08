import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Icon, Pressable, TextInput, withTheme } from '@draftbit/ui';
import { ActivityIndicator, Text, View } from 'react-native';

const AddNewContactButtonBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [mode, setMode] = React.useState('button');
  const [newNameValue, setNewNameValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const onChangeFunction = contact => {
    props.onChange && props.onChange(contact);
  };
  const xANOAddNewContactPOST = XANOApi.useAddNewContactPOST();

  return (
    <View>
      <>
        {!(mode === 'button') ? null : (
          <Pressable
            onPress={() => {
              try {
                setMode('edit');
                props.onModeChange?.('edit');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* AddNewContact */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  borderColor: theme.colors['Light Gray'],
                  borderTopWidth: 1,
                  flexDirection: 'row',
                  height: 40,
                  paddingLeft: 15,
                  paddingRight: 15,
                },
                dimensions.width
              )}
            >
              <Icon
                name={'Ionicons/ios-add-circle-outline'}
                size={24}
                style={StyleSheet.applyWidth(
                  { marginRight: 8 },
                  dimensions.width
                )}
              />
              {/* AddNewText */}
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'],
                  dimensions.width
                )}
              >
                {'New Friend'}
              </Text>
            </View>
          </Pressable>
        )}
      </>
      {/* AddNewContactForm */}
      <>
        {mode === 'button' ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderColor: theme.colors['Light Gray'],
                borderTopWidth: 1,
                flexDirection: 'row',
                height: 40,
                paddingLeft: 15,
                paddingRight: 15,
              },
              dimensions.width
            )}
          >
            <Pressable
              onPress={() => {
                try {
                  setErrorMessage('');
                  setNewNameValue('');
                  setMode('button');
                  props.onModeChange?.('button');
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Icon
                name={'Ionicons/ios-add-circle-outline'}
                size={24}
                style={StyleSheet.applyWidth(
                  { marginRight: 8 },
                  dimensions.width
                )}
              />
            </Pressable>

            <View
              style={StyleSheet.applyWidth(
                { flex: 1, flexDirection: 'row' },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              >
                <TextInput
                  allowFontScaling={true}
                  autoCapitalize={'none'}
                  autoFocus={true}
                  changeTextDelay={500}
                  onChangeText={newTextInputValue => {
                    const textInputValue = newTextInputValue;
                    try {
                      setNewNameValue(newTextInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  placeholder={'Enter a value...'}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)['Text Input'],
                      {
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                  value={newNameValue}
                />
                <>
                  {!errorMessage ? null : (
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          { color: theme.colors['Error'], fontSize: 11 }
                        ),
                        dimensions.width
                      )}
                    >
                      {errorMessage}
                    </Text>
                  )}
                </>
              </View>
            </View>
            {/* AddButton */}
            <Pressable
              disabled={isLoading}
              onPress={() => {
                const handler = async () => {
                  try {
                    setErrorMessage('');
                    if (newNameValue !== '') {
                      setIsLoading(true);
                      const newContactResult = (
                        await xANOAddNewContactPOST.mutateAsync({
                          name: newNameValue,
                        })
                      )?.json;
                      setIsLoading(false);
                      setErrorMessage(newContactResult?.message);
                      onChangeFunction(newContactResult);
                      if (!newContactResult?.message) {
                        setNewNameValue('');
                      }
                      if (!newContactResult?.message) {
                        setMode('button');
                      }
                      if (!newContactResult?.message) {
                        props.onModeChange?.('button');
                      }
                    } else {
                      setErrorMessage('Please enter a valid contact name');
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: theme.colors['DarkGray'],
                    borderRadius: 30,
                    borderWidth: 1,
                    justifyContent: 'center',
                    paddingBottom: 6,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 6,
                  },
                  dimensions.width
                )}
              >
                <>
                  {isLoading ? null : (
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          { color: theme.colors['DarkGray'], fontSize: 12 }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Add'}
                    </Text>
                  )}
                </>
                <>
                  {!isLoading ? null : (
                    <ActivityIndicator
                      animating={true}
                      hidesWhenStopped={true}
                      size={'small'}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ActivityIndicatorStyles(theme)[
                            'Activity Indicator'
                          ],
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
        )}
      </>
    </View>
  );
};

export default withTheme(AddNewContactButtonBlock);
