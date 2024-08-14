import styled from 'styled-components';

import { Tundora } from 'styles/colours';

export const DataListContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
`;

export const DataList = styled.ol`
  list-style-position: inside;
`;

export const DataListItem = styled.li`
  list-style-position: inside;
  margin-bottom: 8px;
  color: ${Tundora};
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
`;
