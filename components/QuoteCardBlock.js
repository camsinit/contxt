import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XANOApi from '../apis/XANOApi.js';
import ContactsViewBlock from '../components/ContactsViewBlock';
import ConversationViewBlock from '../components/ConversationViewBlock';
import QuoteBlock from '../components/QuoteBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ScreenComponents from '../custom-files/ScreenComponents';
import extractUniqueContacts from '../global-functions/extractUniqueContacts';
import timeFromNow from '../global-functions/timeFromNow';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  IconButton,
  SimpleStyleFlatList,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { H2 } from '@expo/html-elements';
import { BlurView } from 'expo-blur';
import { Modal, Text, View } from 'react-native';

const QuoteCardBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [lastUpdatedQuoteLink, setLastUpdatedQuoteLink] = React.useState([]);
  const [refetchParam, setRefetchParam] = React.useState('');
  const [share, setShare] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const multiply = (val1, val2) => {
    return val1 * val2;
  };
  const xANODeleteQuoteDELETE = XANOApi.useDeleteQuoteDELETE();
  React.useEffect(() => {
    try {
      /* hidden 'Log to Console' action */
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Surface
      {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
      elevation={0}
      style={StyleSheet.applyWidth(
        GlobalStyles.SurfaceStyles(theme)['Surface'].style,
        dimensions.width
      )}
    >
      <Utils.CustomCodeErrorBoundary>
        <ScreenComponents.ViewShotView share={share} setShare={setShare}>
          <Surface
            {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
            elevation={1}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                {
                  borderColor: palettes.Brand['Light Inverse'],
                  borderRadius: 16,
                  borderWidth: 1,
                  marginLeft: 2,
                  marginRight: 2,
                  padding: 12,
                }
              ),
              dimensions.width
            )}
          >
            {/* Header */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', marginBottom: 12 },
                dimensions.width
              )}
            >
              {/* LeftView */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', flex: 1 },
                  dimensions.width
                )}
              >
                <SimpleStyleFlatList
                  data={extractUniqueContacts(
                    (
                      props.quote ?? {
                        _quote: {
                          id: 62,
                          location: null,
                          created_at: 1711908854982,
                          creator_id: 1,
                          quote_date: 1711908823000,
                        },
                        _blocks: [
                          {
                            id: 73,
                            type: 'dialogue',
                            _user: {
                              id: 1,
                              name: 'Cam Lindsay',
                              last_name: 'Lindsay',
                              created_at: 1710858691391,
                              first_name: 'Cam',
                              profile_image: {
                                url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                meta: { width: 762, height: 1143 },
                                mime: 'image/jpeg',
                                name: 'file-799c21.jpeg',
                                path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                size: 72133,
                                type: 'image',
                                access: 'public',
                              },
                            },
                            value: 'follow the fire',
                            user_id: 1,
                            quote_id: 62,
                            created_at: 1711908855044,
                          },
                        ],
                        quote_id: 62,
                        visibilty: 'public',
                      }
                    )?._blocks
                  )}
                  keyExtractor={(listData, index) =>
                    listData?.id ?? listData?.uuid ?? index.toString()
                  }
                  keyboardShouldPersistTaps={'never'}
                  listKey={'Il408aKn'}
                  nestedScrollEnabled={false}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            borderColor: theme.colors.background.brand,
                            borderRadius: 30,
                            borderWidth: 3,
                            marginRight: multiply(index, -10),
                            minHeight: 30,
                            minWidth: 30,
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
                  horizontal={true}
                  inverted={true}
                  style={StyleSheet.applyWidth(
                    { justifyContent: 'flex-end' },
                    dimensions.width
                  )}
                />
              </View>
              {/* RightView */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  },
                  dimensions.width
                )}
              >
                {/* View 2 */}
                <>
                  {!(!share && !(props.editable ?? false)) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          height: props.editable ?? false ? 32 : undefined,
                          justifyContent: 'center',
                          marginRight: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {/* PublicIcon */}
                      <>
                        {!(
                          (
                            props.quote ?? {
                              _quote: {
                                id: 62,
                                location: null,
                                created_at: 1711908854982,
                                creator_id: 1,
                                quote_date: 1711908823000,
                              },
                              _blocks: [
                                {
                                  id: 73,
                                  type: 'dialogue',
                                  _user: {
                                    id: 1,
                                    name: 'Cam Lindsay',
                                    last_name: 'Lindsay',
                                    created_at: 1710858691391,
                                    first_name: 'Cam',
                                    profile_image: {
                                      url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                      meta: { width: 762, height: 1143 },
                                      mime: 'image/jpeg',
                                      name: 'file-799c21.jpeg',
                                      path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                      size: 72133,
                                      type: 'image',
                                      access: 'public',
                                    },
                                  },
                                  value: 'follow the fire',
                                  user_id: 1,
                                  quote_id: 62,
                                  created_at: 1711908855044,
                                },
                              ],
                              quote_id: 62,
                              visibilty: 'public',
                            }
                          )?.visibilty === 'public'
                        ) ? null : (
                          <Icon
                            color={palettes.App.Green}
                            name={'MaterialIcons/public'}
                            size={17}
                          />
                        )}
                      </>
                      {/* DeniedIcon */}
                      <>
                        {!(
                          (
                            props.quote ?? {
                              _quote: {
                                id: 62,
                                location: null,
                                created_at: 1711908854982,
                                creator_id: 1,
                                quote_date: 1711908823000,
                              },
                              _blocks: [
                                {
                                  id: 73,
                                  type: 'dialogue',
                                  _user: {
                                    id: 1,
                                    name: 'Cam Lindsay',
                                    last_name: 'Lindsay',
                                    created_at: 1710858691391,
                                    first_name: 'Cam',
                                    profile_image: {
                                      url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                      meta: { width: 762, height: 1143 },
                                      mime: 'image/jpeg',
                                      name: 'file-799c21.jpeg',
                                      path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                      size: 72133,
                                      type: 'image',
                                      access: 'public',
                                    },
                                  },
                                  value: 'follow the fire',
                                  user_id: 1,
                                  quote_id: 62,
                                  created_at: 1711908855044,
                                },
                              ],
                              quote_id: 62,
                              visibilty: 'public',
                            }
                          )?.visibilty === 'denied'
                        ) ? null : (
                          <Icon
                            color={theme.colors.background.danger}
                            name={'MaterialIcons/block'}
                            size={17}
                          />
                        )}
                      </>
                      {/* PrivateIcon */}
                      <>
                        {!(
                          (
                            props.quote ?? {
                              _quote: {
                                id: 62,
                                location: null,
                                created_at: 1711908854982,
                                creator_id: 1,
                                quote_date: 1711908823000,
                              },
                              _blocks: [
                                {
                                  id: 73,
                                  type: 'dialogue',
                                  _user: {
                                    id: 1,
                                    name: 'Cam Lindsay',
                                    last_name: 'Lindsay',
                                    created_at: 1710858691391,
                                    first_name: 'Cam',
                                    profile_image: {
                                      url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                      meta: { width: 762, height: 1143 },
                                      mime: 'image/jpeg',
                                      name: 'file-799c21.jpeg',
                                      path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                      size: 72133,
                                      type: 'image',
                                      access: 'public',
                                    },
                                  },
                                  value: 'follow the fire',
                                  user_id: 1,
                                  quote_id: 62,
                                  created_at: 1711908855044,
                                },
                              ],
                              quote_id: 62,
                              visibilty: 'public',
                            }
                          )?.visibilty === 'private'
                        ) ? null : (
                          <Icon
                            color={palettes.App.Blue}
                            name={'MaterialCommunityIcons/shield-account'}
                            size={17}
                          />
                        )}
                      </>
                      {/* UnsetIcon */}
                      <>
                        {!(
                          (
                            props.quote ?? {
                              _quote: {
                                id: 62,
                                location: null,
                                created_at: 1711908854982,
                                creator_id: 1,
                                quote_date: 1711908823000,
                              },
                              _blocks: [
                                {
                                  id: 73,
                                  type: 'dialogue',
                                  _user: {
                                    id: 1,
                                    name: 'Cam Lindsay',
                                    last_name: 'Lindsay',
                                    created_at: 1710858691391,
                                    first_name: 'Cam',
                                    profile_image: {
                                      url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                      meta: { width: 762, height: 1143 },
                                      mime: 'image/jpeg',
                                      name: 'file-799c21.jpeg',
                                      path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                      size: 72133,
                                      type: 'image',
                                      access: 'public',
                                    },
                                  },
                                  value: 'follow the fire',
                                  user_id: 1,
                                  quote_id: 62,
                                  created_at: 1711908855044,
                                },
                              ],
                              quote_id: 62,
                              visibilty: 'public',
                            }
                          )?.visibilty === 'unset'
                        ) ? null : (
                          <Icon
                            color={theme.colors.text.medium}
                            name={'AntDesign/clockcircleo'}
                            size={17}
                          />
                        )}
                      </>
                    </View>
                  )}
                </>
                <>
                  {props.editable ?? false ? null : (
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            color: palettes.App.DarkGray,
                            fontFamily: 'Poppins_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {timeFromNow(
                        (
                          props.quote ?? {
                            _quote: {
                              id: 62,
                              location: null,
                              created_at: 1711908854982,
                              creator_id: 1,
                              quote_date: 1711908823000,
                            },
                            _blocks: [
                              {
                                id: 73,
                                type: 'dialogue',
                                _user: {
                                  id: 1,
                                  name: 'Cam Lindsay',
                                  last_name: 'Lindsay',
                                  created_at: 1710858691391,
                                  first_name: 'Cam',
                                  profile_image: {
                                    url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                    meta: { width: 762, height: 1143 },
                                    mime: 'image/jpeg',
                                    name: 'file-799c21.jpeg',
                                    path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                    size: 72133,
                                    type: 'image',
                                    access: 'public',
                                  },
                                },
                                value: 'follow the fire',
                                user_id: 1,
                                quote_id: 62,
                                created_at: 1711908855044,
                              },
                            ],
                            quote_id: 62,
                            visibilty: 'public',
                          }
                        )?._quote?.quote_date
                      )}
                    </Text>
                  )}
                </>
                <>
                  {share ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row' },
                        dimensions.width
                      )}
                    >
                      <>
                        {!((props.editable ?? false) && !isDeleting) ? null : (
                          <IconButton
                            onPress={() => {
                              try {
                                setShowDeleteModal(true);
                                /* hidden 'Set Variable' action */
                                /* hidden 'API Request' action */
                                /* hidden 'Set Variable' action */
                                /* hidden 'If/Else' action */
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            size={32}
                            color={theme.colors.background.danger}
                            disabled={isDeleting}
                            icon={'EvilIcons/trash'}
                          />
                        )}
                      </>
                      {/* ShareButton */}
                      <>
                        {props.editable ?? false ? null : (
                          <IconButton
                            onPress={() => {
                              try {
                                setShare(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            icon={'EvilIcons/share-apple'}
                            size={30}
                          />
                        )}
                      </>
                    </View>
                  )}
                </>
              </View>
            </View>
            {/* Blocks */}
            <View>
              <SimpleStyleFlatList
                data={
                  (
                    props.quote ?? {
                      _quote: {
                        id: 62,
                        location: null,
                        created_at: 1711908854982,
                        creator_id: 1,
                        quote_date: 1711908823000,
                      },
                      _blocks: [
                        {
                          id: 73,
                          type: 'dialogue',
                          _user: {
                            id: 1,
                            name: 'Cam Lindsay',
                            last_name: 'Lindsay',
                            created_at: 1710858691391,
                            first_name: 'Cam',
                            profile_image: {
                              url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                              meta: { width: 762, height: 1143 },
                              mime: 'image/jpeg',
                              name: 'file-799c21.jpeg',
                              path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                              size: 72133,
                              type: 'image',
                              access: 'public',
                            },
                          },
                          value: 'follow the fire',
                          user_id: 1,
                          quote_id: 62,
                          created_at: 1711908855044,
                        },
                      ],
                      quote_id: 62,
                      visibilty: 'public',
                    }
                  )?._blocks
                }
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ?? listData?.uuid ?? index.toString()
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'VGvgJIab'}
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
                            editable={false}
                            searchTerm={props.searchTerm ?? 'felt'}
                            text={listData?.value}
                          />
                        )}
                      </>
                      <>
                        {!(listData?.type === 'dialogue') ? null : (
                          <ConversationViewBlock
                            contact={listData?._user}
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
        </ScreenComponents.ViewShotView>
      </Utils.CustomCodeErrorBoundary>
      {/* DeleteModal */}
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        transparent={true}
        visible={showDeleteModal}
      >
        <BlurView
          intensity={50}
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
          tint={'dark'}
        >
          <Surface
            {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
            elevation={1}
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
                  onPress={() => {
                    try {
                      setShowDeleteModal(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  size={32}
                  color={theme.colors.text.medium}
                  icon={'Feather/x'}
                />
              </View>
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
              {'You are about to delete this quote. This can not be undone. '}
            </Text>
            {/* ErrorMessage */}
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { color: theme.colors.background.danger }
                ),
                dimensions.width
              )}
            >
              {errorMessage}
            </Text>
            {/* Modal Footer */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', gap: 8 },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              >
                {/* CancelButton */}
                <Button
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setShowDeleteModal(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.ButtonStyles(theme)['OutlineButton'].props}
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
                  title={'Cancel'}
                />
              </View>
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              >
                {/* DeleteButton */}
                <Button
                  iconPosition={'left'}
                  onPress={() => {
                    const handler = async () => {
                      try {
                        setShowDeleteModal(false);
                        setIsDeleting(true);
                        const deleteResult = (
                          await xANODeleteQuoteDELETE.mutateAsync({
                            quote_id: (
                              props.quote ?? {
                                _quote: {
                                  id: 62,
                                  location: null,
                                  created_at: 1711908854982,
                                  creator_id: 1,
                                  quote_date: 1711908823000,
                                },
                                _blocks: [
                                  {
                                    id: 73,
                                    type: 'dialogue',
                                    _user: {
                                      id: 1,
                                      name: 'Cam Lindsay',
                                      last_name: 'Lindsay',
                                      created_at: 1710858691391,
                                      first_name: 'Cam',
                                      profile_image: {
                                        url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                        meta: { width: 762, height: 1143 },
                                        mime: 'image/jpeg',
                                        name: 'file-799c21.jpeg',
                                        path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                        size: 72133,
                                        type: 'image',
                                        access: 'public',
                                      },
                                    },
                                    value: 'follow the fire',
                                    user_id: 1,
                                    quote_id: 62,
                                    created_at: 1711908855044,
                                  },
                                ],
                                quote_id: 62,
                                visibilty: 'public',
                              }
                            )?.quote_id,
                          })
                        )?.json;
                        setIsDeleting(false);
                        if (deleteResult?.message) {
                          setErrorMessage(deleteResult?.message);
                        } else {
                          props.onDelete?.();
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  {...GlobalStyles.ButtonStyles(theme)['OutlineButton'].props}
                  disabled={isDeleting}
                  loading={isDeleting}
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
                  title={'Delete'}
                />
              </View>
            </View>
          </Surface>
        </BlurView>
      </Modal>
    </Surface>
  );
};

export default withTheme(QuoteCardBlock);
