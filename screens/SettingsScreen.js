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
  withTheme,
} from '@draftbit/ui';
import { View } from 'react-native';

const SettingsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
          },
          dimensions.width
        )}
      >
        {/* PressableGoBack */}
        <Pressable
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Icon
            color={theme.colors['DarkGray']}
            name={'Entypo/chevron-thin-left'}
            size={36}
          />
        </Pressable>

        <View>
          {/* UndoButton */}
          <Link
            accessible={true}
            allowFontScaling={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'], {
                fontFamily: 'Poppins_300Light',
                fontSize: 18,
              }),
              dimensions.width
            )}
            title={'Undo'}
          />
        </View>
      </View>
      {/* Body */}
      <View style={StyleSheet.applyWidth({ padding: 20 }, dimensions.width)}>
        <Button
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'CX_AUTH_TOKEN',
                value: '',
              });
              setGlobalVariableValue({
                key: 'CX_USER',
                value: '',
              });
              setGlobalVariableValue({
                key: 'RECENT_CONTACTS',
                value: [],
              });
              navigation.navigate('LoginScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['OutlineButton'],
              { borderColor: theme.colors['Error'], color: theme.colors['Red'] }
            ),
            dimensions.width
          )}
          title={'Logout'}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(SettingsScreen);
