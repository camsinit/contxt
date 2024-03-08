import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Circle, Icon, Pressable, withTheme } from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const HeaderBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          flexDirection: 'row',
          height: 48,
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
        },
        dimensions.width
      )}
    >
      {/* PressableSettings */}
      <Pressable
        onPress={() => {
          try {
            navigation.navigate('SettingsScreen');
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <Circle
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.CircleStyles(theme)['Circle'], {
              backgroundColor: theme.colors['Secondary'],
              height: 34,
              width: 34,
            }),
            dimensions.width
          )}
        >
          <Icon name={'FontAwesome/gears'} size={18} />
        </Circle>
      </Pressable>
      {/* Title */}
      <Text
        accessible={true}
        allowFontScaling={true}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 17,
          }),
          dimensions.width
        )}
      >
        {props.title ?? 'Home'}
      </Text>

      <View>
        {/* PressableInbox */}
        <Pressable
          onPress={() => {
            try {
              navigation.navigate('InboxScreen');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Circle
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.CircleStyles(theme)['Circle'], {
                backgroundColor: theme.colors['Secondary'],
                height: 34,
                width: 34,
              }),
              dimensions.width
            )}
          >
            <Icon name={'FontAwesome/inbox'} size={20} />
          </Circle>
        </Pressable>

        <XANOApi.FetchGetInboxCountGET>
          {({ loading, error, data, refetchGetInboxCount }) => {
            const fetchData = data?.json;
            if (loading) {
              return <View />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {!(fetchData > 0) ? null : (
                  <Circle
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.CircleStyles(theme)['Circle'],
                        {
                          backgroundColor: theme.colors['Error'],
                          height: 15,
                          position: 'absolute',
                          right: -5,
                          width: 15,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          { color: theme.colors['Background'], fontSize: 9 }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData}
                    </Text>
                  </Circle>
                )}
              </>
            );
          }}
        </XANOApi.FetchGetInboxCountGET>
      </View>
    </View>
  );
};

export default withTheme(HeaderBlock);
