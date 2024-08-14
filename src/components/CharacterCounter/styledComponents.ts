import styled from 'styled-components';
import { AlizarinCrimson, Gray } from 'styles/colours';

export const StyledCharacters = styled.span<{ valid: boolean }>`
  color: ${({ valid }) => (valid ? `${Gray}` : `${AlizarinCrimson}`)};
  font-size: 12px;
`;
