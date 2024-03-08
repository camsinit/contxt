import React from 'react';
import * as ScreenComponents from '../custom-files/ScreenComponents';
import * as Utils from '../utils';
import useWindowDimensions from '../utils/useWindowDimensions';
import { withTheme } from '@draftbit/ui';
import { View } from 'react-native';

const HighligtedTextBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View>
      <Utils.CustomCodeErrorBoundary>
        <ScreenComponents.HighlightText
          searchWords={props.searchWords}
          textToHighlight={props.text}
          highlightMode={props.highlightMode}
        />
      </Utils.CustomCodeErrorBoundary>
    </View>
  );
};

export default withTheme(HighligtedTextBlock);
