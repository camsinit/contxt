import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import ContactsViewBlock from '../components/ContactsViewBlock';
import ConversationViewBlock from '../components/ConversationViewBlock';
import QuoteBlock from '../components/QuoteBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import extractUniqueContacts from '../global-functions/extractUniqueContacts';
import timeFromNow from '../global-functions/timeFromNow';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { IconButton, Surface, withTheme } from '@draftbit/ui';
import { FlatList, Text, View } from 'react-native';

const QuoteCardBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [isDeleting, setIsDeleting] = React.useState(false);
  const multiply = (val1, val2) => {
    return val1 * val2;
  };
  const xANODeleteQuoteDELETE = XANOApi.useDeleteQuoteDELETE();

  return (
    <Surface
      elevation={0}
      style={StyleSheet.applyWidth(
        StyleSheet.compose(GlobalStyles.SurfaceStyles(theme)['Surface'], {
          borderColor: theme.colors['Light Inverse'],
          borderRadius: 16,
          borderWidth: 1,
          marginLeft: 2,
          marginRight: 2,
          padding: 12,
        }),
        dimensions.width
      )}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          { flexDirection: 'row', minHeight: 60 },
          dimensions.width
        )}
      >
        {/* LeftView */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <FlatList
            contentContainerStyle={StyleSheet.applyWidth(
              { justifyContent: 'flex-end' },
              dimensions.width
            )}
            data={extractUniqueContacts(
              (
                props.quote ?? {
                  _quote: {
                    id: 1,
                    location: null,
                    created_at: 1707135308720,
                    creator_id: 10,
                    quote_date: 1707135311000,
                  },
                  _blocks: [
                    {
                      id: 1,
                      type: 'description',
                      value: 'Shirah sticks her finger in Cam’s ear',
                      user_id: 0,
                      quote_id: 1,
                      created_at: 1707135580235,
                    },
                    {
                      id: 2,
                      type: 'dialogue',
                      _user: {
                        id: 9,
                        name: 'Shirah Wagner',
                        last_name: 'Wagner',
                        created_at: 1707487717302,
                        first_name: 'Shirah',
                        profile_image: {
                          url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                          meta: { width: 147, height: 147 },
                          mime: 'image/png',
                          name: 'Screenshot 2023-12-17 at 5.44 1.png',
                          path: '/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                          size: 42421,
                          type: 'image',
                          access: 'public',
                        },
                      },
                      value: 'That is the biggest damn ear hole I’ve ever felt',
                      user_id: 9,
                      quote_id: 1,
                      created_at: 1707833619958,
                    },
                    {
                      id: 3,
                      type: 'dialogue',
                      _user: {
                        id: 10,
                        name: 'Cam Lindsay',
                        last_name: 'Lindsay',
                        created_at: 1707487875454,
                        first_name: 'Cam',
                        profile_image: {
                          url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/kEfuEiBu9TLotrvcMMiK5pTx47w/AFAAFg../Screenshot+2023-12-17+at+5.44+1.png',
                          meta: { width: 147, height: 147 },
                          mime: 'image/png',
                          name: 'Screenshot 2023-12-17 at 5.44 1.png',
                          path: '/vault/eh5MAgN4/kEfuEiBu9TLotrvcMMiK5pTx47w/AFAAFg../Screenshot+2023-12-17+at+5.44+1.png',
                          size: 33610,
                          type: 'image',
                          access: 'public',
                        },
                      },
                      value: 'How many have you felt??',
                      user_id: 10,
                      quote_id: 1,
                      created_at: 1707833891201,
                    },
                    {
                      id: 4,
                      type: 'dialogue',
                      _user: {
                        id: 9,
                        name: 'Shirah Wagner',
                        last_name: 'Wagner',
                        created_at: 1707487717302,
                        first_name: 'Shirah',
                        profile_image: {
                          url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                          meta: { width: 147, height: 147 },
                          mime: 'image/png',
                          name: 'Screenshot 2023-12-17 at 5.44 1.png',
                          path: '/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                          size: 42421,
                          type: 'image',
                          access: 'public',
                        },
                      },
                      value: 'A bunch! I will not be slut shamed!!',
                      user_id: 9,
                      quote_id: 1,
                      created_at: 1707833926794,
                    },
                  ],
                  quote_id: 1,
                }
              )?._blocks
            )}
            horizontal={false}
            inverted={false}
            keyExtractor={(listData, index) =>
              listData?.id ?? listData?.uuid ?? index.toString()
            }
            keyboardShouldPersistTaps={'never'}
            listKey={'Il408aKn'}
            numColumns={1}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => {
              const listData = item;
              return (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: theme.colors['Background'],
                      borderRadius: 30,
                      borderWidth: 3,
                      left: [
                        { minWidth: Breakpoints.Mobile, value: 0 },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: multiply(index, 22),
                        },
                      ],
                      minHeight: 30,
                      minWidth: 30,
                      position: 'absolute',
                      top: 0,
                    },
                    dimensions.width
                  )}
                >
                  <ContactsViewBlock
                    avatarSize={28}
                    contact={listData}
                    imageOnly={true}
                  />
                </View>
              );
            }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
          />
        </View>
        {/* RightView */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'flex-end', flex: 1 },
            dimensions.width
          )}
        >
          <>
            {props.editable ?? false ? null : (
              <Text
                accessible={true}
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['DarkGray'],
                    fontFamily: 'Poppins_500Medium',
                  }),
                  dimensions.width
                )}
              >
                {timeFromNow(
                  (
                    props.quote ?? {
                      _quote: {
                        id: 1,
                        location: null,
                        created_at: 1707135308720,
                        creator_id: 10,
                        quote_date: 1707135311000,
                      },
                      _blocks: [
                        {
                          id: 1,
                          type: 'description',
                          value: 'Shirah sticks her finger in Cam’s ear',
                          user_id: 0,
                          quote_id: 1,
                          created_at: 1707135580235,
                        },
                        {
                          id: 2,
                          type: 'dialogue',
                          _user: {
                            id: 9,
                            name: 'Shirah Wagner',
                            last_name: 'Wagner',
                            created_at: 1707487717302,
                            first_name: 'Shirah',
                            profile_image: {
                              url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                              meta: { width: 147, height: 147 },
                              mime: 'image/png',
                              name: 'Screenshot 2023-12-17 at 5.44 1.png',
                              path: '/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                              size: 42421,
                              type: 'image',
                              access: 'public',
                            },
                          },
                          value:
                            'That is the biggest damn ear hole I’ve ever felt',
                          user_id: 9,
                          quote_id: 1,
                          created_at: 1707833619958,
                        },
                        {
                          id: 3,
                          type: 'dialogue',
                          _user: {
                            id: 10,
                            name: 'Cam Lindsay',
                            last_name: 'Lindsay',
                            created_at: 1707487875454,
                            first_name: 'Cam',
                            profile_image: {
                              url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/kEfuEiBu9TLotrvcMMiK5pTx47w/AFAAFg../Screenshot+2023-12-17+at+5.44+1.png',
                              meta: { width: 147, height: 147 },
                              mime: 'image/png',
                              name: 'Screenshot 2023-12-17 at 5.44 1.png',
                              path: '/vault/eh5MAgN4/kEfuEiBu9TLotrvcMMiK5pTx47w/AFAAFg../Screenshot+2023-12-17+at+5.44+1.png',
                              size: 33610,
                              type: 'image',
                              access: 'public',
                            },
                          },
                          value: 'How many have you felt??',
                          user_id: 10,
                          quote_id: 1,
                          created_at: 1707833891201,
                        },
                        {
                          id: 4,
                          type: 'dialogue',
                          _user: {
                            id: 9,
                            name: 'Shirah Wagner',
                            last_name: 'Wagner',
                            created_at: 1707487717302,
                            first_name: 'Shirah',
                            profile_image: {
                              url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                              meta: { width: 147, height: 147 },
                              mime: 'image/png',
                              name: 'Screenshot 2023-12-17 at 5.44 1.png',
                              path: '/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                              size: 42421,
                              type: 'image',
                              access: 'public',
                            },
                          },
                          value: 'A bunch! I will not be slut shamed!!',
                          user_id: 9,
                          quote_id: 1,
                          created_at: 1707833926794,
                        },
                      ],
                      quote_id: 1,
                    }
                  )?._quote?.quote_date
                )}
              </Text>
            )}
          </>
          <>
            {!(props.editable ?? false) ? null : (
              <IconButton
                color={theme.colors['Error']}
                disabled={isDeleting}
                icon={'EvilIcons/trash'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      setIsDeleting(false);
                      (
                        await xANODeleteQuoteDELETE.mutateAsync({
                          quote_id: (
                            props.quote ?? {
                              _quote: {
                                id: 1,
                                location: null,
                                created_at: 1707135308720,
                                creator_id: 10,
                                quote_date: 1707135311000,
                              },
                              _blocks: [
                                {
                                  id: 1,
                                  type: 'description',
                                  value:
                                    'Shirah sticks her finger in Cam’s ear',
                                  user_id: 0,
                                  quote_id: 1,
                                  created_at: 1707135580235,
                                },
                                {
                                  id: 2,
                                  type: 'dialogue',
                                  _user: {
                                    id: 9,
                                    name: 'Shirah Wagner',
                                    last_name: 'Wagner',
                                    created_at: 1707487717302,
                                    first_name: 'Shirah',
                                    profile_image: {
                                      url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                                      meta: { width: 147, height: 147 },
                                      mime: 'image/png',
                                      name: 'Screenshot 2023-12-17 at 5.44 1.png',
                                      path: '/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                                      size: 42421,
                                      type: 'image',
                                      access: 'public',
                                    },
                                  },
                                  value:
                                    'That is the biggest damn ear hole I’ve ever felt',
                                  user_id: 9,
                                  quote_id: 1,
                                  created_at: 1707833619958,
                                },
                                {
                                  id: 3,
                                  type: 'dialogue',
                                  _user: {
                                    id: 10,
                                    name: 'Cam Lindsay',
                                    last_name: 'Lindsay',
                                    created_at: 1707487875454,
                                    first_name: 'Cam',
                                    profile_image: {
                                      url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/kEfuEiBu9TLotrvcMMiK5pTx47w/AFAAFg../Screenshot+2023-12-17+at+5.44+1.png',
                                      meta: { width: 147, height: 147 },
                                      mime: 'image/png',
                                      name: 'Screenshot 2023-12-17 at 5.44 1.png',
                                      path: '/vault/eh5MAgN4/kEfuEiBu9TLotrvcMMiK5pTx47w/AFAAFg../Screenshot+2023-12-17+at+5.44+1.png',
                                      size: 33610,
                                      type: 'image',
                                      access: 'public',
                                    },
                                  },
                                  value: 'How many have you felt??',
                                  user_id: 10,
                                  quote_id: 1,
                                  created_at: 1707833891201,
                                },
                                {
                                  id: 4,
                                  type: 'dialogue',
                                  _user: {
                                    id: 9,
                                    name: 'Shirah Wagner',
                                    last_name: 'Wagner',
                                    created_at: 1707487717302,
                                    first_name: 'Shirah',
                                    profile_image: {
                                      url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                                      meta: { width: 147, height: 147 },
                                      mime: 'image/png',
                                      name: 'Screenshot 2023-12-17 at 5.44 1.png',
                                      path: '/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                                      size: 42421,
                                      type: 'image',
                                      access: 'public',
                                    },
                                  },
                                  value: 'A bunch! I will not be slut shamed!!',
                                  user_id: 9,
                                  quote_id: 1,
                                  created_at: 1707833926794,
                                },
                              ],
                              quote_id: 1,
                            }
                          )?.quote_id,
                        })
                      )?.json;
                      setIsDeleting(true);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                size={32}
              />
            )}
          </>
        </View>
      </View>
      {/* Blocks */}
      <View>
        <FlatList
          data={
            (
              props.quote ?? {
                _quote: {
                  id: 1,
                  location: null,
                  created_at: 1707135308720,
                  creator_id: 10,
                  quote_date: 1707135311000,
                },
                _blocks: [
                  {
                    id: 1,
                    type: 'description',
                    value: 'Shirah sticks her finger in Cam’s ear',
                    user_id: 0,
                    quote_id: 1,
                    created_at: 1707135580235,
                  },
                  {
                    id: 2,
                    type: 'dialogue',
                    _user: {
                      id: 9,
                      name: 'Shirah Wagner',
                      last_name: 'Wagner',
                      created_at: 1707487717302,
                      first_name: 'Shirah',
                      profile_image: {
                        url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                        meta: { width: 147, height: 147 },
                        mime: 'image/png',
                        name: 'Screenshot 2023-12-17 at 5.44 1.png',
                        path: '/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                        size: 42421,
                        type: 'image',
                        access: 'public',
                      },
                    },
                    value: 'That is the biggest damn ear hole I’ve ever felt',
                    user_id: 9,
                    quote_id: 1,
                    created_at: 1707833619958,
                  },
                  {
                    id: 3,
                    type: 'dialogue',
                    _user: {
                      id: 10,
                      name: 'Cam Lindsay',
                      last_name: 'Lindsay',
                      created_at: 1707487875454,
                      first_name: 'Cam',
                      profile_image: {
                        url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/kEfuEiBu9TLotrvcMMiK5pTx47w/AFAAFg../Screenshot+2023-12-17+at+5.44+1.png',
                        meta: { width: 147, height: 147 },
                        mime: 'image/png',
                        name: 'Screenshot 2023-12-17 at 5.44 1.png',
                        path: '/vault/eh5MAgN4/kEfuEiBu9TLotrvcMMiK5pTx47w/AFAAFg../Screenshot+2023-12-17+at+5.44+1.png',
                        size: 33610,
                        type: 'image',
                        access: 'public',
                      },
                    },
                    value: 'How many have you felt??',
                    user_id: 10,
                    quote_id: 1,
                    created_at: 1707833891201,
                  },
                  {
                    id: 4,
                    type: 'dialogue',
                    _user: {
                      id: 9,
                      name: 'Shirah Wagner',
                      last_name: 'Wagner',
                      created_at: 1707487717302,
                      first_name: 'Shirah',
                      profile_image: {
                        url: 'https://x8ki-letl-twmt.n7.xano.io/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                        meta: { width: 147, height: 147 },
                        mime: 'image/png',
                        name: 'Screenshot 2023-12-17 at 5.44 1.png',
                        path: '/vault/eh5MAgN4/cHECKMb1-3ic5UVfF8FczNGa-EY/NV6fCg../Screenshot+2023-12-17+at+5.44+1.png',
                        size: 42421,
                        type: 'image',
                        access: 'public',
                      },
                    },
                    value: 'A bunch! I will not be slut shamed!!',
                    user_id: 9,
                    quote_id: 1,
                    created_at: 1707833926794,
                  },
                ],
                quote_id: 1,
              }
            )?._blocks
          }
          keyExtractor={(listData, index) =>
            listData?.id ?? listData?.uuid ?? index.toString()
          }
          keyboardShouldPersistTaps={'never'}
          listKey={'VGvgJIab'}
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
                      editable={false}
                      searchTerm={props.searchTerm ?? 'felt'}
                      text={listData?.value}
                    />
                  )}
                </>
                <>
                  {!(listData?.type === 'dialogue') ? null : (
                    <ConversationViewBlock
                      contact={listData && listData['_user']}
                      searchTerm={props.searchTerm ?? 'felt'}
                      text={listData?.value}
                    />
                  )}
                </>
              </View>
            );
          }}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </Surface>
  );
};

export default withTheme(QuoteCardBlock);
