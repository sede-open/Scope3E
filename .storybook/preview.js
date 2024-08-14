import { GlobalStyle } from '../src/styles/global-style';

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];
