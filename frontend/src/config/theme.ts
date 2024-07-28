import { colorsTuple, createTheme } from '@mantine/core';

export const theme = createTheme({
  /** Put your mantine theme override here */
  primaryColor: 'primary',
  colors: {
    primary: colorsTuple(Array.from({ length: 10 }, () => '#481aed')),
  },
  defaultRadius: 'md',
  headings: {
    fontFamily: 'Inter, sans-serif',
  },
});
