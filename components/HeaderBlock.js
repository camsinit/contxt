import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
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
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

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
      {/* UserProfile */}
      <Pressable
        onPress={() => {
          try {
            navigation.navigate('ProfileScreen', {
              id: Constants['CX_USER']?.id,
              type: 'user',
            });
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          { borderColor: 'rgba(0, 0, 0, 0)', borderLeftWidth: 20 },
          dimensions.width
        )}
      >
        <Icon name={'Feather/user'} size={24} />
      </Pressable>
      {/* QuoteInbox */}
      <View>
        <Pressable
          onPress={() => {
            try {
              navigation.navigate('QuoteBoxScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          disabled={false}
        >
          <Circle
            {...GlobalStyles.CircleStyles(theme)['Circle'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.CircleStyles(theme)['Circle'].style,
                { backgroundColor: 'rgba(0, 0, 0, 0)', height: 34, width: 34 }
              ),
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
                    {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.CircleStyles(theme)['Circle'].style,
                        {
                          backgroundColor: theme.colors.background.danger,
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
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          { color: theme.colors.background.brand, fontSize: 9 }
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
