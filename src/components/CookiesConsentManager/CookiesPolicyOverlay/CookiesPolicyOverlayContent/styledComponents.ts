import styled from 'styled-components';
import { Text } from 'components/Text';
import { Alto, Tundora } from 'styles/colours';
import { Button } from 'components/Button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15% 0% 0% 6%;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
`;

export const InformationContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  letter-spacing: -0.2px;
`;

export const Title = styled(Text)`
  font-weight: unset;
  margin: -2px 0px 8px 0px;
`;

export const RequiredText = styled(Text)`
  font-weight: bold;
  margin-bottom: 6px;
`;

export const InformationParagraph = styled(Text)`
  line-height: 24px;
  max-width: 85%;
`;

export const VendorList = styled.ul`
  margin: 0;
  padding: 4px 0px 0px 0px;
  list-style-type: none;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  color: ${Tundora};
  padding-top: 4px;
  &:before {
    content: '-';
  }
`;

export const VendorTitle = styled(Text)`
  padding: 0px 6px;
`;

export const TextSpacer = styled.div`
  margin-top: 22px;
`;

export const LineBreak = styled.div`
  position: relative;
  border-bottom: 1px solid ${Alto};
  max-width: 88%;
  left: 55px;
`;

export const PolicyLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 23px 0px 0px 55px;
`;

export const Popout = styled.div`
  background: url('/popout.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 14px;
  width: 14px;
`;

export const PolicyLink = styled(Button)`
  margin-left: 8px;
  &:hover {
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  direction: ltr;
  padding: 48px 0px 0px 55px;
`;

export const StyledButton = styled(Button)`
  padding: 16px 32px;
`;
