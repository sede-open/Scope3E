import styled from 'styled-components';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Scorpion, Tundora } from 'styles/colours';
import { CTAContainer } from 'components/CTAContainer';

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Header = styled.header`
  padding: 90px 0 36px 0;
`;

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

export const Subtitle = styled(Text).attrs({
  size: '16px',
  color: Scorpion,
})`
  line-height: 24px;
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 10px;
  }
`;

export const ConfirmationContentWrapper = styled.div<{
  isXl?: boolean | undefined;
}>`
  width: ${({ isXl }) => (isXl ? '503' : '320')}px;
`;

export const StyledCTAContainer = styled(CTAContainer)`
  width: 100%;
`;

export const RadioGroup = styled.div`
  display: flex;
  max-width: 90%;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin-bottom: 8px;
`;

export const ErrorWrapper = styled.div<{ addMarginBottom?: boolean }>`
  display: flex;
  align-self: flex-end;
  margin-bottom: ${({ addMarginBottom }) => (addMarginBottom ? `16px` : '4px')};
`;
