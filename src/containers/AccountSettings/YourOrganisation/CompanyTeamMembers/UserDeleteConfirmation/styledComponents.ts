import styled from 'styled-components';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Tundora } from 'styles/colours';
import { CTAContainer } from 'components/CTAContainer';

export const HeadingContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const Heading = styled(Text).attrs({
  as: 'h1',
  size: '32px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 40px;
  margin-bottom: 12px;
`;

export const TextContainer = styled.div`
  max-width: 406px;
  margin-bottom: 2rem;

  ${Text} {
    line-height: 1.7;
  }
`;

export const StyledCTAContainer = styled(CTAContainer)`
  width: 100%;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin-bottom: 8px;
`;

export const ConfirmationContentWrapper = styled.div`
  width: 503px;
`;
