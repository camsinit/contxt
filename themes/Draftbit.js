import { systemWeights } from 'react-native-typography';
import palettes from './palettes';
import { createTheme, DefaultTheme } from '@draftbit/ui';
export default createTheme({
  breakpoints: {},
  palettes,
  baseTheme: DefaultTheme,
  theme: {
    name: 'Draftbit',
    colors: {
      background: {
        brand: palettes.Brand.Background,
        danger: palettes.Brand.Error,
      },
      border: { brand: palettes.Brand.Divider, danger: palettes.Brand.Error },
      branding: {
        primary: palettes.Brand.Primary,
        secondary: palettes.Brand.Secondary,
      },
      foreground: { brand: palettes.Brand.Light, danger: palettes.Brand.Light },
      text: {
        danger: palettes.Brand.Error,
        light: palettes.Brand.Light,
        medium: palettes.Brand.Medium,
        strong: palettes.Brand.Strong,
      },
    },
    typography: {
      body1: {
        ...systemWeights.regular,
        fontSize: 16,
        letterSpacing: 0,
        lineHeight: 26,
      },
      body2: {
        ...systemWeights.regular,
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 22,
      },
      button: {
        ...systemWeights.bold,
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 16,
      },
      caption: {
        ...systemWeights.regular,
        fontSize: 12,
        letterSpacing: 0,
        lineHeight: 16,
      },
      headline1: {
        ...systemWeights.bold,
        fontSize: 60,
        letterSpacing: 0,
        lineHeight: 71,
      },
      headline2: {
        ...systemWeights.bold,
        fontSize: 48,
        letterSpacing: 0,
        lineHeight: 58,
      },
      headline3: {
        ...systemWeights.bold,
        fontSize: 34,
        letterSpacing: 0,
        lineHeight: 40,
      },
      headline4: {
        ...systemWeights.bold,
        fontSize: 24,
        letterSpacing: 0,
        lineHeight: 34,
      },
      headline5: {
        ...systemWeights.bold,
        fontSize: 20,
        letterSpacing: 0,
        lineHeight: 26,
      },
      headline6: {
        ...systemWeights.bold,
        fontSize: 16,
        letterSpacing: 0,
        lineHeight: 24,
      },
      overline: {
        ...systemWeights.regular,
        fontSize: 12,
        letterSpacing: 2,
        lineHeight: 16,
      },
      subtitle1: {
        ...systemWeights.regular,
        fontSize: 16,
        letterSpacing: 0,
        lineHeight: 26,
      },
      subtitle2: {
        ...systemWeights.regular,
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 22,
      },
    },
  },
});
