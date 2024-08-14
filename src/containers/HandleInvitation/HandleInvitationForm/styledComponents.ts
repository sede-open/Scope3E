import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
`;

export const SubtextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6px 0 24px 0;
  max-width: 343px;

  @media ${device.tabletS} {
    margin: 28px 0 24px 0;
    max-width: 568px;
  }

  @media ${device.laptopS} {
    margin: 28px 0 24px 0;
  }
`;

export const SubtextHeading = styled(Text).attrs({
  color: Tundora,
  family: exampleBold,
  as: 'h4',
  size: '16px',
})`
  line-height: 21px;
  letter-spacing: -0.3px;
  margin-bottom: 8px;

  @media ${device.laptopS} {
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.4px;
  }
`;

export const Subtext = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 17px;

  @media ${device.laptopS} {
    font-size: 16px;
    line-height: 19px;
  }
`;

export const DeclineDetailInputContainer = styled.div`
  .single__value-container,
  .single-wide__value-container {
    padding: 16px;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 28px 0 4px 0;

  @media ${device.tabletS} {
    margin: 28px 0 8px 0;
  }

  @media ${device.laptopS} {
    margin: 48px 0 8px 0;
  }
`;

export const RadioBtnLabelText = styled.div`
  @media ${device.laptopS} {
    font-size: 14px;
    font-weight: normal;
  }
`;

export const ErrorWrapper = styled.div<{ addMarginBottom?: boolean }>`
  display: flex;
  align-self: flex-end;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin-bottom: 8px;
`;

export const CTAContainer = styled.div<{ xLMarginTop: boolean }>`
  display: flex;
  justify-content: flex-start;
  margin: ${({ xLMarginTop }) =>
    xLMarginTop ? '48px 0 88px 0' : '22px 0 88px 0'};
`;
