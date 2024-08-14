import styled from 'styled-components';
import { Alto, Tundora, White } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Tab } from 'components/Tabs';

export const DashboardContainer = styled.div`
  margin: 0 auto;
  width: 1128px;
  max-width: 100%;
  margin-top: 48px;
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const YearSelectContainer = styled.div`
  width: 100px;

  .single__menu {
    z-index: 3;
    width: 75%;
  }
`;

export const YearSelectLabel = styled.label`
  height: 1px;
  left: -2px;
  overflow: hidden;
  position: absolute;
  width: 1px;
  top: 0;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  border: 1px solid ${Alto};
  width: 100%;
`;

export const Title = styled(Text).attrs({
  as: 'h2',
  size: '24px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 28px;
  align-items: center;
`;

export const TabContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  border-top: none;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${White};
  border-left: 1px solid ${Alto};
  width: 55%;

  ${Tab} {
    padding: 14px 16px;
  }
`;
