import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import HighligtedTextBlock from '../components/HighligtedTextBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { parseBoolean } from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { IconButton, TextInput, Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';

const QuoteBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [quoteValue, setQuoteValue] = React.useState(
    props.text ?? 'Some demo text'
  );
  const [editMode, setEditMode] = React.useState(!parseBoolean(quoteValue));
  const onChangeFunction = str => {
    props.onChange && props.onChange(props.id, str);
  };

  const onDeleteFunction = () => {
    props.onDelete && props.onDelete(props.id);
  };

  const stringToArray = str => {
    return str.split(' ');
  };

  return (
    <View>
      <>
        {!editMode ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              },
              dimensions.width
            )}
          >
            {/* QuoteTextInput */}
            <TextInput
              allowFontScaling={true}
              autoFocus={true}
              changeTextDelay={500}
              multiline={true}
              numberOfLines={2}
              onBlur={() => {
                try {
                  setEditMode(false);
                  props.onChange?.(props.id ?? '', quoteValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              onChangeText={newQuoteTextInputValue => {
                try {
                  if (newQuoteTextInputValue === '') {
                    props.onDelete?.(props.id ?? '');
                  } else {
                    setQuoteValue(newQuoteTextInputValue);
                    props.onChange?.(props.id ?? '', newQuoteTextInputValue);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              placeholder={'Enter your quote...'}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Text Area'],
                  {
                    borderBottomWidth: 0,
                    borderColor: null,
                    borderLeftWidth: 0,
                    borderRadius: null,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                    color: theme.colors['DarkGray'],
                    paddingBottom: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    textAlign: 'center',
                    width: '90%',
                  }
                ),
                dimensions.width
              )}
              textAlignVertical={'top'}
              value={quoteValue}
            />
          </View>
        )}
      </>
      {/* Text 2 */}
      <>
        {props.editable ?? true ? null : (
          <Text
            accessible={true}
            allowFontScaling={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['DarkGray'],
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'* '}
            <HighligtedTextBlock
              searchWords={stringToArray(props.searchTerm ?? '')}
              text={props.text ?? 'Some demo text'}
            />
            {/* Text 3 */}
            <>
              {props.editable ?? true ? null : (
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['DarkGray'],
                      textAlign: 'center',
                    }),
                    dimensions.width
                  )}
                >
                  {' *'}
                </Text>
              )}
            </>
          </Text>
        )}
      </>
      <>
        {!(props.editable ?? true) ? null : (
          <Touchable
            onPress={() => {
              try {
                setEditMode(true);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <>
              {editMode ? null : (
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['DarkGray'],
                      textAlign: 'center',
                    }),
                    dimensions.width
                  )}
                >
                  {'* '}
                  {quoteValue}
                  {' *'}
                </Text>
              )}
            </>
          </Touchable>
        )}
      </>
    </View>
  );
};

export default withTheme(QuoteBlock);
