import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import { Card } from 'components/Card';

export const YourOrganisationPanelWrapper = styled(Card)`
  margin-top: 48px;
`;

export const YourOrganisationContainer = styled.div`
  margin: 24px 0;
  height: 193px;
`;

export const HeaderContainer = styled.div`
  padding: 2rem 3rem 0.5rem 3rem;
  justify-content: left;
`;

export const SubHeaderContainer = styled.div`
  padding: 0rem 3rem 1.5rem 3rem;
  justify-content: left;
`;

export const PanelBodyContainer = styled.div<{
  flexDirection?: string;
}>`
  padding: 0 3rem;
  display: flex;
  flex-direction: ${({ flexDirection = 'row' }) => flexDirection};
  justify-content: left;
  margin-bottom: 32px;

  div:last-child {
    margin-bottom: 0;
  }
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

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 64px;
`;

export const LabelContainer = styled.div`
  margin-bottom: 16px;
`;
