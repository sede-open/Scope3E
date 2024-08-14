import styled from 'styled-components';
import { ifProp, prop } from 'styled-tools';
import {
  Alto,
  Tundora,
  Scorpion,
  CongressBlue,
  abcdGray,
  Silver,
} from 'styles/colours';
import { Text } from 'components/Text';
import { Input } from 'components/Input';
import { exampleBold } from 'styles/fonts';
import { visuallyHidden } from 'styles/variables';
import Button from 'components/Button';
import { RadioInputGroup } from 'components/Form/RadioInputGroup';

export const Wrapper = styled.div`
  min-width: 840px;
  max-width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '32px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 40px;
`;

export const SubtitleContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const Subtitle = styled(Text).attrs({
  size: '16px',
  color: Scorpion,
})`
  line-height: 24px;
  width: 75%;
`;

export const LabelContainer = styled.div`
  margin-bottom: 18px;
`;

export const FormContainer = styled.div`
  border-width: 1px 0;
  border-color: ${Silver};
  border-style: solid;
  padding: 32px 0;
`;

export const Percentage = styled.div`
  flex: 1;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;

  > :not(:first-child) {
    margin-left: 16px;
  }
`;

export const CustomInput = styled(Input)`
  line-height: 46px;
  padding: 0 1rem;
`;

export const DateRangeSelect = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const DateRangeLabel = styled.label`
  ${visuallyHidden}
`;

export const InputContainer = styled.div<{ $marginBottom?: string }>`
  margin-bottom: ${ifProp('$marginBottom', prop('$marginBottom'), '20px')};
`;

export const IntensityMeasureContainer = styled.div`
  margin-bottom: 30px;
  width: 66%;
`;

export const CustomRadioInputGroup = styled(RadioInputGroup)`
  margin-bottom: 0px;
  max-width: 360px;
`;

export const CtaContainer = styled.div`
  display: flex;
  justify-content: end;
  width: min(744px, 70%);
`;

export const SubmitCta = styled(Button).attrs({
  color: 'primary',
})``;

export const CloseCta = styled(Button).attrs({
  color: 'secondary',
})`
  margin-right: 1.5rem;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const Alert = styled.div<{ $marginTop: string }>`
  display: flex;
  flex-direction: row;
  background-color: ${abcdGray};
  width: 100%;
  margin-top: ${prop('$marginTop')};
  border: 1px solid ${Alto};
`;

export const AlertTitle = styled(Text).attrs({
  color: CongressBlue,
})`
  font-weight: bold;
  line-height: 20px;
  margin-bottom: 2px;
`;

export const AlertContent = styled(Text).attrs({
  size: '12px',
  color: Scorpion,
})<{ $maxWidth: string }>`
  line-height: 14px;
  max-width: ${prop('$maxWidth')};
`;

export const IconContainer = styled.div`
  margin: 10px;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  top: -8px;
`;
