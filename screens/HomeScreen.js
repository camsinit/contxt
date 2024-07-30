import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthApiApi from '../apis/AuthApiApi.js';
import * as XANOApi from '../apis/XANOApi.js';
import ContactsViewBlock from '../components/ContactsViewBlock';
import HeaderBlock from '../components/HeaderBlock';
import QuoteCardBlock from '../components/QuoteCardBlock';
import QuoteFormBlock from '../components/QuoteFormBlock';
import QuoteFormOLDBlock from '../components/QuoteFormOLDBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as ScreenComponents from '../custom-files/ScreenComponents';
import requestContactsPermissions from '../global-functions/requestContactsPermissions';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Circle,
  Icon,
  KeyboardAvoidingView,
  Pressable,
  ScreenContainer,
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
  Image,
  Modal,
  Platform,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const HomeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [isImporting, setIsImporting] = React.useState(false);
  const [isShuffling, setIsShuffling] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState(null);
  const [recentsCount, setRecentsCount] = React.useState(-1);
  const [refechContacts, setRefechContacts] = React.useState(0);
  const [searchTermDisplayValue, setSearchTermDisplayValue] =
    React.useState('');
  const [searchTermValue, setSearchTermValue] = React.useState('');
  const [showDenidedModal, setShowDenidedModal] = React.useState(false);
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [showNewQuoteModal, setShowNewQuoteModal] = React.useState(false);
  const hideNewQuoteModal = () => {
    return () => setShowNewQuoteModal(false);
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 900000) + 100000;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        if (Constants['CX_AUTH_TOKEN']) {
          const authMeResult = (await AuthApiApi.authMeGET(Constants))?.json;
          if (authMeResult?.message) {
            navigation.navigate('Onboarding1WelcomeScreen');
          } else {
            const contactsPermissionsResult =
              await requestContactsPermissions();
            if (contactsPermissionsResult === 'granted') {
              const randomQuoteResult = (
                await XANOApi.getRandomQuoteGET(Constants)
              )?.json;
              console.log(randomQuoteResult);
              setRandomQuote(randomQuoteResult);
            } else {
              setShowDenidedModal(true);
            }
          }
        } else {
          navigation.navigate('Onboarding1WelcomeScreen');
        }
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);
  const textInputT7ND9LrzRef = React.useRef();

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors.background.brand },
        dimensions.width
      )}
    >
      <HeaderBlock />
      {/* SearchBox */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: theme.colors.branding.secondary,
            borderRadius: 10,
            flexDirection: 'row',
            marginBottom: 12,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 8,
            paddingLeft: 14,
            paddingRight: 14,
          },
          dimensions.width
        )}
      >
        {/* SearchIcon */}
        <Icon
          size={24}
          color={palettes.App.DarkGray}
          name={'Ionicons/search'}
        />
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newTextInputValue => {
              try {
                setSearchTermDisplayValue(newTextInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            onChangeTextDelayed={newTextInputValue => {
              try {
                setSearchTermValue(newTextInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
            allowFontScaling={false}
            autoFocus={false}
            clearButtonMode={'always'}
            keyboardType={'default'}
            placeholder={'Search'}
            placeholderTextColor={palettes.App.DarkGray}
            ref={textInputT7ND9LrzRef}
            spellcheck={true}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextInputStyles(theme)['Text Input'].style,
              dimensions.width
            )}
            value={searchTermDisplayValue}
          />
        </View>
      </View>
      {/* SearchResults */}
      <View
        style={StyleSheet.applyWidth(
          {
            flex: 1,
            overflow: 'hidden',
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
          },
          dimensions.width
        )}
      >
        {/* NoSearchView */}
        <>
          {searchTermValue ? null : (
            <View>
              {/* RandomView */}
              <>
                {!randomQuote ? null : (
                  <View>
                    {/* RandomSectionLabel */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 12,
                          marginTop: 24,
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row' },
                          dimensions.width
                        )}
                      >
                        <Icon
                          name={'Entypo/shuffle'}
                          size={20}
                          style={StyleSheet.applyWidth(
                            { marginRight: 8 },
                            dimensions.width
                          )}
                        />
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
                          {'Random'}
                        </Text>
                      </View>
                      {/* ShuffleButton */}
                      <Button
                        iconPosition={'left'}
                        onPress={() => {
                          const handler = async () => {
                            try {
                              setIsShuffling(true);
                              const randomQuoteResult = (
                                await XANOApi.getRandomQuoteGET(Constants)
                              )?.json;
                              setIsShuffling(false);
                              setRandomQuote(randomQuoteResult);
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['OutlineButton']
                          .props}
                        disabled={isShuffling}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['OutlineButton']
                              .style,
                            {
                              borderRadius: 16,
                              fontFamily: 'Poppins_400Regular',
                              fontSize: 12,
                              minHeight: 15,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'Shuffle'}
                      />
                    </View>
                    {/* RandomQuoteView */}
                    <View
                      style={StyleSheet.applyWidth(
                        { minHeight: 115 },
                        dimensions.width
                      )}
                    >
                      <Pressable
                        onPress={() => {
                          try {
                            navigation.navigate('ProfileScreen', {
                              initialSearchTerm: (
                                randomQuote?._blocks &&
                                (randomQuote?._blocks)[0]
                              )?.value,
                              id: randomQuote?._quote?.creator_id,
                              type: 'user',
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <>
                          {!randomQuote ? null : (
                            <QuoteCardBlock
                              editable={false}
                              quote={randomQuote}
                            />
                          )}
                        </>
                      </Pressable>
                    </View>
                  </View>
                )}
              </>
              {/* FavoritesSectionHeader */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 12,
                    marginTop: 24,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  name={'Feather/star'}
                  size={20}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                />
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
                  {'Favorites'}
                </Text>
              </View>
              {/* FavoritesView */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.branding.secondary,
                    borderRadius: 30,
                    height: 115,
                    justifyContent: 'center',
                    padding: 16,
                  },
                  dimensions.width
                )}
              >
                <XANOApi.FetchGetFavoritesGET>
                  {({ loading, error, data, refetchGetFavorites }) => {
                    const fetchData = data?.json;
                    if (loading) {
                      return <ActivityIndicator />;
                    }

                    if (error || data?.status < 200 || data?.status >= 300) {
                      return <ActivityIndicator />;
                    }

                    return (
                      <>
                        <>
                          {!(fetchData?.length > 0) ? null : (
                            <SimpleStyleFlatList
                              data={fetchData}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index.toString()
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={'CVOYaceX'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <Pressable
                                    onPress={() => {
                                      try {
                                        navigation.navigate('ProfileScreen', {
                                          initialSearchTerm: searchTermValue,
                                          id: listData?.id,
                                          type: listData?.profile_type,
                                        });
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          marginRight: 12,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <ContactsViewBlock
                                        avatarSize={65}
                                        contact={listData}
                                        imageOnly={true}
                                      />
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
                                            { fontSize: 11 }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.first_name}
                                      </Text>
                                    </View>
                                  </Pressable>
                                );
                              }}
                              showsVerticalScrollIndicator={true}
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}
                            />
                          )}
                        </>
                        {/* AddFavoriteButton */}
                        <>
                          {!(fetchData?.length === 0) ? null : (
                            <Pressable
                              onPress={() => {
                                try {
                                  textInputT7ND9LrzRef.current.focus();
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Circle
                                {...GlobalStyles.CircleStyles(theme)['Circle']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.CircleStyles(theme)['Circle']
                                      .style,
                                    {
                                      backgroundColor: palettes.Brand.Surface,
                                      height: 65,
                                      width: 65,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                <Icon size={24} name={'AntDesign/plus'} />
                              </Circle>
                            </Pressable>
                          )}
                        </>
                      </>
                    );
                  }}
                </XANOApi.FetchGetFavoritesGET>
              </View>
              {/* RecentsSectionLabel */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 12,
                    marginTop: 24,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  name={'AntDesign/clockcircleo'}
                  size={20}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                />
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
                  {'Recents'}
                </Text>
              </View>
              {/* RecentsView */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.branding.secondary,
                    borderRadius: 30,
                    height: 115,
                    justifyContent: 'center',
                    padding: 16,
                  },
                  dimensions.width
                )}
              >
                <XANOApi.FetchGetRecentsGET
                  handlers={{
                    onData: fetchData => {
                      try {
                        setRecentsCount(fetchData?.length);
                      } catch (err) {
                        console.error(err);
                      }
                    },
                  }}
                >
                  {({ loading, error, data, refetchGetRecents }) => {
                    const fetchData = data?.json;
                    if (loading) {
                      return <ActivityIndicator />;
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
                        keyboardShouldPersistTaps={'never'}
                        listKey={'Ebrc35n4'}
                        nestedScrollEnabled={false}
                        numColumns={1}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item, index }) => {
                          const listData = item;
                          return (
                            <Pressable
                              onPress={() => {
                                try {
                                  navigation.navigate('ProfileScreen', {
                                    initialSearchTerm: searchTermValue,
                                    id: listData?.id,
                                    type: listData?.profile_type,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { alignItems: 'center', marginRight: 12 },
                                  dimensions.width
                                )}
                              >
                                <ContactsViewBlock
                                  avatarSize={65}
                                  contact={listData}
                                  imageOnly={true}
                                />
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)['Text']
                                    .props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text']
                                        .style,
                                      { fontSize: 11 }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {listData?.first_name}
                                </Text>
                              </View>
                            </Pressable>
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        horizontal={true}
                      />
                    );
                  }}
                </XANOApi.FetchGetRecentsGET>
                <>
                  {!(recentsCount === 0) ? null : (
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        dimensions.width
                      )}
                    >
                      {'Recently quoted contacts will appear here'}
                    </Text>
                  )}
                </>
              </View>
            </View>
          )}
        </>
        <>
          {!searchTermValue ? null : (
            <XANOApi.FetchGetMyContactsGET
              random_seed={refechContacts}
              search_term={searchTermValue}
            >
              {({ loading, error, data, refetchGetMyContacts }) => {
                const fetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <>
                    {/* ContactsView */}
                    <View>
                      {/* Label */}
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            {
                              color: theme.colors.text.light,
                              fontFamily: 'Poppins_500Medium',
                              marginTop: 12,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Your Contacts'}
                      </Text>
                      <SimpleStyleFlatList
                        data={fetchData?.contacts}
                        horizontal={false}
                        inverted={false}
                        keyExtractor={(listData, index) =>
                          listData?.id ?? listData?.uuid ?? index.toString()
                        }
                        listKey={'8Op3xGHw'}
                        nestedScrollEnabled={false}
                        numColumns={1}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item, index }) => {
                          const listData = item;
                          return (
                            <View
                              style={StyleSheet.applyWidth(
                                { marginBottom: 8, marginTop: 8 },
                                dimensions.width
                              )}
                            >
                              <Pressable
                                onPress={() => {
                                  try {
                                    navigation.navigate('ProfileScreen', {
                                      id: listData?.id,
                                      type: listData?.profile_type,
                                    });
                                    /* hidden 'If/Else' action */
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <ContactsViewBlock
                                  contact={listData}
                                  searchTerm={searchTermValue}
                                />
                              </Pressable>
                            </View>
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        keyboardShouldPersistTaps={'always'}
                      />
                    </View>
                    {/* BlocksView */}
                    <>
                      {!(fetchData?.blocks?.length > 0) ? null : (
                        <View>
                          {/* Label */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: theme.colors.text.light,
                                  fontFamily: 'Poppins_500Medium',
                                  marginTop: 12,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Quotes'}
                          </Text>
                          <SimpleStyleFlatList
                            data={fetchData?.blocks}
                            horizontal={false}
                            inverted={false}
                            keyExtractor={(listData, index) =>
                              listData?.id ?? listData?.uuid ?? index.toString()
                            }
                            listKey={'FYJHWqUc'}
                            nestedScrollEnabled={false}
                            numColumns={1}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item, index }) => {
                              const listData = item;
                              return (
                                <View
                                  style={StyleSheet.applyWidth(
                                    { marginBottom: 8, marginTop: 8 },
                                    dimensions.width
                                  )}
                                >
                                  <Pressable
                                    onPress={() => {
                                      try {
                                        navigation.navigate('ProfileScreen', {
                                          initialSearchTerm: searchTermValue,
                                          id: listData?.user_id,
                                          type: 'user',
                                        });
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <ContactsViewBlock
                                      contact={listData?._user}
                                      quoteText={listData?.value}
                                      searchTerm={searchTermValue}
                                    />
                                  </Pressable>
                                </View>
                              );
                            }}
                            showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                            keyboardShouldPersistTaps={'always'}
                          />
                        </View>
                      )}
                    </>
                  </>
                );
              }}
            </XANOApi.FetchGetMyContactsGET>
          )}
        </>
        {/* FloatingButton */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: theme.colors.branding.primary,
              borderRadius: 100,
              bottom: 20,
              height: 60,
              justifyContent: 'center',
              position: 'absolute',
              width: 60,
              zIndex: 99,
            },
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              try {
                /* hidden 'API Request' action */
                setShowNewQuoteModal(true);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Icon
              color={theme.colors.background.brand}
              name={'Feather/plus'}
              size={50}
            />
          </Pressable>
        </View>
      </View>
      <>
        {Platform.OS === 'web' ? null : (
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType={'slide'}
            transparent={true}
            visible={showDenidedModal}
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
                <Icon name={'FontAwesome/hand-stop-o'} size={64} />
                <H2
                  selectable={false}
                  {...GlobalStyles.H2Styles(theme)['H2'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.H2Styles(theme)['H2'].style,
                    dimensions.width
                  )}
                >
                  {'Access Denied'}
                </H2>

                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      { textAlign: 'center' }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'You must enable Contacts permissions to continue using Contxt app. \n\nYou can enable it from  Settings > App Permissions > Contxt app screen'
                  }
                </Text>
                {/* Close Button */}
                <Button
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'CX_AUTH_TOKEN',
                        value: null,
                      });
                      setGlobalVariableValue({
                        key: 'CX_USER',
                        value: null,
                      });
                      setShowDenidedModal(false);
                      navigation.navigate('LoginScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.ButtonStyles(theme)['OutlineButton'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['OutlineButton'].style,
                      { marginTop: 20 }
                    ),
                    dimensions.width
                  )}
                  title={'Close'}
                />
              </Surface>
            </BlurView>
          </Modal>
        )}
      </>
      {/* ImportModal */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        transparent={true}
        visible={showImportModal}
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
            <Icon name={'MaterialCommunityIcons/database-import'} size={64} />
            <H2
              selectable={false}
              {...GlobalStyles.H2Styles(theme)['H2'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.H2Styles(theme)['H2'].style,
                dimensions.width
              )}
            >
              {'Importing contacts'}
            </H2>

            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { textAlign: 'center' }
                ),
                dimensions.width
              )}
            >
              {'Please wait while we are importing your contacts '}
            </Text>
            {/* Close Button */}
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  setShowImportModal(false);
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
                  { marginTop: 20 }
                ),
                dimensions.width
              )}
              title={'Close'}
            />
          </Surface>
        </BlurView>
      </Modal>
      <Utils.CustomCodeErrorBoundary>
        <ScreenComponents.ModalView
          theme={props.theme}
          show={showNewQuoteModal}
          hide={() => showNewQuoteModal(false)}
        >
          <KeyboardAvoidingView
            behavior={'padding'}
            enabled={true}
            keyboardVerticalOffset={0}
            iosBehavior={'height'}
            iosKeyboardVerticalOffset={50}
            style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
          >
            {/* Container */}
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, overflow: 'hidden', paddingTop: 20 },
                dimensions.width
              )}
            >
              <QuoteFormBlock onClose={hideNewQuoteModal()} />
            </View>
          </KeyboardAvoidingView>
        </ScreenComponents.ModalView>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
