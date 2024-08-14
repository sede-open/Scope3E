import styled from 'styled-components';
import Button from 'components/Button';
import { abcdGray } from 'styles/colours';

export const CtaButton = styled(Button)<{
  $maxWidth?: string;
  $maxHeight?: string;
  $marginBottom?: string;
}>`
  max-height: ${({ $maxHeight = '48px' }) => $maxHeight};
  max-width: ${({ $maxWidth = '132px' }) => $maxWidth};

  margin-bottom: ${({ $marginBottom = '48px' }) => $marginBottom};

  text-align: center;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;

  :focus {
    background-color: ${abcdGray};
  }
`;
