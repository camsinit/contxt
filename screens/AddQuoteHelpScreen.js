import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
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
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { Text, View } from 'react-native';

const AddQuoteHelpScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [errorMessage, setErrorMessage] = React.useState('');

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
              navigation.navigate('Onboarding6NotificationsScreen');
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
            {'Adding a Quote'}
          </H2>
        </View>

        <View>
          {/* ErrorText */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: theme.colors['Error'],
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
                navigation.navigate('QuoteInboxScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.ButtonStyles(theme)['Button'].style,
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

export default withTheme(AddQuoteHelpScreen);
