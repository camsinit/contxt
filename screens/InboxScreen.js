import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import ContactsViewBlock from '../components/ContactsViewBlock';
import QuoteCardBlock from '../components/QuoteCardBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  DeckSwiper,
  DeckSwiperCard,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const InboxScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [currentQuote, setCurrentQuote] = React.useState({
    id: 36,
    _quote: {
      id: 26,
      _user: {
        id: 41,
        name: 'Rahul Shukla',
        last_name: 'Shukla',
        created_at: 1708378186750,
        first_name: 'Rahul',
        profile_image: {
          url: null,
          meta: {},
          mime: null,
          name: null,
          path: null,
          size: 0,
          type: null,
          access: 'public',
        },
      },
      location: null,
      created_at: 1708378248927,
      quote_date: 1708378217000,
    },
    _blocks: [
      {
        id: 81,
        type: 'description',
        value: 'Test 2',
        user_id: 0,
        quote_id: 26,
        created_at: 1708378249022,
      },
      {
        id: 82,
        type: 'dialogue',
        _user: {
          id: 1,
          name: 'Safa Yasin Okumus',
          last_name: 'Okumus',
          created_at: 1707135327033,
          first_name: 'Safa Yasin',
          profile_image: {
            url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/m6MzrqSRD2umthHXnkb8LajRZS8/IpZi5Q../353720692_221121216935285_3994096430126545802_n.jpg',
            meta: { width: 640, height: 640 },
            mime: 'image/jpeg',
            name: '353720692_221121216935285_3994096430126545802_n.jpg',
            path: '/vault/eh5MAgN4/m6MzrqSRD2umthHXnkb8LajRZS8/IpZi5Q../353720692_221121216935285_3994096430126545802_n.jpg',
            size: 64818,
            type: 'image',
            access: 'public',
          },
        },
        value: 'sefa test 2',
        user_id: 1,
        quote_id: 26,
        created_at: 1708378249086,
      },
      {
        id: 83,
        type: 'dialogue',
        _user: {
          id: 41,
          name: 'Rahul Shukla',
          last_name: 'Shukla',
          created_at: 1708378186750,
          first_name: 'Rahul',
          profile_image: {
            url: null,
            meta: {},
            mime: null,
            name: null,
            path: null,
            size: 0,
            type: null,
            access: 'public',
          },
        },
        value: 'Rahul test 2',
        user_id: 41,
        quote_id: 26,
        created_at: 1708378249152,
      },
      {
        id: 84,
        type: 'dialogue',
        _user: {
          id: 42,
          name: 'Hazer Burak Koç',
          last_name: 'Koç',
          created_at: 1708378249239,
          first_name: 'Hazer',
          profile_image: {
            url: null,
            meta: {},
            mime: null,
            name: null,
            path: null,
            size: 0,
            type: null,
            access: 'public',
          },
        },
        value: 'Hazer test 2',
        user_id: 42,
        quote_id: 26,
        created_at: 1708378249398,
      },
    ],
    user_id: 42,
    quote_id: 26,
    visibilty: 'unset',
    created_at: 1708378249614,
  });
  const [isImporting, setIsImporting] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [lastUpdatedQuoteLink, setLastUpdatedQuoteLink] = React.useState([]);
  const [refetchParam, setRefetchParam] = React.useState('');
  const [showApproveModalFriends, setShowApproveModalFriends] =
    React.useState(false);
  const [showApproveModalJustUs, setShowApproveModalJustUs] =
    React.useState(false);
  const getNItemFromArray = (arr, index) => {
    if ((arr || []).length === index + 1) return (arr || [])[0];
    else return (arr || [])?.[index + 1];
  };

  const removeFromLastUpdatedArray = id => {
    setLastUpdatedQuoteLink(prev => prev.filter(p => p !== id));
  };

  const getFirstItem = arr => {
    return arr?.[0];
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 900000) + 100000;
  };

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
            paddingTop: 0,
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
          <>
            {!lastUpdatedQuoteLink?.length ? null : (
              <Pressable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const quoteLinkToUpdate =
                        getFirstItem(lastUpdatedQuoteLink);
                      setIsUpdating(true);
                      (
                        await XANOApi.updateQuoteLinkPATCH(Constants, {
                          quote_links_id: quoteLinkToUpdate,
                          visibility: 'unset',
                        })
                      )?.json;
                      setIsUpdating(false);
                      removeFromLastUpdatedArray(quoteLinkToUpdate);
                      setRefetchParam(randomNumber());
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['DarkGray'],
                    }),
                    dimensions.width
                  )}
                >
                  {'UNDO'}
                </Text>
              </Pressable>
            )}
          </>
        </View>
      </View>
      {/* Body */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'center', padding: 20 },
          dimensions.width
        )}
      >
        {/* Cards */}
        <View
          style={StyleSheet.applyWidth(
            { flex: 0.9, justifyContent: 'center' },
            dimensions.width
          )}
        >
          <XANOApi.FetchGetQuotesInboxGET
            handlers={{
              onData: fetchData => {
                try {
                  setCurrentQuote(fetchData && fetchData[0]);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            refetch_param={refetchParam}
          >
            {({ loading, error, data, refetchGetQuotesInbox }) => {
              const fetchData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  {/* No ItemView */}
                  <>
                    {currentQuote ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            flex: 1,
                            justifyContent: 'center',
                            paddingLeft: 30,
                            paddingRight: 30,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          allowFontScaling={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                fontFamily: 'Poppins_600SemiBold',
                                fontSize: 32,
                                textAlign: 'center',
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'No quotes here!'}
                        </Text>
                        {/* Text 2 */}
                        <Text
                          accessible={true}
                          allowFontScaling={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                fontSize: 18,
                                marginTop: 15,
                                textAlign: 'center',
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {
                            'Come back here to approve new quotes added to your profile'
                          }
                        </Text>
                        {/* P.S. */}
                        <Text
                          accessible={true}
                          allowFontScaling={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                fontSize: 14,
                                marginTop: 40,
                                textAlign: 'center',
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'You can also add quotes for yourself!'}
                        </Text>
                      </View>
                    )}
                  </>
                  <>
                    {!(fetchData?.length > 0) ? null : (
                      <View>
                        <DeckSwiper
                          data={fetchData}
                          horizontalEnabled={false}
                          infiniteSwiping={true}
                          keyExtractor={(deckSwiperData, index) =>
                            deckSwiperData?.id ??
                            deckSwiperData?.uuid ??
                            index.toString()
                          }
                          listKey={'Giej4HzJ'}
                          onIndexChanged={newIndex => {
                            try {
                              setCurrentQuote(
                                getNItemFromArray(fetchData, newIndex)
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          renderItem={({ item, index }) => {
                            const deckSwiperData = item;
                            return (
                              <DeckSwiperCard
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.DeckSwiperCardStyles(theme)[
                                      'Deck Swiper Card'
                                    ],
                                    {
                                      alignItems: 'stretch',
                                      backgroundColor: 'rgba(0, 0, 0, 0)',
                                      borderWidth: 0,
                                      minHeight: 400,
                                      padding: 0,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    { flex: 0 },
                                    dimensions.width
                                  )}
                                >
                                  <QuoteCardBlock
                                    editable={false}
                                    quote={deckSwiperData}
                                  />
                                </View>
                              </DeckSwiperCard>
                            );
                          }}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.DeckSwiperStyles(theme)['Deck Swiper'],
                            dimensions.width
                          )}
                          verticalEnabled={false}
                          visibleCardCount={3}
                        />
                        {/* FromView */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                            },
                            dimensions.width
                          )}
                        >
                          {/* From */}
                          <Text
                            accessible={true}
                            allowFontScaling={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'],
                                {
                                  color: theme.colors['DarkGray'],
                                  fontFamily: 'Poppins_500Medium',
                                  fontSize: 16,
                                  marginRight: 4,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'From'}
                          </Text>
                          <ContactsViewBlock
                            avatarSize={25}
                            contact={currentQuote?._quote?._user}
                            imageOnly={true}
                          />
                          {/* Name */}
                          <Text
                            accessible={true}
                            allowFontScaling={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'],
                                {
                                  fontFamily: 'Poppins_500Medium',
                                  fontSize: 16,
                                  marginLeft: 4,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {currentQuote?._quote?._user?.first_name}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                </>
              );
            }}
          </XANOApi.FetchGetQuotesInboxGET>
        </View>
        {/* Actions */}
        <>
          {!currentQuote ? null : (
            <View
              style={StyleSheet.applyWidth(
                { flex: 0.1, flexDirection: 'row', paddingBottom: 30 },
                dimensions.width
              )}
            >
              {/* Just Us */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, justifyContent: 'flex-end' },
                  dimensions.width
                )}
              >
                {/* Pressable 2 */}
                <Pressable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        setIsUpdating(true);
                        (
                          await XANOApi.updateQuoteLinkPATCH(Constants, {
                            quote_links_id: currentQuote?.id,
                            visibility: 'private',
                          })
                        )?.json;
                        setIsUpdating(false);
                        setLastUpdatedQuoteLink(
                          lastUpdatedQuoteLink.concat([currentQuote?.id])
                        );
                        setRefetchParam(randomNumber());
                        setShowApproveModalJustUs(true);
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
                        backgroundColor: 'rgba(41, 96, 203, 0.15)',
                        borderColor: theme.colors['Blue'],
                        borderRadius: 50,
                        borderWidth: 1,
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      color={theme.colors['Blue']}
                      name={'Ionicons/lock-closed'}
                      size={19}
                      style={StyleSheet.applyWidth(
                        { marginRight: 8 },
                        dimensions.width
                      )}
                    />
                    {/* JustUs */}
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Blue'],
                            fontFamily: 'Poppins_500Medium',
                            fontSize: 12,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Just Us'}
                    </Text>
                  </View>
                </Pressable>
              </View>
              {/* Trash */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
                  dimensions.width
                )}
              >
                <Pressable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        setIsUpdating(true);
                        (
                          await XANOApi.updateQuoteLinkPATCH(Constants, {
                            quote_links_id: currentQuote?.id,
                            visibility: 'denied',
                          })
                        )?.json;
                        setIsUpdating(false);
                        setLastUpdatedQuoteLink(
                          lastUpdatedQuoteLink.concat([currentQuote?.id])
                        );
                        setRefetchParam(randomNumber());
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
                        alignItems: 'center',
                        backgroundColor: theme.colors['LightRed'],
                        borderColor: theme.colors['Red'],
                        borderRadius: 50,
                        borderWidth: 1,
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'center',
                        width: 50,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Trash */}
                    <Icon
                      color={theme.colors['Red']}
                      name={'Ionicons/close'}
                      size={24}
                    />
                  </View>
                </Pressable>
              </View>
              {/* Friends */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, justifyContent: 'flex-end' },
                  dimensions.width
                )}
              >
                <Pressable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        setIsUpdating(true);
                        (
                          await XANOApi.updateQuoteLinkPATCH(Constants, {
                            quote_links_id: currentQuote?.id,
                            visibility: 'public',
                          })
                        )?.json;
                        setIsUpdating(false);
                        setLastUpdatedQuoteLink(
                          lastUpdatedQuoteLink.concat([currentQuote?.id])
                        );
                        setRefetchParam(randomNumber());
                        setShowApproveModalFriends(true);
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
                        backgroundColor: theme.colors['LightGreen'],
                        borderColor: theme.colors['Green'],
                        borderRadius: 50,
                        borderWidth: 1,
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      color={theme.colors['Green']}
                      name={'Ionicons/ios-people'}
                      size={19}
                      style={StyleSheet.applyWidth(
                        { marginRight: 8 },
                        dimensions.width
                      )}
                    />
                    {/* Friends */}
                    <Text
                      accessible={true}
                      allowFontScaling={true}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Green'],
                            fontFamily: 'Poppins_500Medium',
                            fontSize: 12,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Friends'}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        </>
      </View>
      {/* Approved Modal - Private */}
      <Modal
        animationType={'none'}
        transparent={true}
        visible={showApproveModalJustUs}
      >
        <BlurView
          intensity={50}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.BlurViewStyles(theme)['Blur View'],
              {
                alignItems: 'center',
                backgroundColor: 'rgba(58, 58, 58, 0.09)',
                justifyContent: 'center',
              }
            ),
            dimensions.width
          )}
          tint={'default'}
        >
          <Surface
            elevation={0}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.SurfaceStyles(theme)['Surface'], {
                alignItems: 'center',
                backgroundColor: 'rgb(255, 255, 255)',
                borderRadius: 16,
                paddingBottom: 40,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 40,
                width: '90%',
              }),
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  left: 5,
                  top: -15,
                },
                dimensions.width
              )}
            >
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, flexDirection: 'row' },
                  dimensions.width
                )}
              >
                <IconButton
                  color={theme.colors['Medium']}
                  icon={'Feather/x'}
                  onPress={() => {
                    try {
                      setShowApproveModalJustUs(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  size={32}
                />
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
                  dimensions.width
                )}
              >
                <Pressable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const quoteLinkToUpdate =
                          getFirstItem(lastUpdatedQuoteLink);
                        setIsUpdating(true);
                        (
                          await XANOApi.updateQuoteLinkPATCH(Constants, {
                            quote_links_id: quoteLinkToUpdate,
                            visibility: 'unset',
                          })
                        )?.json;
                        setIsUpdating(false);
                        setShowApproveModalJustUs(false);
                        setRefetchParam(randomNumber());
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                >
                  <Text
                    accessible={true}
                    allowFontScaling={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        { color: theme.colors['DarkGray'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {'UNDO'}
                  </Text>
                </Pressable>
              </View>
            </View>

            <H2
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H2Styles(theme)['H2'], {
                  fontSize: 28,
                  paddingBottom: 15,
                }),
                dimensions.width
              )}
            >
              {'Approved!'}
            </H2>

            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  fontSize: 20,
                  paddingBottom: 15,
                  textAlign: 'center',
                }),
                dimensions.width
              )}
            >
              {'That one will stay private to those involved'}
            </Text>
            {/* ViewQuoteButton */}
            <Button
              disabled={isImporting}
              loading={isImporting}
              onPress={() => {
                try {
                  setShowApproveModalJustUs(false);
                  navigation.navigate('ProfileScreen', {
                    id: Constants['CX_USER']?.id,
                    type: 'user',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['OutlineButton'],
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
              title={'View Quote'}
            />
          </Surface>
        </BlurView>
      </Modal>
      {/* Approved Modal - Friends */}
      <Modal
        animationType={'none'}
        transparent={true}
        visible={showApproveModalFriends}
      >
        <BlurView
          intensity={50}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.BlurViewStyles(theme)['Blur View'],
              {
                alignItems: 'center',
                backgroundColor: 'rgba(58, 58, 58, 0.09)',
                justifyContent: 'center',
              }
            ),
            dimensions.width
          )}
          tint={'default'}
        >
          <Surface
            elevation={0}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.SurfaceStyles(theme)['Surface'], {
                alignItems: 'center',
                backgroundColor: 'rgb(255, 255, 255)',
                borderRadius: 16,
                paddingBottom: 40,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 40,
                width: '90%',
              }),
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  left: 5,
                  top: -15,
                },
                dimensions.width
              )}
            >
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, flexDirection: 'row' },
                  dimensions.width
                )}
              >
                <IconButton
                  color={theme.colors['Medium']}
                  icon={'Feather/x'}
                  onPress={() => {
                    try {
                      setShowApproveModalJustUs(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  size={32}
                />
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
                  dimensions.width
                )}
              >
                <Pressable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const quoteLinkToUpdate =
                          getFirstItem(lastUpdatedQuoteLink);
                        setIsUpdating(true);
                        (
                          await XANOApi.updateQuoteLinkPATCH(Constants, {
                            quote_links_id: quoteLinkToUpdate,
                            visibility: 'unset',
                          })
                        )?.json;
                        setIsUpdating(false);
                        setShowApproveModalJustUs(false);
                        setRefetchParam(randomNumber());
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                >
                  <Text
                    accessible={true}
                    allowFontScaling={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        { color: theme.colors['DarkGray'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {'UNDO'}
                  </Text>
                </Pressable>
              </View>
            </View>

            <H2
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H2Styles(theme)['H2'], {
                  fontSize: 28,
                  paddingBottom: 15,
                }),
                dimensions.width
              )}
            >
              {'Approved!'}
            </H2>

            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  fontSize: 20,
                  paddingBottom: 15,
                  textAlign: 'center',
                }),
                dimensions.width
              )}
            >
              {'Only Contxt users who have your number will see this one'}
            </Text>
            {/* ViewQuoteButton */}
            <Button
              disabled={isImporting}
              loading={isImporting}
              onPress={() => {
                try {
                  setShowApproveModalJustUs(false);
                  navigation.navigate('ProfileScreen', {
                    id: Constants['CX_USER']?.id,
                    type: 'user',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['OutlineButton'],
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
              title={'View Quote'}
            />
          </Surface>
        </BlurView>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(InboxScreen);
