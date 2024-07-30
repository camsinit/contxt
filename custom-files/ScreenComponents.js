import palettes from '../themes/palettes';
// This import is required if you are defining react components in this module.
import React, { useState, useEffect, useRef } from 'react';
import Text from '@sanar/react-native-highlight-text';
import PInput from 'react-native-phone-number-input';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';
import * as StyleSheet from '../utils/StyleSheet';
import * as GlobalStyles from '../GlobalStyles.js';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import useWindowDimensions from '../utils/useWindowDimensions';

export const HighlightText = ({
  searchWords = [],
  textToHighlight = '',
  highlightMode = 'lightgrey',
}) => {
  if (highlightMode === 'lightgrey') {
    return (
      <Text
        highlightStyle={{ backgroundColor: 'lightgrey' }}
        searchWords={searchWords.map(w =>
          w.replaceAll('(', '').replaceAll(')', '')
        )}
        textToHighlight={textToHighlight}
        // style={{
        //   textShadowColor: 'rgba(0, 0, 0, 0.25)',
        //   textShadowOffset: { width: 0, height: 4 },
        //   textShadowRadius: 10,
        // }}
      />
    );
  } else {
    return (
      <Text
        highlightStyle={{ color: 'rgba(0,0,0,1)' }}
        searchWords={searchWords.map(w =>
          w.replaceAll('(', '').replaceAll(')', '')
        )}
        textToHighlight={textToHighlight}
        style={{
          color: 'rgba(0,0,0,0.25)',
        }}
      />
    );
  }
};

export const PhoneInput = ({
  number,
  setNumber,
  theme,
  style = { marginTop: 20 },
}) => {
  const [value, setValue] = useState(number);
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    setNumber(formattedValue);
  }, [value]);

  return (
    <View style={style}>
      <PInput
        defaultValue={value}
        defaultCode="US"
        layout="first"
        onChangeText={text => {
          setValue(text);
        }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        // withShadow
        containerStyle={{
          minHeight: 48,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: theme.colors.border.brand,
          paddingRight: 1,
          width: '100%',
        }}
        textContainerStyle={{
          height: 48,
          borderRadius: 8,
          backgroundColor: theme.colors.background.brand,
        }}
        flagButtonStyle={{
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
        codeTextStyle={{
          fontSize: 14,
          height: 48,
          marginTop: 25,
          fontFamily: 'Poppins_400Regular',
        }}
        textInputStyle={{
          fontSize: 14,
          height: 48,
          borderRadius: 8,
          fontFamily: 'Poppins_400Regular',
        }}
        textInputProps={{
          placeholderTextColor: theme.colors.branding.secondary,
          selectionColor: theme.colors.branding.secondary,
        }}
        autoFocus={false}
        countryPickerProps={{
          withCloseButton: true,
          closeButtonImageStyle: {},
        }}
      />
    </View>
  );
};

export function ModalView({ theme, show, hide, children }) {
  const dimensions = useWindowDimensions();

  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      setTimeout(() => {
        setShouldRender(false);
      }, 500); // set this to the duration of your animation
    }
  }, [show]);

  if (!shouldRender) return null;

  return (
    <BlurView
      intensity={60}
      style={StyleSheet.applyWidth(
        StyleSheet.compose(GlobalStyles.BlurViewStyles(theme)['Blur View'], {
          // alignItems: 'center',
          // justifyContent: 'center'
          position: 'absolute',
          // top: -60,
          // marginTop:100,
          left: 0,
          height: '100%',
          width: '100%',
        }),
        dimensions.width
      )}
      tint={'dark'}
    >
      <Animatable.View
        animation={show ? 'fadeInUp' : 'fadeOutDown'}
        duration={300}
        style={{
          position: 'absolute',
          // top: 60,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 999,
          backgroundColor: 'transparent',
        }}
      >
        <View style={{ flex: 1 }}>{children}</View>
      </Animatable.View>
    </BlurView>
  );
}

export function ViewShotView({ children, share, setShare }) {
  const ref = useRef();

  const takeScreenShot = () => {
    ref.current.capture().then(uri => {
      // console.log('do something with ', uri);
      Sharing.shareAsync(uri);
    });
  };

  useEffect(() => {
    if (share) {
      takeScreenShot();
      setShare(false);
    }
  }, [share]);

  return (
    <ViewShot
      ref={ref}
      options={{ fileName: 'Your-File-Name', format: 'jpg', quality: 0.9 }}
    >
      {children}
    </ViewShot>
  );
}
