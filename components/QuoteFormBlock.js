import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import AddNewContactButtonBlock from '../components/AddNewContactButtonBlock';
import ContactsViewBlock from '../components/ContactsViewBlock';
import ConversationBlock from '../components/ConversationBlock';
import QuoteBlock from '../components/QuoteBlock';
import SearchContactViewBlock from '../components/SearchContactViewBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as Lib from '../custom-files/Lib';
import extractIds from '../global-functions/extractIds';
import locationToGeoPointJson from '../global-functions/locationToGeoPointJson';
import toggleRecentContacts from '../global-functions/toggleRecentContacts';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getLocationUtil from '../utils/getLocation';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Circle,
  DatePicker,
  Icon,
  Pressable,
  Surface,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const QuoteFormBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [blocks, setBlocks] = React.useState([]);
  const [choosenContacts, setChoosenContacts] = React.useState([]);
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [isAddingNewContact, setIsAddingNewContact] = React.useState(false);
  const [searchStringDisplayValue, setSearchStringDisplayValue] =
    React.useState('');
  const [searchStringValue, setSearchStringValue] = React.useState('');
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const [selectedDateTime, setSelectedDateTime] = React.useState(new Date());
  const [selectedLocation, setSelectedLocation] = React.useState({});
  const [showChooseUserModal, setShowChooseUserModal] = React.useState(false);
  const [showRecentContactsList, setShowRecentContactsList] =
    React.useState(true);
  const [date, setDate] = React.useState(new Date());
  const onCloseFunction = () => {
    props.onClose && props.onClose();
  };

  const toggleSelectedContact = (contact, type) => {
    setSelectedContacts(prev => {
      if (prev.findIndex(c => c.id === contact?.id) > -1) {
        return prev.filter(c => c.id !== contact?.id);
      } else {
        return [...prev, { ...contact, type }];
      }
    });
  };

  const addConversationToBlocks = contact => {
    const quote_id = props.quote_id || Lib.uniqid();

    setBlocks(prev => {
      return [
        ...prev,

        {
          id: Lib.uniqid(),
          quote_id: quote_id,
          type: 'dialogue',
          value: '',
          _user: contact,
        },
      ];
    });
  };

  const updateBlockValue = (id, value) => {
    setBlocks(prev => {
      return prev.map(block => {
        if (block.id === id) {
          return { ...block, value };
        }
        return block;
      });
    });
  };

  const deleteBlock = id => {
    setBlocks(prev => {
      return prev.filter(p => p.id !== id);
    });
  };

  const toggleChoosenContacts = contact => {
    setChoosenContacts(prev => {
      if (prev.findIndex(c => c.id === contact?.id) > -1) {
        return prev.filter(c => c.id !== contact?.id);
      } else {
        return [...prev, contact];
      }
    });
  };

  const convertToLinkArray = arr => {
    return arr.map(contact => ({ id: contact.id, type: contact.type }));
  };

  const addTextToBlocks = () => {
    const quote_id = props.quote_id || Lib.uniqid();

    setBlocks(prev => {
      return [
        ...prev,

        {
          id: Lib.uniqid(),
          quote_id: quote_id,
          type: 'description',
          value: '',
        },
      ];
    });
  };

  const onNewContactCreate = contact => {
    return contact => {
      toggleSelectedContact(contact, 'contact');
    };
  };

  const delayedHide = () => {
    setTimeout(() => {
      if (!isAddingNewContact) setShowRecentContactsList(false);
    }, 500);
  };

  const updateIsAddingNewContact = mode => {
    // console.log('mode', mode)
    setIsAddingNewContact(mode !== 'button');

    if (mode === 'button') searchInputG4eZj05mRef?.current?.focus();
  };
  React.useEffect(() => {
    try {
      if (props.selected_contact) {
        toggleSelectedContact(
          props.selected_contact,
          props.selected_contact_type
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, [props.selected_contact]);
  const xANOCreateQuotePOST = XANOApi.useCreateQuotePOST();
  const searchInputG4eZj05mRef = React.useRef();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors['Background'],
          borderColor: theme.colors['Light Gray'],
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderWidth: 1,
          flex: 1,
          padding: 16,
        },
        dimensions.width
      )}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          dimensions.width
        )}
      >
        {/* AbsoluteHeaderTitle */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', position: 'absolute', width: '100%' },
            dimensions.width
          )}
        >
          {/* Title */}
          <>
            {!(props.title ?? 'New quote') ? null : (
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: 'Poppins_500Medium',
                  }),
                  dimensions.width
                )}
              >
                {props.title ?? 'New quote'}
              </Text>
            )}
          </>
        </View>
        {/* ClosePressable */}
        <Pressable
          onPress={() => {
            try {
              onCloseFunction();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Circle
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.CircleStyles(theme)['Circle'], {
                backgroundColor: theme.colors['Light Inverse'],
                height: 35,
                width: 35,
              }),
              dimensions.width
            )}
          >
            <Icon
              color={theme.colors['Medium']}
              name={'Ionicons/close'}
              size={24}
            />
          </Circle>
        </Pressable>
        {/* DonePressable */}
        <Pressable
          disabled={blocks?.length === 0}
          onPress={() => {
            const handler = async () => {
              try {
                if (props.quote_id ?? '') {
                } else {
                  if (selectedContacts?.length > 1) {
                    setShowChooseUserModal(true);
                  } else {
                    console.log(selectedContacts);
                    setChoosenContacts(selectedContacts);
                    (
                      await xANOCreateQuotePOST.mutateAsync({
                        blocks: blocks,
                        date: selectedDateTime,
                        linked_ids: convertToLinkArray(selectedContacts),
                        location: selectedLocation,
                      })
                    )?.json;
                    onCloseFunction();
                  }
                }
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Light Inverse'],
                borderRadius: 32,
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Medium'],
                  fontSize: 12,
                }),
                dimensions.width
              )}
            >
              {'Done'}
            </Text>
          </View>
        </Pressable>
      </View>
      {/* ActionButtons */}
      <View
        style={StyleSheet.applyWidth(
          { flexDirection: 'row', marginTop: 12 },
          dimensions.width
        )}
      >
        {/* DateTimePicker */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-end',
              alignSelf: 'center',
              backgroundColor: theme.colors['Light Inverse'],
              borderRadius: 8,
              flex: 1,
              height: 34,
              justifyContent: 'center',
              marginRight: 4,
              overflow: 'hidden',
              paddingLeft: 16,
              paddingRight: 16,
            },
            dimensions.width
          )}
        >
          <DatePicker
            autoDismissKeyboard={true}
            borderColor={'rgba(0, 0, 0, 0)'}
            borderColorActive={'rgba(0, 0, 0, 0)'}
            date={datePickerValue}
            format={'mmm d, yyyy'}
            label={'Date'}
            labelColor={'rgba(0, 0, 0, 0)'}
            leftIconMode={'inset'}
            mode={'date'}
            onDateChange={newDatePickerValue => {
              const date = newDatePickerValue;
              try {
                setDatePickerValue(newDatePickerValue);
              } catch (err) {
                console.error(err);
              }
            }}
            rightIconName={'Ionicons/md-chevron-down'}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Primary'],
                fontFamily: 'Poppins_400Regular',
                fontSize: 14,
                marginBottom: 0,
                marginTop: 0,
                zIndex: 9999,
              },
              dimensions.width
            )}
            type={'underline'}
          />
        </View>
        {/* LocationPicker */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: theme.colors['Light Inverse'],
              borderRadius: 8,
              flex: 1,
              justifyContent: 'center',
              marginLeft: 4,
              overflow: 'hidden',
              paddingLeft: 16,
              paddingRight: 16,
            },
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              const handler = async () => {
                try {
                  if (selectedLocation?.latitude) {
                    setSelectedLocation(null);
                  } else {
                    const locationResult = await getLocationUtil();
                    setSelectedLocation(locationResult);
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row' },
                dimensions.width
              )}
            >
              <>
                {selectedLocation?.latitude ? null : (
                  <Icon
                    color={theme.colors['DarkGray']}
                    name={'FontAwesome/location-arrow'}
                    size={24}
                    style={StyleSheet.applyWidth(
                      { marginRight: 4 },
                      dimensions.width
                    )}
                  />
                )}
              </>
              {/* EnabledIcon */}
              <>
                {!selectedLocation?.latitude ? null : (
                  <Icon
                    color={theme.colors['Primary']}
                    name={'FontAwesome/location-arrow'}
                    size={24}
                    style={StyleSheet.applyWidth(
                      { marginRight: 4 },
                      dimensions.width
                    )}
                  />
                )}
              </>
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['Medium'],
                  }),
                  dimensions.width
                )}
              >
                {'Location'}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      {/* Container */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, marginTop: 32 },
          dimensions.width
        )}
      >
        {/* QuoteContainer */}
        <View
          style={StyleSheet.applyWidth(
            {
              borderColor: theme.colors['Light Inverse'],
              borderRadius: 12,
              borderWidth: 1,
              flex: 1,
              padding: 16,
            },
            dimensions.width
          )}
        >
          <FlatList
            data={blocks}
            keyExtractor={(listData, index) =>
              listData?.id ?? listData?.uuid ?? index.toString()
            }
            keyboardShouldPersistTaps={'always'}
            listKey={'wyTzOzbS'}
            numColumns={1}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => {
              const listData = item;
              return (
                <>
                  <View
                    style={StyleSheet.applyWidth(
                      { marginBottom: 8 },
                      dimensions.width
                    )}
                  >
                    <>
                      {!(listData?.type === 'description') ? null : (
                        <QuoteBlock
                          editable={true}
                          id={listData?.id}
                          onChange={(id, value) => updateBlockValue(id, value)}
                          onDelete={id => deleteBlock(id)}
                          text={listData?.value}
                        />
                      )}
                    </>
                    <>
                      {!(listData?.type === 'dialogue') ? null : (
                        <ConversationBlock
                          contact={listData && listData['_user']}
                          id={listData?.id}
                          onChangeValue={(id, value) =>
                            updateBlockValue(id, value)
                          }
                          onDelete={id => deleteBlock(id)}
                          text={listData?.value}
                        />
                      )}
                    </>
                  </View>
                </>
              );
            }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
          />
        </View>
        {/* FooterMenu */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', marginTop: 20 },
            dimensions.width
          )}
        >
          {/* SearchPeopleView */}
          <View style={StyleSheet.applyWidth({ flex: 0.4 }, dimensions.width)}>
            {/* RecentContactsList */}
            <>
              {!(!searchStringValue && showRecentContactsList) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['Background'],
                      bottom: 36,
                      left: -20,
                      position: 'absolute',
                      width: dimensions.width,
                    },
                    dimensions.width
                  )}
                >
                  <>
                    {isAddingNewContact ? null : (
                      <View>
                        {/* RecentLabel */}
                        <Text
                          accessible={true}
                          allowFontScaling={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                color: theme.colors['Light'],
                                fontFamily: 'Poppins_500Medium',
                                fontSize: 10,
                                marginLeft: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Recent'}
                        </Text>
                        {/* MePressable */}
                        <Pressable
                          onPress={() => {
                            try {
                              toggleSelectedContact(
                                Constants['CX_USER'],
                                'user'
                              );
                              setShowRecentContactsList(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          {/* MeItemView */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                borderColor: theme.colors['Light Gray'],
                                borderTopWidth: 1,
                                flexDirection: 'row',
                                paddingBottom: 7,
                                paddingLeft: 15,
                                paddingRight: 15,
                                paddingTop: 7,
                              },
                              dimensions.width
                            )}
                          >
                            {/* MeItemContactView */}
                            <SearchContactViewBlock
                              contact={Constants['CX_USER']}
                            />
                          </View>
                        </Pressable>
                        <FlatList
                          data={Constants['RECENT_CONTACTS']}
                          keyExtractor={(listData, index) =>
                            listData?.id ?? listData?.uuid ?? index.toString()
                          }
                          keyboardShouldPersistTaps={'always'}
                          listKey={'mbeSsA2t'}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <>
                                {/* RecentItemPressable */}
                                <Pressable
                                  onPress={() => {
                                    try {
                                      toggleSelectedContact(
                                        listData,
                                        'contact'
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  {/* RecentItemView */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        borderColor: theme.colors['Light Gray'],
                                        borderTopWidth: 1,
                                        flexDirection: 'row',
                                        paddingBottom: 7,
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        paddingTop: 7,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* RecentContactView */}
                                    <SearchContactViewBlock
                                      contact={listData}
                                      searchTerm={listData?.name}
                                    />
                                  </View>
                                </Pressable>
                              </>
                            );
                          }}
                          showsHorizontalScrollIndicator={true}
                          showsVerticalScrollIndicator={true}
                        />
                      </View>
                    )}
                  </>
                  <>
                    {!showRecentContactsList ? null : (
                      <AddNewContactButtonBlock
                        onChange={onNewContactCreate(undefined)}
                        onModeChange={mode => updateIsAddingNewContact(mode)}
                      />
                    )}
                  </>
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
                      bottom: 36,
                      left: -20,
                      position: 'absolute',
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
                            style={StyleSheet.applyWidth(
                              GlobalStyles.ActivityIndicatorStyles(theme)[
                                'Activity Indicator'
                              ],
                              dimensions.width
                            )}
                          />
                        );
                      }

                      if (error || data?.status < 200 || data?.status >= 300) {
                        return <ActivityIndicator />;
                      }

                      return (
                        <FlatList
                          data={fetchData}
                          keyExtractor={(listData, index) =>
                            listData?.id ?? listData?.uuid ?? index.toString()
                          }
                          keyboardShouldPersistTaps={'always'}
                          listKey={'gLsym6XY'}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <>
                                {/* SearchContactPressable */}
                                <Pressable
                                  onPress={() => {
                                    try {
                                      toggleSelectedContact(
                                        listData,
                                        'contact'
                                      );
                                      toggleRecentContacts(
                                        Variables,
                                        setGlobalVariableValue,
                                        listData
                                      );
                                      setSearchStringValue('');
                                      setSearchStringDisplayValue('');
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  {/* SearchItemView */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        borderColor: theme.colors['Light Gray'],
                                        borderTopWidth: 1,
                                        flexDirection: 'row',
                                        paddingBottom: 7,
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        paddingTop: 7,
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
                        />
                      );
                    }}
                  </XANOApi.FetchSearchContactsGET>
                </View>
              )}
            </>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: theme.colors['Light Inverse'],
                  borderRadius: 36,
                  flexDirection: 'row',
                  height: 36,
                  overflow: 'hidden',
                  paddingLeft: 8,
                  paddingRight: 8,
                },
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    setShowRecentContactsList(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Image
                  resizeMode={'contain'}
                  source={Images.AddUserIcon}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'],
                      { height: 24, width: 24 }
                    ),
                    dimensions.width
                  )}
                />
              </Pressable>
              {/* SearchInput */}
              <TextInput
                allowFontScaling={true}
                autoCapitalize={'none'}
                autoFocus={true}
                changeTextDelay={500}
                clearButtonMode={'always'}
                onBlur={() => {
                  try {
                    delayedHide();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                onChangeText={newSearchInputValue => {
                  try {
                    setSearchStringDisplayValue(newSearchInputValue);
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
                placeholder={'Add Person'}
                ref={searchInputG4eZj05mRef}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'],
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
                      paddingLeft: 4,
                      paddingRight: 4,
                      paddingTop: 0,
                    }
                  ),
                  dimensions.width
                )}
                value={searchStringDisplayValue}
              />
            </View>
          </View>
          {/* SelectedPeopleView */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 0.6,
                flexDirection: 'row',
                paddingBottom: 6,
                paddingLeft: 12,
                paddingTop: 6,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-end',
                  flex: 1,
                  marginRight: 4,
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              <FlatList
                data={selectedContacts}
                horizontal={true}
                keyExtractor={(listData, index) =>
                  listData?.id ?? listData?.uuid ?? index.toString()
                }
                keyboardShouldPersistTaps={'always'}
                listKey={'vCYxStHd'}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 4 },
                        dimensions.width
                      )}
                    >
                      <Pressable
                        onPress={() => {
                          try {
                            addConversationToBlocks(listData);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <ContactsViewBlock
                          avatarSize={24}
                          contact={listData}
                          imageOnly={true}
                        />
                      </Pressable>
                    </View>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
              />
            </View>

            <Pressable
              onPress={() => {
                try {
                  addTextToBlocks();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Image
                resizeMode={'contain'}
                source={Images.Icon}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                    height: 24,
                    width: 24,
                  }),
                  dimensions.width
                )}
              />
            </Pressable>
          </View>
        </View>
      </View>
      {/* ChooseUserModal */}
      <>
        {!showChooseUserModal ? null : (
          <View
            style={StyleSheet.applyWidth(
              { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
              dimensions.width
            )}
          >
            <BlurView
              intensity={50}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.BlurViewStyles(theme)['Blur View'],
                  { alignItems: 'center', justifyContent: 'center' }
                ),
                dimensions.width
              )}
              tint={'default'}
            >
              <Surface
                elevation={3}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.SurfaceStyles(theme)['Surface'],
                    {
                      alignItems: 'center',
                      backgroundColor: theme.colors['Light Inverse'],
                      borderRadius: 16,
                      paddingBottom: 40,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 40,
                      width: '90%',
                    }
                  ),
                  dimensions.width
                )}
              >
                <H2
                  style={StyleSheet.applyWidth(
                    GlobalStyles.H2Styles(theme)['H2'],
                    dimensions.width
                  )}
                >
                  {"Who's Quote"}
                </H2>
                <FlatList
                  data={selectedContacts}
                  horizontal={true}
                  keyExtractor={(listData, index) =>
                    listData?.id ?? listData?.uuid ?? index.toString()
                  }
                  keyboardShouldPersistTaps={'always'}
                  listKey={'YVliBnBJ'}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <Pressable
                        onPress={() => {
                          try {
                            toggleChoosenContacts(listData);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignContent: 'center',
                              alignItems: 'center',
                              borderColor: theme.colors['Green'],
                              borderRadius: 50,
                              borderWidth: choosenContacts.includes(listData)
                                ? 5
                                : 0,
                              height: 60,
                              justifyContent: 'center',
                              marginRight: 6,
                              width: 60,
                            },
                            dimensions.width
                          )}
                        >
                          <ContactsViewBlock
                            avatarSize={50}
                            contact={listData}
                            imageOnly={true}
                          />
                        </View>
                      </Pressable>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                />
                {/* ProceedButton */}
                <Button
                  disabled={choosenContacts?.length === 0}
                  disabledOpacity={0.2}
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const createResult = (
                          await xANOCreateQuotePOST.mutateAsync({
                            blocks: blocks,
                            date: selectedDateTime,
                            linked_ids: convertToLinkArray(choosenContacts),
                            location: locationToGeoPointJson(selectedLocation),
                          })
                        )?.json;
                        onCloseFunction();
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      { marginTop: 25, minHeight: 40, width: '100%' }
                    ),
                    dimensions.width
                  )}
                  title={'Proceed'}
                />
              </Surface>
            </BlurView>
          </View>
        )}
      </>
    </View>
  );
};

export default withTheme(QuoteFormBlock);
