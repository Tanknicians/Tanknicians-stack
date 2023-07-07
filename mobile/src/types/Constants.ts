import { Dimensions, Platform } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CONTENT_SPACING = 15;
export const PRIMARY_COLOR = '#1a72ce';
export const SECONDARY_COLOR = '#0a1929';
export const TERTIARY_COLOR = '#F3FAFF';
export const ERROR_COLOR = '#ad373d';
// export const SAFE_AREA_PADDING = () => {
//   const insets = useSafeAreaInsets();

//   return {
//     paddingLeft: insets.left + CONTENT_SPACING,
//     paddingTop: insets.top + CONTENT_SPACING,
//     paddingRight: insets.right + CONTENT_SPACING,
//     paddingBottom: insets.bottom + CONTENT_SPACING
//   };
// };

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.select<number>({
  android: Dimensions.get('screen').height,
  ios: Dimensions.get('window').height
}) as number;

// // The maximum zoom _factor_ you should be able to zoom in
// export const MAX_ZOOM_FACTOR = 20;

// // Capture Button
// export const CAPTURE_BUTTON_SIZE = 78;
