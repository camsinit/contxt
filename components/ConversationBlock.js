import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import AddNewContactButtonBlock from '../components/AddNewContactButtonBlock';
import SearchContactViewBlock from '../components/SearchContactViewBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Circle,
  Icon,
  Pressable,
  SimpleStyleFlatList,
  Surface,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const ConversationBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [isAddingNewContact, setIsAddingNewContact] = React.useState(false);
  const [searchStringDisplayValue, setSearchStringDisplayValue] =
    React.useState('');
  const [searchStringValue, setSearchStringValue] = React.useState('');
  const [showAddNewContactForm, setShowAddNewContactForm] =
    React.useState(false);
  const [showRecentContactsList, setShowRecentContactsList] =
    React.useState(false);
  const stringToArray = str => {
    return str.split(' ');
  };

  const getInitials = name => {
    // Check if the input is a valid string
    if (typeof name !== 'string' || name.trim().length === 0) {
      return 'N/A';
    }

    const parts = name.split(' ').filter(Boolean); // Split the name and remove any empty strings
    let initials = '';

    if (parts.length === 1) {
      // If there's only one part, return the first character
      initials = parts[0][0];
    } else if (parts.length === 2) {
      // If there are two parts, return the first character of each
      initials = parts[0][0] + parts[1][0];
    } else if (parts.length > 2) {
      // If there are more than two parts, return the first character of the first and last parts
      initials = parts[0][0] + parts[parts.length - 1][0];
    }

    return initials.toUpperCase(); // Return the initials in uppercase
  };

  const onCancelCreate = () => {
    setShowAddNewContactForm(false);
  };

  return (
    <View>
      {/* Row */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row' },
          dimensions.width
        )}
      >
        {/* AvatarView */}
        <>
          {!(props.contact ?? null) ? null : (
            <Surface
              elevation={0}
              {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                  { borderRadius: 40, overflow: 'hidden' }
                ),
                dimensions.width
              )}
            >
              <>
                {(props.contact ?? null)?.profile_image?.url ? null : (
                  <Circle
                    {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.CircleStyles(theme)['Circle'].style,
                        {
                          backgroundColor: theme.colors['DarkGray'],
                          height: 40,
                          width: 40,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* InitialsText */}
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          { fontSize: 16 }
                        ),
                        dimensions.width
                      )}
                    >
                      {getInitials((props.contact ?? null)?.name)}
                    </Text>
                  </Circle>
                )}
              </>
              <>
                {!(props.contact ?? null)?.profile_image?.url ? null : (
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={{
                      uri: `${(props.contact ?? null)?.profile_image?.url}`,
                    }}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { borderRadius: 40, height: 40, width: 40 }
                      ),
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Surface>
          )}
        </>
        <>
          {props.contact ?? null ? null : (
            <Circle
              {...GlobalStyles.CircleStyles(theme)['Circle'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.CircleStyles(theme)['Circle'].style,
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: theme.colors['Light Inverse'],
                    borderStyle: 'solid',
                    borderWidth: 1.5,
                    height: 40,
                    width: 40,
                  }
                ),
                dimensions.width
              )}
            >
              <Icon
                size={24}
                color={theme.colors['Light Inverse']}
                name={'AntDesign/question'}
              />
            </Circle>
          )}
        </>
        {/* EmptyAvatarView */}
        <>
          {props.contact ?? null ? null : (
            <Surface
              elevation={0}
              {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                  {
                    borderColor: theme.colors['Light Inverse'],
                    borderRadius: 40,
                    borderStyle: 'dashed',
                    overflow: 'hidden',
                  }
                ),
                dimensions.width
              )}
            >
              <>
                {!(props.contact ?? null)?.profile_image?.url ? null : (
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={{
                      uri: `${(props.contact ?? null)?.profile_image?.url}`,
                    }}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { borderRadius: 40, height: 40, width: 40 }
                      ),
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Surface>
          )}
        </>
        {/* TextView */}
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, justifyContent: 'center' },
            dimensions.width
          )}
        >
          <TextInput
            autoCapitalize={'none'}
            changeTextDelay={500}
            onBlur={() => {
              const textInputValue = undefined;
              try {
                setGlobalVariableValue({
                  key: 'ACTIVE_BLOCK_ID',
                  value: props.id ?? '',
                });
              } catch (err) {
                console.error(err);
              }
            }}
            onChangeText={newTextInputValue => {
              const textInputValue = newTextInputValue;
              try {
                props.onChangeValue?.(props.id ?? '', newTextInputValue);
                if (newTextInputValue === '') {
                  props.onDelete?.(props.id ?? '');
                } else {
                }
              } catch (err) {
                console.error(err);
              }
            }}
            onFocus={() => {
              const textInputValue = undefined;
              try {
                setGlobalVariableValue({
                  key: 'ACTIVE_BLOCK_ID',
                  value: props.id ?? '',
                });
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
            allowFontScaling={false}
            autoCorrect={false}
            autoFocus={true}
            defaultValue={props.text ?? ''}
            multiline={true}
            placeholder={'What was said?'}
            placeholderTextColor={theme.colors['Light']}
            scrollEnabled={false}
            selectTextOnFocus={false}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                {
                  borderBottomWidth: 0,
                  borderColor: null,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }
              ),
              dimensions.width
            )}
          />
        </View>
      </View>
      {/* ContactSelection */}
      <>
        {!(
          (props.id ?? '') === Constants['ACTIVE_BLOCK_ID'] &&
          !showAddNewContactForm
        ) ? null : (
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row', margin: 12 },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: theme.colors['Light Gray'],
                  borderRadius: 36,
                  flexDirection: 'row',
                  height: 36,
                  marginRight: 12,
                  overflow: 'hidden',
                  paddingLeft: 8,
                  paddingRight: 8,
                },
                dimensions.width
              )}
            >
              {/* SearchInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onBlur={() => {
                  try {
                    /* hidden 'Set Variable' action */
                  } catch (err) {
                    console.error(err);
                  }
                }}
                onChangeText={newSearchInputValue => {
                  try {
                    setSearchStringDisplayValue(newSearchInputValue);
                    if (newSearchInputValue === '') {
                      props.onDelete?.(props.id ?? '');
                    } else {
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
                onChangeTextDelayed={newSearchInputValue => {
                  try {
                    setSearchStringValue(newSearchInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                onFocus={() => {
                  try {
                    if (!searchStringValue) {
                      setSearchStringDisplayValue(undefined);
                    }
                    setShowRecentContactsList(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                clearButtonMode={'always'}
                placeholder={'Who said it?'}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      borderBottomWidth: 0,
                      borderColor: null,
                      borderLeftWidth: 0,
                      borderRadius: null,
                      borderRightWidth: 0,
                      borderTopWidth: 0,
                      fontSize: 12,
                      lineHeight: 17,
                      minWidth: 80,
                      paddingBottom: 0,
                      paddingLeft: 8,
                      paddingRight: 4,
                      paddingTop: 0,
                    }
                  ),
                  dimensions.width
                )}
                value={searchStringDisplayValue}
              />
              <Pressable
                onPress={() => {
                  try {
                    setShowAddNewContactForm(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['Surface'],
                      borderRadius: 40,
                      paddingBottom: 2,
                      paddingLeft: 6,
                      paddingRight: 6,
                      paddingTop: 2,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        { color: theme.colors['Medium'], fontSize: 12 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'New'}
                  </Text>
                </View>
              </Pressable>
            </View>
            {/* RecentContactsList */}
            <>
              {searchStringValue ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  <XANOApi.FetchGetRecentsAndFavoritesGET>
                    {({
                      loading,
                      error,
                      data,
                      refetchGetRecentsAndFavorites,
                    }) => {
                      const fetchData = data?.json;
                      if (loading) {
                        return <ActivityIndicator />;
                      }

                      if (error || data?.status < 200 || data?.status >= 300) {
                        return <ActivityIndicator />;
                      }

                      return (
                        <>
                          {/* MePressable */}
                          <>
                            {!(fetchData?.length === 0) ? null : (
                              <Pressable
                                onPress={() => {
                                  try {
                                    /* hidden 'API Request' action */
                                    props.onChangeContact?.(
                                      props.id ?? '',
                                      Constants['CX_USER']
                                    );
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                {/* MeView */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      paddingBottom: 7,
                                      paddingRight: 15,
                                      paddingTop: 7,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* MeContactView */}
                                  <SearchContactViewBlock
                                    contact={Constants['CX_USER']}
                                    nameOnly={true}
                                  />
                                </View>
                              </Pressable>
                            )}
                          </>
                          <SimpleStyleFlatList
                            data={fetchData}
                            inverted={false}
                            keyExtractor={(listData, index) =>
                              listData?.id ?? listData?.uuid ?? index.toString()
                            }
                            listKey={'chaQUGe1'}
                            nestedScrollEnabled={false}
                            numColumns={1}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item, index }) => {
                              const listData = item;
                              return (
                                <>
                                  {/* MePressable */}
                                  <>
                                    {!(index === 0) ? null : (
                                      <Pressable
                                        onPress={() => {
                                          try {
                                            /* hidden 'API Request' action */
                                            props.onChangeContact?.(
                                              props.id ?? '',
                                              Constants['CX_USER']
                                            );
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        }}
                                      >
                                        {/* MeView */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                              paddingBottom: 7,
                                              paddingRight: 15,
                                              paddingTop: 7,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {/* MeContactView */}
                                          <SearchContactViewBlock
                                            contact={Constants['CX_USER']}
                                            nameOnly={true}
                                          />
                                        </View>
                                      </Pressable>
                                    )}
                                  </>
                                  {/* RecentItemPressable */}
                                  <Pressable
                                    onPress={() => {
                                      const handler = async () => {
                                        try {
                                          (
                                            await XANOApi.toggleRecentsPOST(
                                              Constants,
                                              {
                                                connect_id: listData?.id,
                                                type: listData?.profile_type,
                                              }
                                            )
                                          )?.json;
                                          props.onChangeContact?.(
                                            props.id ?? '',
                                            listData
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      };
                                      handler();
                                    }}
                                  >
                                    {/* RecentItemView */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          paddingBottom: 7,
                                          paddingRight: 15,
                                          paddingTop: 7,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* RecentContactView */}
                                      <SearchContactViewBlock
                                        contact={listData}
                                        nameOnly={true}
                                        searchTerm={listData?.name}
                                      />
                                    </View>
                                  </Pressable>
                                </>
                              );
                            }}
                            showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                            horizontal={true}
                            keyboardShouldPersistTaps={'always'}
                          />
                        </>
                      );
                    }}
                  </XANOApi.FetchGetRecentsAndFavoritesGET>
                </View>
              )}
            </>
            {/* SearchResults */}
            <>
              {!searchStringValue ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['Background'],
                      flex: 1,
                      width: dimensions.width,
                    },
                    dimensions.width
                  )}
                >
                  <XANOApi.FetchSearchContactsGET term={searchStringValue}>
                    {({ loading, error, data, refetchSearchContacts }) => {
                      const fetchData = data?.json;
                      if (loading) {
                        return (
                          <ActivityIndicator
                            animating={true}
                            hidesWhenStopped={true}
                            size={'small'}
                            {...GlobalStyles.ActivityIndicatorStyles(theme)[
                              'Activity Indicator'
                            ].props}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.ActivityIndicatorStyles(theme)[
                                'Activity Indicator'
                              ].style,
                              dimensions.width
                            )}
                          />
                        );
                      }

                      if (error || data?.status < 200 || data?.status >= 300) {
                        return <ActivityIndicator />;
                      }

                      return (
                        <SimpleStyleFlatList
                          data={fetchData}
                          inverted={false}
                          keyExtractor={(listData, index) =>
                            listData?.id ?? listData?.uuid ?? index.toString()
                          }
                          listKey={'iq5a0jvH'}
                          nestedScrollEnabled={false}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <>
                                {/* SearchContactPressable */}
                                <Pressable
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        (
                                          await XANOApi.toggleRecentsPOST(
                                            Constants,
                                            {
                                              connect_id: listData?.id,
                                              type: listData?.profile_type,
                                            }
                                          )
                                        )?.json;
                                        props.onChangeContact?.(
                                          props.id ?? '',
                                          listData
                                        );
                                        setSearchStringValue('');
                                        setSearchStringDisplayValue('');
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
                                  }}
                                >
                                  {/* SearchItemView */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        paddingRight: 15,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <SearchContactViewBlock
                                      contact={listData}
                                      searchTerm={searchStringValue}
                                    />
                                  </View>
                                </Pressable>
                              </>
                            );
                          }}
                          showsHorizontalScrollIndicator={true}
                          showsVerticalScrollIndicator={true}
                          horizontal={true}
                          keyboardShouldPersistTaps={'always'}
                        />
                      );
                    }}
                  </XANOApi.FetchSearchContactsGET>
                </View>
              )}
            </>
          </View>
        )}
      </>
      {/* AddNewContact */}
      <>
        {!showAddNewContactForm ? null : (
          <View style={StyleSheet.applyWidth({ margin: 12 }, dimensions.width)}>
            <AddNewContactButtonBlock
              defaultValue={searchStringValue}
              initialValue={searchStringValue}
              onCancelCreate={() => onCancelCreate()}
              onChange={
                /* no custom function named onNewContactCreate */ undefined
              }
            />
          </View>
        )}
      </>
    </View>
  );
};

export default withTheme(ConversationBlock);
