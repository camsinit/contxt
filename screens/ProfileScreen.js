import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import QuoteCardBlock from '../components/QuoteCardBlock';
import QuoteFormBlock from '../components/QuoteFormBlock';
import QuoteFormOLDBlock from '../components/QuoteFormOLDBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as ScreenComponents from '../custom-files/ScreenComponents';
import cleanNumber from '../global-functions/cleanNumber';
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
  SimpleStyleFlatList,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
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
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [currentContact, setCurrentContact] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);
  const [isAddingToFavorites, setIsAddingToFavorites] = React.useState(false);
  const [isUpdatingDob, setIsUpdatingDob] = React.useState(false);
  const [isUpdatingName, setIsUpdatingName] = React.useState(false);
  const [isUpdatingPhoneNumber, setIsUpdatingPhoneNumber] =
    React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [newNameValue, setNewNameValue] = React.useState('');
  const [refreshCall, setRefreshCall] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedDobValue, setSelectedDobValue] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [selectedPhoneNumber, setSelectedPhoneNumber] = React.useState('');
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

  const onDeleteFunction = () => {
    console.log('no problem until here ');

    setRefreshCall(Math.floor(Math.random() * 900000) + 100000);
  };
  const xANOUpdateProfileImagePATCH = XANOApi.useUpdateProfileImagePATCH();
  const xANOUpdateProfileNamePATCH = XANOApi.useUpdateProfileNamePATCH();
  const xANOUpdateProfilePhoneNumberPATCH =
    XANOApi.useUpdateProfilePhoneNumberPATCH();
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
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      <XANOApi.FetchGetProfilePOST
        handlers={{
          on4xx: fetchData => {
            try {
              /* hidden 'Log to Console' action */
            } catch (err) {
              console.error(err);
            }
          },
          onData: fetchData => {
            try {
              setCurrentContact(fetchData);
              setSelectedImage(fetchData?.profile_image?.url);
              setNewNameValue(fetchData?.name);
              if (fetchData?.dob) {
                setSelectedDobValue(new Date(fetchData?.dob));
              }
              setSelectedPhoneNumber(fetchData?.phone_numbers?.[0]);
              if (Constants['CX_USER']?.id === fetchData?.id) {
                setGlobalVariableValue({
                  key: 'CX_USER',
                  value: fetchData,
                });
              } else {
              }

              setIsAddingToFavorites(false);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        id={props.route?.params?.id ?? 1}
        refresh={1}
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
                    height: 40,
                    justifyContent: 'space-between',
                    padding: 16,
                    paddingTop: 0,
                  },
                  dimensions.width
                )}
              >
                {/* EmptyView */}
                <>
                  {!(
                    (props.route?.params?.id ?? 1) !==
                      Constants['CX_USER']?.id || !editMode
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { height: 30, width: 30 },
                        dimensions.width
                      )}
                    />
                  )}
                </>
                {/* PressableGoBack */}
                <>
                  {!(
                    (props.route?.params?.id ?? 1) ===
                      Constants['CX_USER']?.id &&
                    (props.route?.params?.type ?? 'user') === 'user' &&
                    editMode
                  ) ? null : (
                    <Pressable
                      onPress={() => {
                        try {
                          navigation.navigate('SettingsScreen');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <Icon
                        color={theme.colors['DarkGray']}
                        name={'EvilIcons/gear'}
                        size={36}
                      />
                    </Pressable>
                  )}
                </>
                <>
                  {!(
                    Constants['CX_USER']?.id ===
                      (props.route?.params?.id ?? 1) ||
                    fetchData?.profile_type === 'contact' ||
                    (fetchData?.profile_type === 'user' &&
                      !fetchData?.completed_onboarding)
                  ) ? null : (
                    <View>
                      {/* EditLinkButton */}
                      <>
                        {editMode ? null : (
                          <Link
                            accessible={true}
                            onPress={() => {
                              try {
                                setEditMode(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            {...GlobalStyles.LinkStyles(theme)['Link'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.LinkStyles(theme)['Link'].style,
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
                            {...GlobalStyles.LinkStyles(theme)['Link'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.LinkStyles(theme)['Link'].style,
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
                              {...GlobalStyles.ImageStyles(theme)['Image']
                                .props}
                              source={{
                                uri: `${fetchData?.profile_image?.url}`,
                              }}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ImageStyles(theme)['Image']
                                    .style,
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
                          onPress={() => {
                            const handler = async () => {
                              try {
                                const imageResult = await openImagePickerUtil({
                                  mediaTypes: 'Images',
                                  allowsEditing: true,
                                  quality: 0.2,
                                  allowsMultipleSelection: false,
                                  permissionErrorMessage:
                                    'Sorry, we need media library permissions to make this work.',
                                  showAlertOnPermissionError: true,
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
                          disabled={isUploading}
                        >
                          <ImageBackground
                            resizeMode={'cover'}
                            {...GlobalStyles.ImageBackgroundStyles(theme)[
                              'Image Background'
                            ].props}
                            source={{ uri: `${selectedImage}` }}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageBackgroundStyles(theme)[
                                  'Image Background'
                                ].style,
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
                                    {...GlobalStyles.TextStyles(theme)['Text']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
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
                                    {...GlobalStyles.ActivityIndicatorStyles(
                                      theme
                                    )['Activity Indicator'].props}
                                    size={'large'}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.ActivityIndicatorStyles(
                                          theme
                                        )['Activity Indicator'].style,
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
                  {/* NameText */}
                  <>
                    {editMode ? null : (
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            { fontFamily: 'Poppins_700Bold', fontSize: 22 }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.name}
                      </Text>
                    )}
                  </>
                  {/* EditNameText */}
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
                          autoCapitalize={'none'}
                          autoCorrect={true}
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
                          webShowOutline={true}
                          {...GlobalStyles.TextInputStyles(theme)['Text Input']
                            .props}
                          placeholder={'Enter name'}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextInputStyles(theme)['Text Input']
                                .style,
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
                                hidesWhenStopped={true}
                                size={'small'}
                                {...GlobalStyles.ActivityIndicatorStyles(theme)[
                                  'Activity Indicator'
                                ].props}
                                color={theme.colors['Background']}
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.ActivityIndicatorStyles(theme)[
                                    'Activity Indicator'
                                  ].style,
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
                        paddingTop: 8,
                      },
                      dimensions.width
                    )}
                  >
                    <>
                      {!(
                        fetchData?.profile_type === 'user' || !editMode
                      ) ? null : (
                        <View>
                          <>
                            {!(
                              fetchData?.id !== Constants['CX_USER']?.id
                            ) ? null : (
                              <Icon size={24} name={'Entypo/phone'} />
                            )}
                          </>
                          {/* PhoneNumberText */}
                          <>
                            {!(
                              fetchData?.id === Constants['CX_USER']?.id
                            ) ? null : (
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      fontFamily: 'Poppins_600SemiBold',
                                      fontSize: 13,
                                      marginLeft: 16,
                                      marginRight: 16,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {formatPhoneNumbers(
                                  fetchData?.phone_numbers?.[0]
                                )}
                              </Text>
                            )}
                          </>
                        </View>
                      )}
                    </>
                    {/* EditPhoneNumberView */}
                    <>
                      {!(
                        editMode && fetchData?.profile_type !== 'user'
                      ) ? null : (
                        <View>
                          <TextInput
                            autoCapitalize={'none'}
                            autoCorrect={true}
                            changeTextDelay={500}
                            onChangeText={newTextInputValue => {
                              try {
                                setSelectedPhoneNumber(newTextInputValue);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            onChangeTextDelayed={newTextInputValue => {
                              const handler = async () => {
                                try {
                                  setIsUpdatingPhoneNumber(true);
                                  (
                                    await xANOUpdateProfilePhoneNumberPATCH.mutateAsync(
                                      {
                                        id: currentContact?.id,
                                        phone_number:
                                          cleanNumber(newTextInputValue),
                                        type: fetchData?.profile_type,
                                      }
                                    )
                                  )?.json;
                                  setIsUpdatingPhoneNumber(false);
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            webShowOutline={true}
                            {...GlobalStyles.TextInputStyles(theme)[
                              'Text Input'
                            ].props}
                            editable={!isUpdatingPhoneNumber}
                            placeholder={'Enter a valid phone number'}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextInputStyles(theme)[
                                  'Text Input'
                                ].style,
                                {
                                  color: theme.colors['Strong'],
                                  fontFamily: 'Poppins_600SemiBold',
                                  paddingBottom: 0,
                                  paddingLeft: 0,
                                  paddingRight: 0,
                                  paddingTop: 0,
                                }
                              ),
                              dimensions.width
                            )}
                            value={selectedPhoneNumber}
                          />
                        </View>
                      )}
                    </>
                    <>
                      {!isUpdatingPhoneNumber ? null : (
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
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          <ActivityIndicator
                            animating={true}
                            hidesWhenStopped={true}
                            size={'small'}
                            {...GlobalStyles.ActivityIndicatorStyles(theme)[
                              'Activity Indicator'
                            ].props}
                            color={theme.colors['Background']}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.ActivityIndicatorStyles(theme)[
                                'Activity Indicator'
                              ].style,
                              dimensions.width
                            )}
                          />
                        </View>
                      )}
                    </>
                  </View>
                  {/* DOB Field */}
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
                      {!(!editMode && selectedDobValue) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center', flexDirection: 'row' },
                            dimensions.width
                          )}
                        >
                          <Icon
                            name={'FontAwesome/birthday-cake'}
                            size={16}
                            style={StyleSheet.applyWidth(
                              { marginRight: 5 },
                              dimensions.width
                            )}
                          />
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  fontFamily: 'Poppins_600SemiBold',
                                  fontSize: 13,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {formatDate(
                              fetchData?.dob,
                              fetchData?.id === Constants['CX_USER']?.id
                            )}
                          </Text>
                        </View>
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
                            disabled={false}
                            hideLabel={false}
                            label={'Date'}
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
                            borderColorActive={'rgba(0, 0, 0, 0)'}
                            date={selectedDobValue}
                            format={'mmm d, yyyy'}
                            labelColor={'rgba(0, 0, 0, 0)'}
                            maximumDate={new Date()}
                            rightIconName={'Ionicons/md-chevron-down'}
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: 'rgba(0, 0, 0, 0)',
                                color: theme.colors['Primary'],
                                fontFamily: 'Poppins_600SemiBold',
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
                                  hidesWhenStopped={true}
                                  size={'small'}
                                  {...GlobalStyles.ActivityIndicatorStyles(
                                    theme
                                  )['Activity Indicator'].props}
                                  color={theme.colors['Background']}
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.ActivityIndicatorStyles(theme)[
                                      'Activity Indicator'
                                    ].style,
                                    dimensions.width
                                  )}
                                />
                              </View>
                            )}
                          </>
                        </View>
                      )}
                    </>
                    <>
                      {!(!fetchData?.dob && !editMode) ? null : (
                        <Pressable
                          onPress={() => {
                            try {
                              setEditMode(true);
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
                                gap: 4,
                              },
                              dimensions.width
                            )}
                          >
                            <Icon name={'MaterialIcons/add'} size={18} />
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['Text'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text'].style,
                                  {
                                    fontFamily: 'Poppins_600SemiBold',
                                    fontSize: 13,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Birthday'}
                            </Text>
                          </View>
                        </Pressable>
                      )}
                    </>
                  </View>
                  {/* FavoriteView */}
                  <>
                    {!(fetchData?.id !== Constants['CX_USER']?.id) ? null : (
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
                        <Pressable
                          onPress={() => {
                            const handler = async () => {
                              try {
                                setIsAddingToFavorites(true);
                                (
                                  await XANOApi.toggleFavoritePOST(Constants, {
                                    connect_id: fetchData?.id,
                                    type: fetchData?.profile_type,
                                  })
                                )?.json;
                                await refetchGetProfile();
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                        >
                          <>
                            {isAddingToFavorites ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 4,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Favorited Icon */}
                                <>
                                  {!fetchData?._is_favorite ? null : (
                                    <Icon
                                      color={theme.colors['Error']}
                                      name={'AntDesign/heart'}
                                      size={18}
                                    />
                                  )}
                                </>
                                {/* Not_Favorited Icon */}
                                <>
                                  {fetchData?._is_favorite ? null : (
                                    <Icon name={'AntDesign/heart'} size={18} />
                                  )}
                                </>
                              </View>
                            )}
                          </>
                          <>
                            {!isAddingToFavorites ? null : (
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
                            )}
                          </>
                        </Pressable>
                      </View>
                    )}
                  </>
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
                      size={24}
                      color={theme.colors['DarkGray']}
                      name={'Ionicons/search'}
                    />
                    <TextInput
                      autoCapitalize={'none'}
                      autoCorrect={true}
                      changeTextDelay={500}
                      onChangeText={newTextInputValue => {
                        try {
                          setSearchValue(newTextInputValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      webShowOutline={true}
                      {...GlobalStyles.TextInputStyles(theme)['Text Input']
                        .props}
                      clearButtonMode={'always'}
                      placeholder={'Search'}
                      placeholderTextColor={theme.colors['DarkGray']}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextInputStyles(theme)['Text Input']
                            .style,
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
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={Images.Add}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { height: 25, marginLeft: 16, width: 30 }
                        ),
                        dimensions.width
                      )}
                    />
                  </Pressable>
                </View>
              </View>
            </>
          );
        }}
      </XANOApi.FetchGetProfilePOST>
      {/* Fetch 2 */}
      <XANOApi.FetchGetProfilePOST
        handlers={{
          on4xx: fetch2Data => {
            try {
              /* hidden 'Log to Console' action */
            } catch (err) {
              console.error(err);
            }
          },
          onData: fetch2Data => {
            try {
              setCurrentContact(fetch2Data);
              setSelectedImage(fetch2Data?.profile_image?.url);
              setNewNameValue(fetch2Data?.name);
              if (fetch2Data?.dob) {
                setSelectedDobValue(new Date(fetch2Data?.dob));
              }
              if (Constants['CX_USER']?.id === fetch2Data?.id) {
                setGlobalVariableValue({
                  key: 'CX_USER',
                  value: fetch2Data,
                });
              } else {
              }
            } catch (err) {
              console.error(err);
            }
          },
        }}
        id={props.route?.params?.id ?? 1}
        refresh={(() => {
          const e = refreshCall;
          console.log(e);
          return e;
        })()}
        type={props.route?.params?.type ?? 'user'}
      >
        {({ loading, error, data, refetchGetProfile }) => {
          const fetch2Data = data?.json;
          if (loading) {
            return (
              <View>
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
              </View>
            );
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              {/* Body */}
              <View
                style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              >
                <View
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                >
                  <SimpleStyleFlatList
                    data={filterQuotes(
                      fetch2Data?._quotes_of_user,
                      searchValue
                    )}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(listData, index) =>
                      listData?.id ?? listData?.uuid ?? index.toString()
                    }
                    keyboardShouldPersistTaps={'never'}
                    listKey={'8xhxiYzO'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              marginBottom: 12,
                              marginLeft: 20,
                              marginRight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          <Pressable>
                            <QuoteCardBlock
                              editable={
                                listData?._quote?.creator_id ===
                                  Constants['CX_USER']?.id && editMode
                              }
                              onDelete={() => onDeleteFunction()}
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
    </ScreenContainer>
  );
};

export default withTheme(ProfileScreen);
