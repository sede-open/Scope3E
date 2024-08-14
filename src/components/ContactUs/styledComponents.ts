import styled from 'styled-components';
import { Text } from 'components/Text';
import { Gray, Tundora } from 'styles/colours';

export const StyledTitle = styled(Text)`
  margin-bottom: 2rem;
`;

export const StyledWrapper = styled.div`
  padding: 1rem 0.5rem 1.75rem 0.5rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding-top: 2rem;
  width: 26rem;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

export const MandatoryText = styled(Text)`
  color: ${Gray};
  line-height: 17px;
`;

export const PrivacyPolicyMessage = styled(Text)`
  color: ${Tundora};
  margin: -0.5rem 0 2rem;
  padding-left: 2rem;
  display: flex;
  flex-direction: row;
`;

export const IconSpacer = styled.div`
  margin-right: 8px;
`;
