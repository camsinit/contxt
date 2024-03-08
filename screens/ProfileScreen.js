import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import QuoteCardBlock from '../components/QuoteCardBlock';
import QuoteFormBlock from '../components/QuoteFormBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as ScreenComponents from '../custom-files/ScreenComponents';
import formatDate from '../global-functions/formatDate';
import formatPhoneNumbers from '../global-functions/formatPhoneNumbers';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openImagePickerUtil from '../utils/openImagePicker';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  DatePicker,
  Icon,
  KeyboardAvoidingView,
  Link,
  Pressable,
  ScreenContainer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const ProfileScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [currentContact, setCurrentContact] = React.useState({});
  const [editMode, setEditMode] = React.useState(true);
  const [isUpdatingDob, setIsUpdatingDob] = React.useState(false);
  const [isUpdatingName, setIsUpdatingName] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [newNameValue, setNewNameValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedDobValue, setSelectedDobValue] = React.useState(new Date());
  const [selectedImage, setSelectedImage] = React.useState('');
  const [showNewQuoteModal, setShowNewQuoteModal] = React.useState(false);
  const hideModal = () => {
    return () => setShowNewQuoteModal(false);
  };

  const filterQuotes = (arr, term) => {
    return (arr || []).filter(quote => {
      return quote._blocks.some(block =>
        block.value.toLowerCase().includes(term.toLowerCase())
      );
    });
  };

  const multiply = (val1, val2) => {
    return val1 * val2;
  };
  const xANOGetProfilePOST = XANOApi.useGetProfilePOST();
  const xANOUpdateProfileImagePATCH = XANOApi.useUpdateProfileImagePATCH();
  const xANOUpdateProfileNamePATCH = XANOApi.useUpdateProfileNamePATCH();
  const xANOUpdateProfileDOBPATCH = XANOApi.useUpdateProfileDOBPATCH();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (props.route?.params?.initialSearchTerm ?? '') {
        setSearchValue(props.route?.params?.initialSearchTerm ?? '');
      }
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      <XANOApi.FetchGetProfilePOST
        handlers={{
          onData: fetchData => {
            try {
              setCurrentContact(fetchData);
              setSelectedImage(fetchData?.profile_image?.url);
              setNewNameValue(fetchData?.name);
              setSelectedDobValue(new Date(fetchData?.dob));
            } catch (err) {
              console.error(err);
            }
          },
        }}
        id={props.route?.params?.id ?? 1}
        type={props.route?.params?.type ?? 'user'}
      >
        {({ loading, error, data, refetchGetProfile }) => {
          const fetchData = data?.json;
          if (loading) {
            return (
              <View>
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
              </View>
            );
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
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
                <>
                  {!(
                    Constants['CX_USER']?.id === (props.route?.params?.id ?? 1)
                  ) ? null : (
                    <View>
                      {/* EditLinkButton */}
                      <>
                        {editMode ? null : (
                          <Link
                            accessible={true}
                            allowFontScaling={true}
                            onPress={() => {
                              try {
                                setEditMode(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.LinkStyles(theme)['Link'],
                                { fontFamily: 'Poppins_300Light', fontSize: 18 }
                              ),
                              dimensions.width
                            )}
                            title={'Edit'}
                          />
                        )}
                      </>
                      {/* SaveLinkButton */}
                      <>
                        {!editMode ? null : (
                          <Link
                            accessible={true}
                            allowFontScaling={true}
                            onPress={() => {
                              const handler = async () => {
                                try {
                                  setEditMode(false);
                                  await refetchGetProfile();
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.LinkStyles(theme)['Link'],
                                { fontFamily: 'Poppins_300Light', fontSize: 18 }
                              ),
                              dimensions.width
                            )}
                            title={'Save'}
                          />
                        )}
                      </>
                    </View>
                  )}
                </>
              </View>
              {/* Body */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, paddingLeft: 20, paddingRight: 20 },
                  dimensions.width
                )}
              >
                {/* ProfileImageView */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center' },
                    dimensions.width
                  )}
                >
                  {/* ImageView */}
                  <>
                    {editMode ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: theme.colors['Light Gray'],
                            borderRadius: 150,
                            borderWidth: 1,
                            height: 150,
                            justifyContent: 'center',
                            marginBottom: 12,
                            overflow: 'hidden',
                            width: 150,
                          },
                          dimensions.width
                        )}
                      >
                        <>
                          {!fetchData?.profile_image?.url ? null : (
                            <Image
                              resizeMode={'cover'}
                              source={{
                                uri: `${fetchData?.profile_image?.url}`,
                              }}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ImageStyles(theme)['Image'],
                                  { height: 150, width: 150 }
                                ),
                                dimensions.width
                              )}
                            />
                          )}
                        </>
                        <>
                          {fetchData?.profile_image?.url ? null : (
                            <Icon
                              name={'FontAwesome/user-circle-o'}
                              size={64}
                            />
                          )}
                        </>
                      </View>
                    )}
                  </>
                  {/* EditImageView */}
                  <>
                    {!editMode ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: theme.colors['Light Gray'],
                            borderRadius: 150,
                            borderWidth: 1,
                            height: 150,
                            justifyContent: 'center',
                            marginBottom: 12,
                            overflow: 'hidden',
                            width: 150,
                          },
                          dimensions.width
                        )}
                      >
                        <Pressable
                          disabled={isUploading}
                          onPress={() => {
                            const handler = async () => {
                              try {
                                const imageResult = await openImagePickerUtil({
                                  mediaTypes: 'Images',
                                  allowsEditing: false,
                                  quality: 0.2,
                                });

                                setSelectedImage(imageResult);
                                if (imageResult) {
                                  setIsUploading(true);
                                  const updateResult = (
                                    await xANOUpdateProfileImagePATCH.mutateAsync(
                                      {
                                        id: currentContact?.id,
                                        profile_image: imageResult,
                                        type:
                                          props.route?.params?.type ?? 'user',
                                      }
                                    )
                                  )?.json;
                                  setIsUploading(false);
                                } else {
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                        >
                          <ImageBackground
                            resizeMode={'cover'}
                            source={{ uri: `${selectedImage}` }}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageBackgroundStyles(theme)[
                                  'Image Background'
                                ],
                                { height: 150, width: 150 }
                              ),
                              dimensions.width
                            )}
                          >
                            {/* Overlay */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor: theme.colors['Overlay'],
                                  flex: 1,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <>
                                {isUploading ? null : (
                                  <Text
                                    accessible={true}
                                    allowFontScaling={true}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text'],
                                        {
                                          color: theme.colors['Background'],
                                          fontSize: 20,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'Edit'}
                                  </Text>
                                )}
                              </>
                              <>
                                {!isUploading ? null : (
                                  <ActivityIndicator
                                    animating={true}
                                    hidesWhenStopped={true}
                                    size={'large'}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.ActivityIndicatorStyles(
                                          theme
                                        )['Activity Indicator'],
                                        {
                                          borderColor:
                                            theme.colors['Background'],
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  />
                                )}
                              </>
                            </View>
                          </ImageBackground>
                        </Pressable>
                      </View>
                    )}
                  </>
                  <>
                    {editMode ? null : (
                      <Text
                        accessible={true}
                        allowFontScaling={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            { fontFamily: 'Poppins_700Bold', fontSize: 22 }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.name}
                      </Text>
                    )}
                  </>
                  <>
                    {!editMode ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <TextInput
                          allowFontScaling={true}
                          autoCapitalize={'none'}
                          changeTextDelay={500}
                          onChangeText={newTextInputValue => {
                            try {
                              setNewNameValue(newTextInputValue);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          onChangeTextDelayed={newTextInputValue => {
                            const handler = async () => {
                              try {
                                if (newTextInputValue) {
                                  setIsUpdatingName(true);
                                  const userResult = (
                                    await xANOUpdateProfileNamePATCH.mutateAsync(
                                      {
                                        id: currentContact?.id,
                                        name: newTextInputValue,
                                        type:
                                          props.route?.params?.type ?? 'user',
                                      }
                                    )
                                  )?.json;
                                  setIsUpdatingName(false);
                                } else {
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          placeholder={'Enter name'}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextInputStyles(theme)['Text Input'],
                              {
                                fontFamily: 'Poppins_700Bold',
                                fontSize: 22,
                                paddingBottom: 0,
                                paddingTop: 0,
                                textAlign: 'center',
                                width: '100%',
                              }
                            ),
                            dimensions.width
                          )}
                          value={newNameValue}
                        />
                        <>
                          {!isUpdatingName ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor: theme.colors['Overlay'],
                                  borderRadius: 8,
                                  bottom: 0,
                                  flex: 1,
                                  justifyContent: 'center',
                                  left: 0,
                                  overflow: 'hidden',
                                  position: 'absolute',
                                  right: 0,
                                  top: 0,
                                },
                                dimensions.width
                              )}
                            >
                              <ActivityIndicator
                                animating={true}
                                color={theme.colors['Background']}
                                hidesWhenStopped={true}
                                size={'small'}
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.ActivityIndicatorStyles(theme)[
                                    'Activity Indicator'
                                  ],
                                  dimensions.width
                                )}
                              />
                            </View>
                          )}
                        </>
                      </View>
                    )}
                  </>
                </View>
                {/* infoViews */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', marginBottom: 20, marginTop: 20 },
                    dimensions.width
                  )}
                >
                  {/* PhoneNumberField */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: theme.colors['Light Gray'],
                        borderRadius: 8,
                        flex: 1,
                        height: 40,
                        justifyContent: 'center',
                        marginRight: 8,
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
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          { fontFamily: 'Poppins_600SemiBold', fontSize: 13 }
                        ),
                        dimensions.width
                      )}
                    >
                      {formatPhoneNumbers(
                        fetchData?.phone_numbers && fetchData?.phone_numbers[0]
                      )}
                    </Text>
                  </View>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: theme.colors['Light Gray'],
                        borderRadius: 8,
                        flex: 1,
                        height: 40,
                        justifyContent: 'center',
                        marginLeft: 8,
                      },
                      dimensions.width
                    )}
                  >
                    <>
                      {editMode ? null : (
                        <Text
                          accessible={true}
                          allowFontScaling={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                fontFamily: 'Poppins_600SemiBold',
                                fontSize: 13,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {formatDate(fetchData?.dob)}
                        </Text>
                      )}
                    </>
                    {/* EditMode */}
                    <>
                      {!editMode ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              height: '100%',
                              justifyContent: 'center',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          <DatePicker
                            autoDismissKeyboard={true}
                            borderColor={'rgba(0, 0, 0, 0)'}
                            borderColorActive={'rgba(0, 0, 0, 0)'}
                            date={selectedDobValue}
                            format={'mmm d, yyyy'}
                            label={'Date'}
                            labelColor={'rgba(0, 0, 0, 0)'}
                            leftIconMode={'inset'}
                            mode={'date'}
                            onDateChange={newDatePickerValue => {
                              const handler = async () => {
                                try {
                                  setSelectedDobValue(newDatePickerValue);
                                  setIsUpdatingDob(true);
                                  (
                                    await xANOUpdateProfileDOBPATCH.mutateAsync(
                                      {
                                        dob: newDatePickerValue,
                                        id: currentContact?.id,
                                        type:
                                          props.route?.params?.type ?? 'user',
                                      }
                                    )
                                  )?.json;
                                  setIsUpdatingDob(false);
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            rightIconName={'Ionicons/md-chevron-down'}
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Primary'],
                                fontFamily: 'Poppins_400Regular',
                                fontSize: 14,
                                marginBottom: 0,
                                marginTop: 0,
                              },
                              dimensions.width
                            )}
                            type={'underline'}
                          />
                          {/* LoadingView */}
                          <>
                            {!isUpdatingDob ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    backgroundColor: theme.colors['Overlay'],
                                    borderRadius: 8,
                                    bottom: 0,
                                    flex: 1,
                                    height: 40,
                                    justifyContent: 'center',
                                    left: 0,
                                    overflow: 'hidden',
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                <ActivityIndicator
                                  animating={true}
                                  color={theme.colors['Background']}
                                  hidesWhenStopped={true}
                                  size={'small'}
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.ActivityIndicatorStyles(theme)[
                                      'Activity Indicator'
                                    ],
                                    dimensions.width
                                  )}
                                />
                              </View>
                            )}
                          </>
                        </View>
                      )}
                    </>
                  </View>
                </View>
                {/* SearchField */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* SearchBox */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        borderColor: theme.colors['DarkGray'],
                        borderRadius: 50,
                        borderWidth: 1,
                        flex: 1,
                        flexDirection: 'row',
                        paddingLeft: 16,
                        paddingRight: 32,
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
                    <TextInput
                      allowFontScaling={true}
                      autoCapitalize={'none'}
                      changeTextDelay={500}
                      clearButtonMode={'always'}
                      onChangeText={newTextInputValue => {
                        try {
                          setSearchValue(newTextInputValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      placeholder={'Search'}
                      placeholderTextColor={theme.colors['DarkGray']}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextInputStyles(theme)['Text Input'],
                          {
                            borderBottomWidth: 0,
                            borderColor: null,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderTopWidth: 0,
                            paddingBottom: 8,
                            paddingTop: 8,
                            width: '100%',
                          }
                        ),
                        dimensions.width
                      )}
                      value={searchValue}
                    />
                  </View>

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
                      source={Images.Add}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'],
                          { height: 25, marginLeft: 16, width: 30 }
                        ),
                        dimensions.width
                      )}
                    />
                  </Pressable>
                </View>

                <View
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                >
                  <FlatList
                    data={filterQuotes(
                      fetchData && fetchData['_quotes_of_user'],
                      searchValue
                    )}
                    keyExtractor={(listData, index) =>
                      listData?.id ?? listData?.uuid ?? index.toString()
                    }
                    keyboardShouldPersistTaps={'never'}
                    listKey={'yNRuNPTI'}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return (
                        <View
                          style={StyleSheet.applyWidth(
                            { marginBottom: 12 },
                            dimensions.width
                          )}
                        >
                          <Pressable>
                            <QuoteCardBlock
                              editable={editMode}
                              quote={listData}
                              searchTerm={searchValue}
                            />
                          </Pressable>
                        </View>
                      );
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                  />
                </View>
              </View>
            </>
          );
        }}
      </XANOApi.FetchGetProfilePOST>
      <Utils.CustomCodeErrorBoundary>
        <ScreenComponents.ModalView
          theme={props.theme}
          show={showNewQuoteModal}
          hide={() => showNewQuoteModal(false)}
        >
          <KeyboardAvoidingView
            behavior={'padding'}
            enabled={true}
            iosBehavior={'padding'}
            iosKeyboardVerticalOffset={60}
            style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
          >
            {/* Container */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderColor: theme.colors['Secondary'],
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  flex: 1,
                  marginTop: 40,
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              {/* NewQuoteForm */}
              <QuoteFormBlock
                onClose={hideModal()}
                selected_contact={currentContact}
                selected_contact_type={props.route?.params?.type ?? 'user'}
              />
            </View>
          </KeyboardAvoidingView>
        </ScreenComponents.ModalView>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(ProfileScreen);
