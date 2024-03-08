import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { H1 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';

const OnboardingScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (Constants['CX_AUTH_TOKEN']) {
        navigation.navigate('HomeScreen');
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      {/* Container */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'center', padding: 20 },
          dimensions.width
        )}
      >
        {/* Header */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
            dimensions.width
          )}
        >
          <Image
            resizeMode={'cover'}
            source={Images.Illustration}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                height: 275,
                width: 315,
              }),
              dimensions.width
            )}
          />
          <H1
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.H1Styles(theme)['H1'], {
                marginTop: 62,
              }),
              dimensions.width
            )}
          >
            {'Welcome to Contxt'}
          </H1>
        </View>

        <Text
          accessible={true}
          allowFontScaling={true}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              marginBottom: 75,
              textAlign: 'center',
            }),
            dimensions.width
          )}
        >
          {'The place for the memorable lines your friends and family say.'}
        </Text>
        {/* SignInButton */}
        <Button
          onPress={() => {
            try {
              navigation.navigate('LoginScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            GlobalStyles.ButtonStyles(theme)['Button'],
            dimensions.width
          )}
          title={'Sign In'}
        />
        {/* CreateAccountButton */}
        <Button
          onPress={() => {
            try {
              navigation.navigate('SignupScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['OutlineButton'],
              { marginTop: 16 }
            ),
            dimensions.width
          )}
          title={'Create Account'}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingScreen);
