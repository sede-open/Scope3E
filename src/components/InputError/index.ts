import styled from 'styled-components';
import { AlizarinCrimson } from 'styles/colours';

export const InputError = styled.p<{ noWrap?: boolean; marginTop?: string }>`
  color: ${AlizarinCrimson};
  font-size: 12px;
  line-height: 170%;
  min-height: 1rem;
  ${({ noWrap }) => (noWrap ? 'white-space: nowrap;' : 'white-space: unset;')}
  ${({ marginTop }) => (marginTop ? `margin-top: ${marginTop}` : '')}
`;
