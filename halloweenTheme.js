import { DefaultTheme } from 'react-native-paper';

export const HalloweenTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF5722',  // A nice pumpkin orange
    accent: '#FFEB3B',   // A bright Halloween yellow
    background: '#212121',  // A spooky dark grey
    surface: '#37474F',  // A lighter grey for surfaces
    text: '#FFFFFF',     // White text for contrast
    error: '#D32F2F',    // A blood-red error color
    onBackground: '#FF9800', // Darker yellow for on-background elements
    onSurface: '#FF9800', // Darker yellow for on-surface elements
  },
}; 