import styled from 'styled-components';
import { SilverChalice, Supernova, Tundora, White } from 'styles/colours';
import { Text } from 'components/Text';
import Button from 'components/Button';
import { exampleBold } from 'styles/fonts';

export const OverviewContainer = styled.div`
  margin: 0 auto;
  width: 1128px;
  max-width: 100%;
`;

export const ContentWrapper = styled.div`
  background: ${White};
  border-radius: 4px;
  max-width: 100%;
  margin: 0 auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
`;

export const FlexWrapper = styled.div`
  display: flex;
  margin-right: 1rem;
`;

export const StyledHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-end;
`;

export const Title = styled(Text).attrs({
  as: 'h2',
  size: '24px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 28px;
  margin-bottom: 1rem;
  align-items: center;
`;

export const ToggleBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${SilverChalice};
`;

export const ToggleChartBtn = styled(Button).attrs({
  width: 'auto',
  hieght: 'auto',
})<{ isSelectedChart: boolean }>`
  padding: 12px 14px;
  background: ${({ isSelectedChart }) => (isSelectedChart ? Supernova : White)};
  :focus {
    background-color: ${Supernova};
  }

  &:nth-child(even) {
    border-left: 1px solid ${SilverChalice};
  }
`;

export const AddEmissionsButtton = styled(Button)`
  margin-right: 1rem;
`;
