import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Icon, IconButton, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';

const PermissionsLabelBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View>
      {/* GrantedView */}
      <>
        {!((props.status ?? null) === 'granted') ? null : (
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row', gap: 2 },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['custom green']}
              name={'Ionicons/checkmark-sharp'}
              size={16}
            />
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['custom green'],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '600',
                  }
                ),
                dimensions.width
              )}
            >
              {'Working'}
            </Text>
            <IconButton
              color={palettes.App['custom green']}
              icon={'AntDesign/right'}
              size={16}
            />
          </View>
        )}
      </>
      {/* DeniedView */}
      <>
        {!((props.status ?? null) !== 'granted') ? null : (
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row', gap: 2 },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['Custom Red']}
              name={'Ionicons/warning'}
              size={16}
            />
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['Custom Red'],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '600',
                  }
                ),
                dimensions.width
              )}
            >
              {'Denied'}
            </Text>
            <IconButton
              color={palettes.App['Custom Red']}
              icon={'AntDesign/right'}
              size={16}
            />
          </View>
        )}
      </>
    </View>
  );
};

export default withTheme(PermissionsLabelBlock);
