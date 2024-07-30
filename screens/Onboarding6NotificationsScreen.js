import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { Image, Text, View } from 'react-native';

const Onboarding6NotificationsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const xANOUpdatePushTokenPATCH = XANOApi.useUpdatePushTokenPATCH();

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: '"rgb(238, 238, 238)"' },
        dimensions.width
      )}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: '"rgb(238, 238, 238)"',
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
              navigation.navigate('Onboarding3PhoneScreen');
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
      <Image
        {...GlobalStyles.ImageStyles(theme)['Image'].props}
        resizeMode={'cover'}
        source={Images.EnableNotificationsV3}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
            height: 325,
            width: null,
          }),
          dimensions.width
        )}
      />
      <SimpleStyleKeyboardAwareScrollView
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        extraScrollHeight={50}
        keyboardShouldPersistTaps={'always'}
        style={StyleSheet.applyWidth(
          { backgroundColor: palettes.Brand.Surface, flex: 1, padding: 20 },
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
                fontSize: 30,
              }),
              dimensions.width
            )}
          >
            {'I know, notifications suck'}
          </H2>
          {/* InnerText */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 20,
                marginBottom: 20,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'But these ones are special'}
          </Text>

          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Text'].style,
              dimensions.width
            )}
          >
            {
              'Tap “Allow” on the next screen to get periodic bursts of acknowledgement and appreciation sprinkled throughout your day. Easily turn ‘em off anytime if you need a break.'
            }
          </Text>
        </View>

        <View>
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
                  const pushToken = await getPushTokenUtil({
                    permissionErrorMessage:
                      'Sorry, we need notifications permissions to make this work.',
                    deviceErrorMessage:
                      'Must use physical device for Push Notifications.',
                    showAlertOnPermissionError: true,
                    showAlertOnDeviceError: true,
                  });

                  if (pushToken) {
                    setIsLoading(true);
                    (
                      await xANOUpdatePushTokenPATCH.mutateAsync({
                        id: Constants['CX_USER']?.id,
                        push_token: pushToken,
                        type: 'user',
                      })
                    )?.json;
                    setIsLoading(false);
                  } else {
                  }

                  navigation.navigate('HomeScreen');
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            disabled={isLoading}
            loading={isLoading}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                { borderRadius: 50, marginBottom: 20 }
              ),
              dimensions.width
            )}
            title={'Turn on Notifications'}
          />
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Onboarding6NotificationsScreen);
