import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthApiApi from '../apis/AuthApiApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { H1 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { Image, View } from 'react-native';

const Onboarding1WelcomeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const authMeResult = (await AuthApiApi.authMeGET(Constants))?.json;
        /* hidden 'Log to Console' action */
        if (authMeResult?.message) {
        } else {
          navigation.navigate('HomeScreen');
        }
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      {/* Container */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'flex-start',
            flex: 1,
            justifyContent: 'center',
            padding: 20,
          },
          dimensions.width
        )}
      >
        {/* Header */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              bottom: 70,
              flexDirection: 'column',
              marginTop: 40,
              position: 'relative',
            },
            dimensions.width
          )}
        >
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={Images.Group36710}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 75, width: 200 }
              ),
              dimensions.width
            )}
          />
          <H1
            selectable={false}
            {...GlobalStyles.H1Styles(theme)['H1'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.H1Styles(theme)['H1'].style, {
                color: theme.colors.text.medium,
                fontFamily: 'System',
                fontSize: 24,
                fontWeight: '400',
                marginTop: 10,
              }),
              dimensions.width
            )}
          >
            {'Your place for quotes n jokes'}
          </H1>
        </View>
        {/* Image */}
        <View
          style={StyleSheet.applyWidth(
            { alignSelf: 'center', marginLeft: 20, top: -30 },
            dimensions.width
          )}
        >
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={Images.FirstFrame}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 394, width: 360 }
              ),
              dimensions.width
            )}
          />
        </View>
        {/* Buttons */}
        <View
          style={StyleSheet.applyWidth(
            { position: 'relative' },
            dimensions.width
          )}
        >
          {/* SignInButton */}
          <Button
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate('LoginScreen');
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
            title={'Sign In'}
          />
          {/* CreateAccountButton */}
          <Button
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate('Onboarding2NameScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['OutlineButton'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['OutlineButton'].style,
                { borderRadius: 50, marginTop: 16 }
              ),
              dimensions.width
            )}
            title={'Create Account'}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Onboarding1WelcomeScreen);
