// Mantine theme tokens for the app
// Keep tokens minimal and centralized so components reference them instead of ad-hoc values

import { createTheme, MantineColorsTuple } from '@mantine/core';

// Example custom primary color (blue-ish)
const brand: MantineColorsTuple = [
  '#e8f1ff',
  '#d4e2ff',
  '#a8c4ff',
  '#7aa5ff',
  '#538aff',
  '#3a78ff',
  '#2c6eff',
  '#1a5be5',
  '#124dcc',
  '#0036ad',
];

export const theme = createTheme({
  primaryColor: 'brand',
  colors: { brand },
  defaultRadius: 'md',
});

export const THEME_STORAGE_KEY = 'mw-color-scheme';
