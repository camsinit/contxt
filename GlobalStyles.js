import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

export const CircleStyles = theme =>
  StyleSheet.create({
    Circle: {
      style: {
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
      },
      props: {},
    },
  });

export const TextStyles = theme =>
  StyleSheet.create({
    Text: {
      style: {
        color: theme.colors['Primary'],
        fontFamily: 'Poppins_400Regular',
      },
      props: {},
    },
  });

export const ImageStyles = theme =>
  StyleSheet.create({
    Image: { style: { height: 100, width: 100 }, props: {} },
  });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { style: { minHeight: 40 }, props: {} } });

export const SurfaceStyles = theme =>
  StyleSheet.create({ Surface: { style: { minHeight: 40 }, props: {} } });

export const LinearGradientStyles = theme =>
  StyleSheet.create({ 'Linear Gradient': { style: { flex: 1 }, props: {} } });

export const SVGStyles = theme =>
  StyleSheet.create({ SVG: { style: { height: 100, width: 100 }, props: {} } });

export const H2Styles = theme =>
  StyleSheet.create({
    H2: {
      style: { color: theme.colors.strong, fontSize: 24, fontWeight: 'bold' },
      props: {},
    },
  });

export const H1Styles = theme =>
  StyleSheet.create({
    H1: {
      style: { color: theme.colors.strong, fontSize: 32, fontWeight: 'bold' },
      props: {},
    },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      style: {
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        minHeight: 56,
        textAlign: 'center',
      },
      props: {},
    },
    OutlineButton: {
      style: {
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
      props: {},
    },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Area': {
      style: {
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
      props: {},
    },
    'Text Input': {
      style: {
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
      props: {},
    },
  });

export const LinkStyles = theme =>
  StyleSheet.create({
    Link: {
      style: { color: theme.colors.primary, fontFamily: 'Poppins_600SemiBold' },
      props: {},
    },
  });

export const PinInputStyles = theme =>
  StyleSheet.create({
    'Pin Input': {
      style: {
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
      props: {},
    },
  });

export const BlurViewStyles = theme =>
  StyleSheet.create({
    'Blur View': {
      style: { flexBasis: 0, flexGrow: 1, flexShrink: 1 },
      props: {},
    },
  });

export const BottomSheetStyles = theme =>
  StyleSheet.create({
    'Bottom Sheet': {
      style: {
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
      },
      props: {},
    },
  });

export const ActivityIndicatorStyles = theme =>
  StyleSheet.create({
    'Activity Indicator': { style: { height: 36, width: 36 }, props: {} },
  });

export const DeckSwiperStyles = theme =>
  StyleSheet.create({
    'Deck Swiper': { style: { position: 'absolute' }, props: {} },
  });

export const DeckSwiperCardStyles = theme =>
  StyleSheet.create({ 'Deck Swiper Card': { style: {}, props: {} } });

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({ 'Image Background': { style: { flex: 1 }, props: {} } });

export const DividerStyles = theme =>
  StyleSheet.create({ Divider: { style: { height: 1 }, props: {} } });
