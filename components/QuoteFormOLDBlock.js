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
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getLocationUtil from '../utils/getLocation';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Circle,
  DatePicker,
  Icon,
  IconButton,
  Pressable,
  SimpleStyleFlatList,
  Surface,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const QuoteFormOLDBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [blocks, setBlocks] = React.useState([]);
  const [choosenContacts, setChoosenContacts] = React.useState([]);
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isAddingNewContact, setIsAddingNewContact] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [mode, setMode] = React.useState('');
  const [newNameValue, setNewNameValue] = React.useState('');
  const [searchStringDisplayValue, setSearchStringDisplayValue] =
    React.useState('');
  const [searchStringValue, setSearchStringValue] = React.useState('');
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const [selectedDateTime, setSelectedDateTime] = React.useState(new Date());
  const [selectedLocation, setSelectedLocation] = React.useState({});
  const [showAreYouSureModal, setShowAreYouSureModal] = React.useState(false);
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
    return arr.map(contact => {
      // console.log(contact)
      return { id: contact.id, type: contact.profile_type };
    });
  };

  const addTextToBlocks = () => {
    const quote_id = props.quote_id || Lib.uniqid();

    setBlocks(prev => {
      const lastItem = prev.slice(-1)[0] || {};

      if (lastItem.value === '') {
        return [
          ...prev.slice(0, -1),
          {
            id: Lib.uniqid(),
            quote_id: quote_id,
            type: 'description',
            value: '',
          },
        ];
      }

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
    console.log('contact', contact);

    toggleSelectedContact(contact, 'contact');

    addConversationToBlocks(contact);
  };

  const showAddContextButton = () => {
    if (blocks.length === 0) return true;

    return blocks[0]?.type !== 'description';
  };

  const uniqueLinkedUsers = Variables => {
    let uniequeUsers = [];
    //blocks is the screen array of object  variable
    for (let block of blocks) {
      if (block?._user?.id) {
        //is the user object already in the uniequeUsers array
        if (!uniequeUsers.find(user => user.id === block?._user?.id)) {
          //push the user object to the uniequeUsers array
          uniequeUsers.push(block?._user);
        }
      }
    }

    return uniequeUsers;
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

  const addConversationToBlocks = contact => {
    const quote_id = props.quote_id || Lib.uniqid();

    setBlocks(prev => {
      const lastItem = prev.slice(-1)[0] || {};

      if (lastItem.value === '') {
        return [
          ...prev.slice(0, -1),
          {
            id: Lib.uniqid(),
            quote_id: quote_id,
            type: 'dialogue',
            value: '',
            _user: contact,
          },
        ];
      }

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

  const uniqueContactFromBlocks = () => {
    let uniequeUsers = [];
    for (let block of blocks) {
      if (block?._user?.id && !uniequeUsers.includes(block?._user?.id))
        uniequeUsers.push(block._user.id);
    }

    return selectedContacts.filter(sc => uniequeUsers.includes(sc.id));
  };

  const addTextToBlockBegining = () => {
    const quote_id = props.quote_id || Lib.uniqid();

    setBlocks(prev => {
      return [
        {
          id: Lib.uniqid(),
          quote_id: quote_id,
          type: 'description',
          value: '',
        },
        ...prev,
      ];
    });
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
  React.useEffect(() => {
    try {
      toggleSelectedContact(Constants['CX_USER'], 'user');
    } catch (err) {
      console.error(err);
    }
  }, []);
  const searchInputG4eZj05mRef = React.useRef();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors.background.brand,
          borderColor: palettes.App['Light Gray'],
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
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontFamily: 'Poppins_500Medium' }
                  ),
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
              setShowAreYouSureModal(true);
              /* hidden 'Run a Custom Function' action */
              /* hidden 'Focus Text Input' action */
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Circle
            {...GlobalStyles.CircleStyles(theme)['Circle'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.CircleStyles(theme)['Circle'].style,
                {
                  backgroundColor: palettes.Brand['Light Inverse'],
                  height: 35,
                  width: 35,
                }
              ),
              dimensions.width
            )}
          >
            <Icon
              size={24}
              color={theme.colors.text.medium}
              name={'Ionicons/close'}
            />
          </Circle>
        </Pressable>
        {/* DonePressable */}
        <Pressable
          onPress={() => {
            const handler = async () => {
              try {
                if (props.quote_id ?? '') {
                } else {
                  /* hidden 'Log to Console' action */
                  if (uniqueLinkedUsers(Variables, blocks)?.length > 1) {
                    setShowChooseUserModal(true);
                  } else {
                    setChoosenContacts(uniqueContactFromBlocks());
                    (
                      await xANOCreateQuotePOST.mutateAsync({
                        blocks: blocks,
                        date: selectedDateTime,
                        linked_ids: convertToLinkArray(
                          uniqueLinkedUsers(Variables, blocks)
                        ),
                        location: locationToGeoPointJson(selectedLocation),
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
          disabled={blocks?.length === 0}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Brand['Light Inverse'],
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
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { color: theme.colors.text.medium, fontSize: 12 }
                ),
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
              backgroundColor: palettes.Brand['Light Inverse'],
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
            disabled={false}
            hideLabel={false}
            label={'Date'}
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
            borderColorActive={'rgba(0, 0, 0, 0)'}
            date={datePickerValue}
            format={'mmm d, yyyy'}
            labelColor={'rgba(0, 0, 0, 0)'}
            maximumDate={new Date()}
            rightIconName={'Ionicons/chevron-down'}
            style={StyleSheet.applyWidth(
              {
                borderColor: 'rgba(0, 0, 0, 0)',
                color: theme.colors.branding.primary,
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
              backgroundColor: palettes.Brand['Light Inverse'],
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
                    const locationResult = await getLocationUtil({
                      accuracy: 'Highest',
                    });
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
                    size={24}
                    color={palettes.App.DarkGray}
                    name={'FontAwesome/location-arrow'}
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
                    size={24}
                    color={theme.colors.branding.primary}
                    name={'FontAwesome/location-arrow'}
                    style={StyleSheet.applyWidth(
                      { marginRight: 4 },
                      dimensions.width
                    )}
                  />
                )}
              </>
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { color: theme.colors.text.medium }
                  ),
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
              borderColor: palettes.Brand['Light Inverse'],
              borderRadius: 12,
              borderWidth: 1,
              flex: 1,
              padding: 16,
            },
            dimensions.width
          )}
        >
          <>
            {!showAddContextButton() ? null : (
              <Button
                iconPosition={'left'}
                onPress={() => {
                  try {
                    addTextToBlockBegining();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    {
                      backgroundColor: palettes.Brand['Light Inverse'],
                      color: theme.colors.branding.primary,
                      fontFamily: 'Poppins_400Regular',
                      fontSize: 14,
                      marginBottom: 12,
                      minHeight: 38,
                    }
                  ),
                  dimensions.width
                )}
                title={'Add Quote Context'}
              />
            )}
          </>
          <>
            {!(blocks?.length > 0) ? null : (
              <SimpleStyleFlatList
                data={blocks}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ?? listData?.uuid ?? index.toString()
                }
                listKey={'wyTzOzbS'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
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
                            onChange={(id, value) =>
                              updateBlockValue(id, value)
                            }
                            onDelete={id => deleteBlock(id)}
                            text={listData?.value}
                          />
                        )}
                      </>
                      <>
                        {!(listData?.type === 'dialogue') ? null : (
                          <ConversationBlock
                            contact={listData?._user}
                            id={listData?.id}
                            onChangeValue={(id, value) =>
                              updateBlockValue(id, value)
                            }
                            onDelete={id => deleteBlock(id)}
                            text={listData?.text}
                          />
                        )}
                      </>
                    </View>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps={'always'}
                style={StyleSheet.applyWidth(
                  { backgroundColor: 'rgba(0, 0, 0, 0)' },
                  dimensions.width
                )}
              />
            )}
          </>
          <>
            {!(blocks?.length === 0) ? null : (
              <Pressable
                onPress={() => {
                  try {
                    addConversationToBlocks(Constants['CX_USER']);
                    /* hidden 'Log to Console' action */
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { height: '100%', width: '100%' },
                    dimensions.width
                  )}
                />
              </Pressable>
            )}
          </>
        </View>
        {/* QuoteMenuBar */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              flexDirection: 'row',
              marginTop: 20,
              paddingBottom: 5,
              paddingTop: 5,
            },
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
                      backgroundColor: theme.colors.background.brand,
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
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                color: theme.colors.text.light,
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

                        <XANOApi.FetchGetRecentsGET>
                          {({ loading, error, data, refetchGetRecents }) => {
                            const fetchData = data?.json;
                            if (loading) {
                              return <ActivityIndicator />;
                            }

                            if (
                              error ||
                              data?.status < 200 ||
                              data?.status >= 300
                            ) {
                              return <ActivityIndicator />;
                            }

                            return (
                              <SimpleStyleFlatList
                                data={fetchData}
                                horizontal={false}
                                inverted={false}
                                keyExtractor={(listData, index) =>
                                  listData?.id ??
                                  listData?.uuid ??
                                  index.toString()
                                }
                                listKey={'mbeSsA2t'}
                                nestedScrollEnabled={false}
                                numColumns={1}
                                onEndReachedThreshold={0.5}
                                renderItem={({ item, index }) => {
                                  const listData = item;
                                  return (
                                    <>
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
                                              /* hidden 'Run a Custom Function' action */
                                              addConversationToBlocks(listData);
                                              /* hidden 'Set Variable' action */
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
                                              borderColor:
                                                palettes.App['Light Gray'],
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
                                keyboardShouldPersistTaps={'always'}
                              />
                            );
                          }}
                        </XANOApi.FetchGetRecentsGET>
                      </View>
                    )}
                  </>
                  <AddNewContactButtonBlock
                    onChange={contact => onNewContactCreate(contact)}
                    onModeChange={mode => updateIsAddingNewContact(mode)}
                  />
                </View>
              )}
            </>
            {/* SearchResults */}
            <>
              {!searchStringValue ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.background.brand,
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
                          horizontal={false}
                          inverted={false}
                          keyExtractor={(listData, index) =>
                            listData?.id ?? listData?.uuid ?? index.toString()
                          }
                          listKey={'gLsym6XY'}
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
                                        toggleSelectedContact(
                                          listData,
                                          'contact'
                                        );
                                        /* hidden 'Run a Custom Function' action */
                                        (
                                          await XANOApi.toggleRecentsPOST(
                                            Constants,
                                            {
                                              connect_id: listData?.id,
                                              type: listData?.profile_type,
                                            }
                                          )
                                        )?.json;
                                        addConversationToBlocks(listData);
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
                                        borderColor: palettes.App['Light Gray'],
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
                          keyboardShouldPersistTaps={'always'}
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
                  backgroundColor: palettes.Brand['Light Inverse'],
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
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  resizeMode={'contain'}
                  source={Images.AddUserIcon}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 24, width: 24 }
                    ),
                    dimensions.width
                  )}
                />
              </Pressable>
              {/* SearchInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onBlur={() => {
                  try {
                    delayedHide();
                    /* hidden 'Set Variable' action */
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
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                autoFocus={true}
                clearButtonMode={'always'}
                placeholder={'Add Person'}
                ref={searchInputG4eZj05mRef}
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
            </View>
          </View>
          {/* SelectedPeopleView */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0)',
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
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(0, 0, 0, 0)',
                  flex: 1,
                  marginRight: 4,
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              <SimpleStyleFlatList
                data={selectedContacts}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ?? listData?.uuid ?? index.toString()
                }
                listKey={'vCYxStHd'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <View
                      style={StyleSheet.applyWidth(
                        { backgroundColor: 'rgba(0, 0, 0, 0)', marginRight: 4 },
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
                        style={StyleSheet.applyWidth(
                          {
                            borderColor: 'rgba(0, 0, 0, 0)',
                            borderLeftWidth: 5,
                            borderRightWidth: 5,
                          },
                          dimensions.width
                        )}
                      >
                        <ContactsViewBlock
                          avatarSize={28}
                          contact={listData}
                          imageOnly={true}
                        />
                      </Pressable>
                    </View>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                horizontal={true}
                keyboardShouldPersistTaps={'always'}
                style={StyleSheet.applyWidth(
                  { backgroundColor: 'rgba(0, 0, 0, 0)' },
                  dimensions.width
                )}
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
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={Images.DescriptionIconV4}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 28, width: 28 }
                  ),
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
              tint={'default'}
              {...GlobalStyles.BlurViewStyles(theme)['Blur View'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.BlurViewStyles(theme)['Blur View'].style,
                  { alignItems: 'center', justifyContent: 'center' }
                ),
                dimensions.width
              )}
            >
              <Surface
                {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
                elevation={3}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.Brand['Light Inverse'],
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
                <IconButton
                  onPress={() => {
                    try {
                      setShowChooseUserModal(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  size={32}
                  icon={'AntDesign/closecircleo'}
                />
                <H2
                  selectable={false}
                  {...GlobalStyles.H2Styles(theme)['H2'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.H2Styles(theme)['H2'].style,
                    dimensions.width
                  )}
                >
                  {"Who's Quote"}
                </H2>
                <FlatList
                  data={selectedContacts}
                  inverted={false}
                  keyExtractor={(listData, index) =>
                    listData?.id ?? listData?.uuid ?? index.toString()
                  }
                  listKey={'YVliBnBJ'}
                  nestedScrollEnabled={false}
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
                              borderColor: palettes.App.Green,
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
                  horizontal={true}
                  keyboardShouldPersistTaps={'always'}
                />
                {/* SubmitButton */}
                <Button
                  iconPosition={'left'}
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
                  {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                  disabled={choosenContacts?.length === 0}
                  disabledOpacity={0.2}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'].style,
                      { marginTop: 25, minHeight: 40, width: '100%' }
                    ),
                    dimensions.width
                  )}
                  title={'Submit'}
                />
              </Surface>
            </BlurView>
          </View>
        )}
      </>
      {/* Are You Sure Modal  */}
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        transparent={true}
        visible={showAreYouSureModal}
      >
        <BlurView
          intensity={50}
          tint={'default'}
          {...GlobalStyles.BlurViewStyles(theme)['Blur View'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.BlurViewStyles(theme)['Blur View'].style,
              {
                alignItems: 'center',
                backgroundColor: '"rgba(58, 58, 58, 0.09)"',
                justifyContent: 'center',
              }
            ),
            dimensions.width
          )}
        >
          <Surface
            elevation={0}
            {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                {
                  alignItems: 'center',
                  backgroundColor: '"rgb(255, 255, 255)"',
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
            <View
              style={StyleSheet.applyWidth(
                { alignSelf: 'flex-start', left: 5, top: -15 },
                dimensions.width
              )}
            >
              <IconButton
                onPress={() => {
                  try {
                    setShowAreYouSureModal(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                size={32}
                color={theme.colors.text.medium}
                icon={'Feather/x'}
              />
            </View>

            <H2
              selectable={false}
              {...GlobalStyles.H2Styles(theme)['H2'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H2Styles(theme)['H2'].style, {
                  fontSize: 28,
                  paddingBottom: 15,
                }),
                dimensions.width
              )}
            >
              {'Are you sure?'}
            </H2>

            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { fontSize: 20, paddingBottom: 15, textAlign: 'center' }
                ),
                dimensions.width
              )}
            >
              {'Leaving this page will discard all progress'}
            </Text>
            {/* Close Button */}
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  setShowAreYouSureModal(false);
                  onCloseFunction();
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['OutlineButton'].props}
              disabled={isImporting}
              loading={isImporting}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['OutlineButton'].style,
                  {
                    backgroundColor: '"rgb(242, 242, 247)"',
                    borderColor: 'rgb(242, 242, 247)',
                    borderRadius: 50,
                    borderWidth: 1.5,
                    color: '"rgb(99, 99, 102)"',
                    fontFamily: 'Poppins_600SemiBold',
                    fontSize: 20,
                    marginTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }
                ),
                dimensions.width
              )}
              title={'Discard Quote'}
            />
          </Surface>
        </BlurView>
      </Modal>
    </View>
  );
};

export default withTheme(QuoteFormOLDBlock);
