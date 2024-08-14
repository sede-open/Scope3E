import { createGlobalStyle } from 'styled-components';
import { ifProp } from 'styled-tools';

export const ScrollPrevention: any = createGlobalStyle`
  html {
    overflow: ${ifProp({ prevent: true }, 'hidden', 'initial')}
  }
`;
