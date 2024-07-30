import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  DatePicker,
  Icon,
  Link,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { Text, View } from 'react-native';

const Onboarding4DOBScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [dobValue, setDobValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const updateObject = Variables => {
    return {
      ...Variables.REGISTERING_USER,
      dob: dobValue,
    };
  };

  const validateForm = () => {
    if (!dobValue) {
      setErrorMessage('You must enter a valid Date of birth ');
      return false;
    }

    setErrorMessage('');
    return true;
  };
  const xANOUpdateProfileDOBPATCH = XANOApi.useUpdateProfileDOBPATCH();

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
            {'When were you born?'}
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
              'I love birthdays and Contxt has some exciting ways to celebrate them on the roadmap ;)'
            }
          </Text>
          {/* InnerText 2 */}
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
            {'Your birth year will stay '}
            {/* InnerText 3 */}
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { fontFamily: 'Poppins_700Bold', marginBottom: 60 }
                ),
                dimensions.width
              )}
            >
              {'private'}
              {/* InnerText 4 */}
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { marginBottom: 60 }
                  ),
                  dimensions.width
                )}
              >
                {', but your friends can see the month & day'}
              </Text>
            </Text>
          </Text>
          {/* InnerText 3 */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                marginBottom: 30,
              }),
              dimensions.width
            )}
          >
            {'I promise to never share your personal data 🤝'}
          </Text>
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
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { fontFamily: 'Poppins_700Bold', fontSize: 12 }
                ),
                dimensions.width
              )}
            >
              {'Birthday'}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  borderColor: theme.colors.border.brand,
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
                disabled={false}
                hideLabel={false}
                leftIconMode={'inset'}
                mode={'date'}
                onDateChange={newDatePickerValue => {
                  try {
                    setDobValue(newDatePickerValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                date={dobValue}
                label={''}
                labelColor={theme.colors.text.strong}
                labelSize={0}
                maximumDate={new Date()}
                style={StyleSheet.applyWidth(
                  {
                    borderColor: 'rgba(0, 0, 0, 0)',
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
        </View>

        <View
          style={StyleSheet.applyWidth({ marginBottom: 300 }, dimensions.width)}
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
              const handler = async () => {
                try {
                  const isValidForm = validateForm();
                  if (!isValidForm) {
                    return;
                  }
                  setIsLoading(true);
                  (
                    await xANOUpdateProfileDOBPATCH.mutateAsync({
                      dob: dobValue,
                      id: Constants['CX_USER']?.id,
                      type: 'user',
                    })
                  )?.json;
                  setIsLoading(false);
                  navigation.navigate('Onboarding5ContactsImportScreen');
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
                { borderRadius: 50 }
              ),
              dimensions.width
            )}
            title={'Continue'}
          />
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Onboarding4DOBScreen);
