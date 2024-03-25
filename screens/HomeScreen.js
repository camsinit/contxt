import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthApiApi from '../apis/AuthApiApi.js';
import * as XANOApi from '../apis/XANOApi.js';
import ContactsViewBlock from '../components/ContactsViewBlock';
import HeaderBlock from '../components/HeaderBlock';
import QuoteFormBlock from '../components/QuoteFormBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as ScreenComponents from '../custom-files/ScreenComponents';
import getContacts from '../global-functions/getContacts';
import randomNumber from '../global-functions/randomNumber';
import requestContactsPermissions from '../global-functions/requestContactsPermissions';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  KeyboardAvoidingView,
  Pressable,
  ScreenContainer,
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
  const [list, setList] = React.useState([]);
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
          console.log(authMeResult);
          if (authMeResult?.message) {
            navigation.navigate('OnboardingScreen');
          } else {
            const contactsPermissionsResult =
              await requestContactsPermissions();
            if (contactsPermissionsResult === 'granted') {
              const contactsResult = (
                await XANOApi.getMyContactsGET(Constants, {
                  random_seed: 123,
                  search_term: '',
                })
              )?.json;
              if (contactsResult?.contacts?.length === 0) {
                setShowImportModal(true);
                setIsImporting(true);
                const getContactsData = await getContacts();
                (
                  await XANOApi.importContactsPOST(Constants, {
                    contacts: getContactsData,
                  })
                )?.json;
                setIsImporting(false);
                setShowImportModal(false);
                setRefechContacts(randomNumber());
              } else {
              }
            } else {
              setShowDenidedModal(true);
            }
          }
        } else {
          navigation.navigate('OnboardingScreen');
        }
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={true}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Background'] },
        dimensions.width
      )}
    >
      <HeaderBlock />
      {/* SearchBox */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: theme.colors['Secondary'],
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
          color={theme.colors['DarkGray']}
          name={'Ionicons/search'}
          size={24}
        />
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <TextInput
            allowFontScaling={false}
            autoCapitalize={'none'}
            autoFocus={false}
            changeTextDelay={500}
            clearButtonMode={'always'}
            keyboardType={'default'}
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
            placeholder={'Search'}
            placeholderTextColor={theme.colors['DarkGray']}
            spellcheck={true}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextInputStyles(theme)['Text Input'],
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
        {/* Label */}
        <Text
          accessible={true}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              color: theme.colors['Light'],
              fontFamily: 'Poppins_500Medium',
            }),
            dimensions.width
          )}
        >
          {'You'}
        </Text>

        <Pressable
          onPress={() => {
            try {
              navigation.navigate('ProfileScreen', {
                id: Constants['CX_USER']?.id,
                type: 'user',
                initialSearchTerm: searchTermValue,
              });
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <ContactsViewBlock contact={Constants['CX_USER']} />
        </Pressable>

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
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        {
                          color: theme.colors['Light'],
                          fontFamily: 'Poppins_500Medium',
                          marginTop: 12,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Your Contacts'}
                  </Text>
                  <FlatList
                    data={fetchData?.contacts}
                    keyExtractor={(listData, index) =>
                      listData?.id ?? listData?.uuid ?? index.toString()
                    }
                    keyboardShouldPersistTaps={'always'}
                    listKey={'8Op3xGHw'}
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
                                if (listData?.connected_user_id > 0) {
                                  navigation.navigate('ProfileScreen', {
                                    id: listData?.connected_user_id,
                                    type: 'user',
                                  });
                                } else {
                                  navigation.navigate('ProfileScreen', {
                                    id: listData?.id,
                                    type: 'contact',
                                  });
                                }
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
                  />
                </View>
                {/* BlocksView */}
                <>
                  {!(fetchData?.blocks?.length > 0) ? null : (
                    <View>
                      {/* Label */}
                      <Text
                        accessible={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            {
                              color: theme.colors['Light'],
                              fontFamily: 'Poppins_500Medium',
                              marginTop: 12,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Quotes'}
                      </Text>
                      <FlatList
                        data={fetchData?.blocks}
                        keyExtractor={(listData, index) =>
                          listData?.id ?? listData?.uuid ?? index.toString()
                        }
                        keyboardShouldPersistTaps={'always'}
                        listKey={'FYJHWqUc'}
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
                                      id: listData?.user_id,
                                      type: 'user',
                                      initialSearchTerm: searchTermValue,
                                    });
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <ContactsViewBlock
                                  contact={listData && listData['_user']}
                                  quoteText={listData?.value}
                                  searchTerm={searchTermValue}
                                />
                              </Pressable>
                            </View>
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                      />
                    </View>
                  )}
                </>
              </>
            );
          }}
        </XANOApi.FetchGetMyContactsGET>
        {/* FloatingButton */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'center',
              alignSelf: 'center',
              bottom: 20,
              position: 'absolute',
              zIndex: 99,
            },
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              try {
                setShowNewQuoteModal(true);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Image
              resizeMode={'cover'}
              source={Images.NewQuoteButton}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                  height: 140,
                  width: 140,
                }),
                dimensions.width
              )}
            />
          </Pressable>
        </View>
      </View>
      <>
        {Platform.OS === 'web' ? null : (
          <Modal
            animationType={'slide'}
            transparent={true}
            visible={showDenidedModal}
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
                <Icon name={'FontAwesome/hand-stop-o'} size={64} />
                <H2
                  style={StyleSheet.applyWidth(
                    GlobalStyles.H2Styles(theme)['H2'],
                    dimensions.width
                  )}
                >
                  {'Access Denied'}
                </H2>

                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      textAlign: 'center',
                    }),
                    dimensions.width
                  )}
                >
                  {
                    'You must enable Contacts permissions to continue using Contxt app. \n\nYou can enable it from  Settings > App Permissions > Contxt app screen'
                  }
                </Text>
                {/* Close Button */}
                <Button
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
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['OutlineButton'],
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
        animationType={'slide'}
        transparent={true}
        visible={showImportModal}
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
              StyleSheet.compose(GlobalStyles.SurfaceStyles(theme)['Surface'], {
                alignItems: 'center',
                backgroundColor: theme.colors['Light Inverse'],
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
            <Icon name={'MaterialCommunityIcons/database-import'} size={64} />
            <H2
              style={StyleSheet.applyWidth(
                GlobalStyles.H2Styles(theme)['H2'],
                dimensions.width
              )}
            >
              {'Importing contacts'}
            </H2>

            <Text
              accessible={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  textAlign: 'center',
                }),
                dimensions.width
              )}
            >
              {'Please wait while we are importing your contacts '}
            </Text>
            {/* Close Button */}
            <Button
              disabled={isImporting}
              loading={isImporting}
              onPress={() => {
                try {
                  setShowImportModal(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['OutlineButton'],
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
              {/* NewQuoteForm */}
              <QuoteFormBlock onClose={hideNewQuoteModal()} />
            </View>
          </KeyboardAvoidingView>
        </ScreenComponents.ModalView>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
