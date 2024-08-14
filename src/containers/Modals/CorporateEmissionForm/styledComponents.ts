import styled from 'styled-components';
import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';
import { Link } from 'components/Link';
import { RadioInputGroup } from 'components/Form/RadioInputGroup';
import {
  AlizarinCrimson,
  Gray,
  Scorpion,
  White,
  Alto,
  Tundora,
  CongressBlue,
} from 'styles/colours';

export const SpinnerContainer = styled.div`
  height: auto;
  margin-top: 48px;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  color: Tundora,
  family: exampleBold,
  size: '32px',
})`
  margin-bottom: 0.5rem;
`;

export const SubTitle = styled(Text).attrs({
  as: 'span',
  color: Scorpion,
  size: '16px',
})``;

export const Form = styled.form`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const SelectWrapper = styled.div`
  margin-top: 32px;
  max-width: 200px;
`;

export const OuterWrapper = styled.div`
  display: flex;
  margin: 24px 0 0 0;
`;

export const InputGroup = styled(RadioInputGroup)`
  display: flex;
  margin-bottom: 0;
  max-width: 360px;
  max-height: 54px;
`;

export const InnerWrapper = styled.div`
  min-width: 200px;
  padding-right: 33px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin: 24px 0 0 0;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -24px;
`;

export const InputContainer = styled.div<{ hasError?: boolean }>`
  margin-top: 24px;
  padding: 32px 38px;
  width: 100%;
  max-width: 744px;
  background-color: ${White};
  border: 1px solid ${({ hasError }) => (hasError ? AlizarinCrimson : Alto)};

  &:first-of-type {
    margin-top: 0;
  }
`;

export const InputHeaderContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const Scope3MinimumMessage = styled.span<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? Gray : AlizarinCrimson)};
  display: block;
  font-size: 0.75rem;
  line-height: 1.16;
  padding: 0.25rem 0;
`;

export const FileVerificationContainer = styled.div`
  *:focus,
  *:hover {
    outline: none;
    border-color: ${Scorpion};
  }
`;

export const IconContainer = styled.div`
  display: inline-block;
  vertical-align: text-top;
  margin: 2px 2px 0 0;
`;

export const SubLabelLink = styled(Link)`
  color: ${CongressBlue};
  text-decoration: underline;
`;

export const SubLabelLinkContainer = styled.div`
  color: ${CongressBlue};
  line-height: 20px;
`;

export const SummaryContainer = styled.div`
  position: sticky;
  top: 24px;
  margin-left: 24px;
  width: 360px;
`;

export const CarbonIntensityRows = styled.div`
  display: flex;
  flex-direction: row;

  :first-of-type {
    margin-top: 24px;
  }
`;

export const FieldsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0px;
  }
`;

export const CarbonIntensityMetricWrapper = styled.div`
  display: flex;
  width: 276px;
  margin-right: 16px;
`;

export const CarbonIntensityValueWrapper = styled.div`
  display: flex;
  width: 266px;
  margin-right: 16px;
`;

export const CarbonIntensityAddButtonWrapper = styled.div`
  margin-top: 24px;
`;
