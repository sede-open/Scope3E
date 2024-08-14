import styled from 'styled-components';

import { Scorpion, AlizarinCrimson, Gray } from 'styles/colours';
import { Text } from 'components/Text';
import { ExternalLink } from 'components/ExternalLink';
import { linkStyles } from 'components/Link';

export const LinkText = styled(Text)`
  text-decoration: underline;
`;

export const Title = styled(Text)`
  margin-bottom: 24px;
`;

export const Wrapper = styled.div`
  text-align: left;
`;

export const Paragraph = styled.div`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 8px;
  line-height: 20px;
  color: ${Scorpion};
`;

export const Footer = styled.div`
  display: inline-block;
  margin-top: 18px;
  line-height: 20px;
  color: ${Gray};
`;

export const BoldCharacters = styled.div`
  font-weight: bold;
  display: inline-block;
`;

export const TextContainer = styled.div`
  width: 500px;
`;

export const IamcContainer = styled.div`
  display: inline-block;
`;

export const ColoredText = styled.span`
  color: ${AlizarinCrimson};
  display: inline-block;
`;

export const StyledExternalLink = styled(ExternalLink)`
  ${linkStyles}
  font-weight: bold;
`;
