import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  Link,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Surface,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { Text, View } from 'react-native';

const Onboarding2NameScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [firstNameValue, setFirstNameValue] = React.useState(
    Constants['REGISTERING_USER']?.firstname
  );
  const [lastNameValue, setLastNameValue] = React.useState(
    Constants['REGISTERING_USER']?.lastname
  );
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

  const updateObject = () => {
    return {
      dob: '',
      phone: '',
      lastname: lastNameValue,
      firstname: firstNameValue,
    };
  };

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
              navigation.navigate('Onboarding1WelcomeScreen');
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
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        extraScrollHeight={50}
        keyboardShouldPersistTaps={'always'}
        style={StyleSheet.applyWidth(
          { flex: 1, padding: 20 },
          dimensions.width
        )}
        viewIsInsideTabBar={true}
      >
        {/* Form */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
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
            {'What’s your name?'}
          </H2>
          {/* InnerText */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                marginBottom: 20,
              }),
              dimensions.width
            )}
          >
            {
              'While we love a good alter-ego, Contxt is for the people you know IRL'
            }
          </Text>

          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', gap: 8 },
              dimensions.width
            )}
          >
            {/* FirstnameFormField */}
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, marginBottom: 20 },
                dimensions.width
              )}
            >
              {/* FormFieldLabel */}
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontSize: 12 }
                  ),
                  dimensions.width
                )}
              >
                {'First Name'}
              </Text>
              {/* FirstNameInput */}
              <TextInput
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newFirstNameInputValue => {
                  try {
                    setFirstNameValue(newFirstNameInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                autoCapitalize={'words'}
                autoComplete={'given-name'}
                placeholder={'Enter your name'}
                placeholderTextColor={theme.colors.branding.secondary}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
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
                { flex: 1, marginBottom: 20 },
                dimensions.width
              )}
            >
              {/* FormFieldLabel */}
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontSize: 12 }
                  ),
                  dimensions.width
                )}
              >
                {'Last Name'}
              </Text>
              {/* LastNameInput */}
              <TextInput
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newLastNameInputValue => {
                  try {
                    setLastNameValue(newLastNameInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                autoCapitalize={'words'}
                autoComplete={'family-name'}
                placeholder={'Enter your lastname'}
                placeholderTextColor={theme.colors.branding.secondary}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    { marginTop: 6 }
                  ),
                  dimensions.width
                )}
                value={lastNameValue}
              />
            </View>
          </View>
        </View>

        <View
          style={StyleSheet.applyWidth({ marginBottom: 400 }, dimensions.width)}
        >
          {/* ErrorText */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: theme.colors.background.danger,
              }),
              dimensions.width
            )}
          >
            {errorMessage}
          </Text>
          {/* ContinueButton */}
          <Button
            iconPosition={'left'}
            onPress={() => {
              try {
                const isValidForm = validateNameForm();
                if (!isValidForm) {
                  return;
                }
                setGlobalVariableValue({
                  key: 'REGISTERING_USER',
                  value: updateObject(),
                });
                navigation.navigate('Onboarding3PhoneScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                { borderRadius: 50 }
              ),
              dimensions.width
            )}
            title={'Continue'}
          />
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                marginTop: 8,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'Already have an account? '}
            <Link
              accessible={true}
              onPress={() => {
                try {
                  navigation.navigate('LoginScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.LinkStyles(theme)['Link'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.LinkStyles(theme)['Link'].style,
                dimensions.width
              )}
              title={'Login In'}
            />
          </Text>
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Onboarding2NameScreen);
