import styled from 'styled-components';
import { Text } from 'components/Text';

import { Tundora } from 'styles/colours';
import { Card } from 'components/Card';

export const UserDetailWrapper = styled(Card)`
  padding: 2rem 3rem;
  height: auto;
  margin-top: 48px;
`;

export const UserDetailContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 32px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const EditDetailsButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const EditDetailsText = styled(Text).attrs({
  color: Tundora,
})`
  text-decoration: underline;
  margin-left: 5px;
`;

export const SubHeaderContainer = styled.div`
  justify-content: left;
  margin-bottom: 24px;
  width: 697px;
`;

export const IconHeadings = styled(Text).attrs({
  as: 'h3',
  color: Tundora,
})`
  line-height: 20px;
  font-weight: bold;
  margin: 0px 0px 8px 14px;
`;

export const IconContent = styled(Text).attrs({
  as: 'h4',
  color: Tundora,
})`
  line-height: 20px;
  margin-left: 14px;
`;

export const MailIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f7f7f7;
`;

export const IconAction = styled.button`
  line-height: 20px;
  text-align: start;
  margin-left: 14px;
  text-decoration: underline;
  cursor: pointer;
  color: ${Tundora};
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 64px;
`;

export const RowContainer = styled.div`
  display: flex;
  justify-content: left;
`;

export const Columns = styled.div`
  display: flex;
  justify-items: space-between;
  margin-bottom: 1rem;
  width: 697px;
`;

export const EditInterestWrapper = styled(Card)`
  padding: 2rem 3rem;
  margin-top: 48px;
  height: 320px;
`;
