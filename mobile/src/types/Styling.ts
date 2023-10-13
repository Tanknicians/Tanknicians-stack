import { useWindowDimensions } from 'react-native';
export const CONTENT_SPACING = 15;

// Colors
export const PRIMARY_COLOR = '#1a72ce'; // Blue
export const SECONDARY_COLOR = '#0a1929'; // Dark blue
export const TERTIARY_COLOR = '#F3FAFF'; // Light blue
export const QUARTERNARY_COLOR = '#6a6e75'; // Gray
export const ERROR_COLOR = '#ad373d'; // Red

export const getScreenDimensions = () => {
  const { height, width } = useWindowDimensions();
  return { SCREEN_HEIGHT: height, SCREEN_WIDTH: width };
};
