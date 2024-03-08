import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

export const CircleStyles = theme =>
  StyleSheet.create({
    Circle: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
    },
  });

export const TextStyles = theme =>
  StyleSheet.create({
    Text: { color: theme.colors['Primary'], fontFamily: 'Poppins_400Regular' },
  });

export const ImageStyles = theme =>
  StyleSheet.create({ Image: { height: 100, width: 100 } });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { minHeight: 40 } });

export const SurfaceStyles = theme =>
  StyleSheet.create({ Surface: { minHeight: 40 } });

export const LinearGradientStyles = theme =>
  StyleSheet.create({ 'Linear Gradient': { flex: 1 } });

export const SVGStyles = theme =>
  StyleSheet.create({ SVG: { height: 100, width: 100 } });

export const H2Styles = theme =>
  StyleSheet.create({
    H2: { color: theme.colors.strong, fontSize: 24, fontWeight: 'bold' },
  });

export const H1Styles = theme =>
  StyleSheet.create({
    H1: { color: theme.colors.strong, fontSize: 32, fontWeight: 'bold' },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'Poppins_700Bold',
      fontSize: 16,
      minHeight: 56,
      textAlign: 'center',
    },
    OutlineButton: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: theme.colors['Primary'],
      borderRadius: 8,
      borderWidth: 1,
      color: theme.colors['Primary'],
      fontFamily: 'Poppins_700Bold',
      fontSize: 16,
      minHeight: 56,
      textAlign: 'center',
    },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Area': {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      fontFamily: 'Poppins_400Regular',
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
    'Text Input': {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      fontFamily: 'Poppins_400Regular',
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
    },
  });

export const LinkStyles = theme =>
  StyleSheet.create({
    Link: { color: theme.colors.primary, fontFamily: 'Poppins_600SemiBold' },
  });

export const PinInputStyles = theme =>
  StyleSheet.create({
    'Pin Input': {
      alignItems: 'center',
      borderColor: theme.colors.medium,
      borderRadius: 5,
      borderWidth: 1,
      color: theme.colors.strong,
      flex: 1,
      fontSize: 25,
      justifyContent: 'center',
      marginLeft: 5,
      marginRight: 5,
      maxHeight: 70,
      maxWidth: 70,
      padding: 5,
    },
  });

export const BlurViewStyles = theme =>
  StyleSheet.create({
    'Blur View': { flexBasis: 0, flexGrow: 1, flexShrink: 1 },
  });

export const BottomSheetStyles = theme =>
  StyleSheet.create({
    'Bottom Sheet': {
      paddingBottom: 10,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 10,
    },
  });

export const ActivityIndicatorStyles = theme =>
  StyleSheet.create({ 'Activity Indicator': { height: 36, width: 36 } });

export const DeckSwiperStyles = theme =>
  StyleSheet.create({ 'Deck Swiper': { position: 'absolute' } });

export const DeckSwiperCardStyles = theme => StyleSheet.create({});

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({ 'Image Background': { flex: 1 } });
