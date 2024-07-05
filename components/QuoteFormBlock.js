import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import ContactsViewBlock from '../components/ContactsViewBlock';
import ConversationBlock from '../components/ConversationBlock';
import QuoteBlock from '../components/QuoteBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Lib from '../custom-files/Lib';
import extractIds from '../global-functions/extractIds';
import extractUniqueContacts from '../global-functions/extractUniqueContacts';
import locationToGeoPointJson from '../global-functions/locationToGeoPointJson';
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
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Image, Modal, Text, View } from 'react-native';

const QuoteFormBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [blocks, setBlocks] = React.useState([
    { id: -1, type: 'dialogue', _user: null, value: '', quote_id: '-1' },
  ]);
  const [choosenContacts, setChoosenContacts] = React.useState([]);
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [isAddingNewContact, setIsAddingNewContact] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);
  const [searchStringDisplayValue, setSearchStringDisplayValue] =
    React.useState('');
  const [searchStringValue, setSearchStringValue] = React.useState('');
  const [selectedDateTime, setSelectedDateTime] = React.useState(new Date());
  const [selectedLocation, setSelectedLocation] = React.useState({});
  const [showAreYouSureModal, setShowAreYouSureModal] = React.useState(false);
  const [showChooseUserModal, setShowChooseUserModal] = React.useState(false);
  const [showRecentContactsList, setShowRecentContactsList] =
    React.useState(true);
  const [showTutorialModal, setShowTutorialModal] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const toggleChoosenContacts = contact => {
    setChoosenContacts(prev => {
      if (prev.findIndex(c => c.id === contact?.id) > -1) {
        return prev.filter(c => c.id !== contact?.id);
      } else {
        return [...prev, contact];
      }
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

  const convertToLinkArray = arr => {
    return arr.map(contact => {
      console.log('contact', contact);
      return { id: contact.id, type: contact.profile_type || 'user' };
    });
  };

  const showAddDialogButton = () => {
    const lastItem = blocks.slice(-1)[0];
    return !lastItem || lastItem._user || lastItem.value;
  };

  const onContactSelect = (id, contact) => {
    setBlocks(prev => {
      return prev.map(block => {
        if (block.id === id) {
          return { ...block, _user: contact };
        }
        return block;
      });
    });
  };

  const onCloseFunction = () => {
    props.onClose && props.onClose();
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
      const dialogs = prev.filter(p => p.type === 'dialogue');

      if (dialogs.length < 2) return prev;

      return prev.filter(p => p.id !== id);
    });
  };

  const canSubmitQuote = () => {
    for (let block of blocks.filter(b => b.type === 'dialogue')) {
      if (!block?._user?.id || !block?.value) {
        return false;
      }
    }

    return true;
  };

  const onNewContactCreate = contact => {
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
      // const lastItem = (prev ||[])?.slice(-1)[0] || {}

      // if (lastItem.value === '') {

      //   return [...prev.slice(0, -1), {
      //     "id": Lib.uniqid(),
      //     "quote_id": quote_id,
      //     "type": "dialogue",
      //     "value": "",
      //     "_user": contact,
      //   }
      //   ]
      // }

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
  const xANOCreateQuotePOST = XANOApi.useCreateQuotePOST();

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
          marginTop: 50,
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
        {/* ClosePressable */}
        <Pressable
          onPress={() => {
            try {
              setShowAreYouSureModal(true);
              /* hidden 'Run a Custom Function' action */
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
                  backgroundColor: theme.colors['Light Inverse'],
                  height: 35,
                  width: 35,
                }
              ),
              dimensions.width
            )}
          >
            <Icon
              size={24}
              color={theme.colors['Medium']}
              name={'Ionicons/close'}
            />
          </Circle>
        </Pressable>

        <Pressable
          onPress={() => {
            const handler = async () => {
              try {
                if (selectedLocation?.latitude) {
                  setSelectedLocation(null);
                } else {
                  const locationResult = await getLocationUtil();
                  if (locationResult) {
                    setSelectedLocation(locationResult);
                  } else {
                    navigation.navigate('SettingsScreen');
                  }
                }
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          disabled={Constants['SHOW_LOCATION_TUTORIAL']}
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
                  color={theme.colors['DarkGray']}
                  name={'Entypo/map'}
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
                  color={theme.colors['Primary']}
                  name={'Entypo/map'}
                  style={StyleSheet.applyWidth(
                    { marginRight: 4 },
                    dimensions.width
                  )}
                />
              )}
            </>
          </View>
        </Pressable>
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
          format={'mmm d'}
          labelColor={'rgba(0, 0, 0, 0)'}
          maximumDate={new Date()}
          style={StyleSheet.applyWidth(
            {
              borderColor: 'rgba(0, 0, 0, 0)',
              color: theme.colors['Primary'],
              fontFamily: 'Poppins_500Medium',
              fontSize: 14,
              zIndex: 9999,
            },
            dimensions.width
          )}
          type={'underline'}
        />
        {/* DonePressable */}
        <Pressable
          onPress={() => {
            const handler = async () => {
              try {
                if (props.quote_id ?? '') {
                } else {
                  if (uniqueLinkedUsers(Variables, blocks)?.length > 1) {
                    setShowChooseUserModal(true);
                  } else {
                    setChoosenContacts(uniqueLinkedUsers(Variables, blocks));
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
                    if (Constants['SHOW_LOCATION_TUTORIAL']) {
                      setShowTutorialModal(true);
                    } else {
                      onCloseFunction();
                    }
                  }
                }
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          disabled={!canSubmitQuote()}
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
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { color: theme.colors['Medium'], fontSize: 12 }
                ),
                dimensions.width
              )}
            >
              {'Done'}
            </Text>
          </View>
        </Pressable>
      </View>
      {/* Container */}
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
        {/* QuoteContainer */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <View
            style={StyleSheet.applyWidth(
              { alignSelf: 'center' },
              dimensions.width
            )}
          >
            {/* AddQuoteTextButton */}
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
                        backgroundColor: theme.colors['Light Inverse'],
                        borderRadius: 32,
                        color: theme.colors['Primary'],
                        fontFamily: 'Poppins_400Regular',
                        fontSize: 13,
                        marginBottom: 12,
                        minHeight: 38,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Quote setting / Context'}
                />
              )}
            </>
          </View>
          <>
            {!(blocks?.length > 0) ? null : (
              <SimpleStyleFlatList
                data={blocks}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ?? listData?.uuid ?? index.toString()
                }
                listKey={'FuS1pVbc'}
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
                            onChangeContact={(id, contact) =>
                              onContactSelect(id, contact)
                            }
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
              />
            )}
          </>
          {/* Add Dialogue */}
          <>
            {!showAddDialogButton() ? null : (
              <Pressable
                onPress={() => {
                  try {
                    addConversationToBlocks(undefined);
                    /* hidden 'Log to Console' action */
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 12,
                    },
                    dimensions.width
                  )}
                >
                  <Circle
                    {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.CircleStyles(theme)['Circle'].style,
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          borderColor: theme.colors['Light Inverse'],
                          borderStyle: 'dashed',
                          borderWidth: 1.5,
                          height: 35,
                          marginRight: 12,
                          width: 35,
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

                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        { color: theme.colors['Light Inverse'], fontSize: 18 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Add Dialogue'}
                  </Text>
                </View>
              </Pressable>
            )}
          </>
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
                  style={StyleSheet.applyWidth(
                    { left: 16, position: 'absolute', top: 16 },
                    dimensions.width
                  )}
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
                <SimpleStyleFlatList
                  data={extractUniqueContacts(blocks)}
                  inverted={false}
                  keyExtractor={(listData, index) =>
                    listData?.id ?? listData?.uuid ?? index.toString()
                  }
                  listKey={'CABuSbEb'}
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
                        if (Constants['SHOW_LOCATION_TUTORIAL']) {
                          undefined;
                        } else {
                          onCloseFunction();
                        }
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
                backgroundColor: 'rgba(58, 58, 58, 0.09)',
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
                  backgroundColor: 'rgb(255, 255, 255)',
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
                color={theme.colors['Medium']}
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
                    color: 'rgb(99, 99, 102)',
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
      {/* Tutorial Modal */}
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        transparent={true}
        visible={showTutorialModal}
      >
        <Surface
          elevation={0}
          {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.SurfaceStyles(theme)['Surface'].style,
              {
                alignItems: 'center',
                backgroundColor: 'rgb(255, 255, 255)',
                borderRadius: 16,
                height: '100%',
                paddingBottom: 40,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 40,
                width: '100%',
              }
            ),
            dimensions.width
          )}
        >
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
            {'Quote Box\n'}
          </H2>
          <Image
            resizeMode={'cover'}
            source={{
              uri: 'https://static.draftbit.com/images/placeholder-image.png',
            }}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.ImageStyles(theme)['Image'].style,
              dimensions.width
            )}
          />
          {/* ViewQuoteButton */}
          <Button
            iconPosition={'left'}
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'SHOW_LOCATION_TUTORIAL',
                  value: false,
                });
                setShowTutorialModal(false);
                onCloseFunction();
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            disabled={isImporting}
            loading={isImporting}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                {
                  borderColor: 'rgb(242, 242, 247)',
                  borderRadius: 50,
                  borderWidth: 1.5,
                  fontFamily: 'Poppins_600SemiBold',
                  fontSize: 20,
                  marginTop: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                }
              ),
              dimensions.width
            )}
            title={'Continue'}
          />
        </Surface>
      </Modal>
    </View>
  );
};

export default withTheme(QuoteFormBlock);
