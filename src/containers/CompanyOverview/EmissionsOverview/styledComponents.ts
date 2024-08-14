import Button from 'components/Button';
import styled from 'styled-components';
import { SilverChalice, Supernova, White } from 'styles/colours';

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

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
