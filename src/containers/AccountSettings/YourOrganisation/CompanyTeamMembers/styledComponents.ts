import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora, White, Alto } from 'styles/colours';
import { Card } from 'components/Card';

export const CompanyDetailsWrapper = styled(Card)`
  padding: 2rem 3rem;
  margin: 24px 0;
  height: 193px;
`;

export const CompanyDetailsContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 32px;
`;

export const HeaderContainer = styled.div`
  justify-content: left;
  margin-bottom: 0.5rem;
`;

export const SubHeaderContainer = styled.div`
  justify-content: left;
  margin-bottom: 22px;
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

export const CompanyTeamMembersWrapper = styled.div`
  padding: 2rem 3rem;
  margin-top: 48px;
  height: 120px;
  background-color: ${White};
  border: 1px solid ${Alto};
  max-width: 100%;
  border-bottom: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CompanyTeamMembersHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableLayout = styled.div`
  background: ${White};
  border: 1px solid ${Alto};
  border-top: none;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin-bottom: 8px;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  margin-bottom: 4px;
`;
