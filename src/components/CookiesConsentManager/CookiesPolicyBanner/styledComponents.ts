import styled from 'styled-components';
import Button from 'components/Button';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 744px;
`;

export const Title = styled(Text)`
  margin: 40px 0px 28px 0px;
  text-align: center;
`;

export const Subtitle = styled(Text)`
  display: flex;
  text-align: center;
  margin-bottom: 24px;
  max-width: 80%;
  line-height: 26px;
`;

export const PolicyButton = styled(Button)`
  font-size: 16px;
  font-weight: bold;
  margin: 0px 4px 0px 4px;
  :focus {
    color: ${Tundora};
  }
  :hover {
    font-weight: bold;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 2px;
  line-height: 26px;
`;

export const BoldText = styled(Text)`
  display: flex;
  font-weight: bold;
  margin: 0px 4px 0px 4px;
  line-height: 26px;
`;

export const ButtonContainer = styled.div`
  margin-top: 40px;
`;

export const AcceptButton = styled(Button)`
  padding: 16px 36px;
`;

export const CustomiseButton = styled(Button)`
  padding: 16px 26px;
  text-decoration: underline;
`;

export const VerticalSpacer = styled.div`
  margin: 8px 0px;
`;
