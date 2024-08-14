import styled from 'styled-components';

import { Alto, Tundora } from 'styles/colours';
import { Text } from 'components/Text';

export const Wrapper = styled.div`
  background: white;
  border: 1px solid ${Alto};
  border-radius: 4px;
  padding: 16px;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.08);
`;

export const Spacer = styled.div`
  margin-bottom: 43px;
`;

export const TooltipColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 14px 0 14px;
`;

export const YearContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 10px;
`;

export const Year = styled(Text).attrs({ color: Tundora })`
  font-weight: bold;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Category = styled(Text).attrs({ color: Tundora })`
  margin-bottom: 8px;
`;
