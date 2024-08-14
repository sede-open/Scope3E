import styled from 'styled-components';

import { abcdGray } from 'styles/colours';

export const GhostTabs = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 100%;
`;

export const GhostTab = styled.span<{ tabCount: number }>`
  background: ${abcdGray};
  display: block;
  pointer-events: none;
  height: 1rem;
  width: ${({ tabCount }) => 100 / (tabCount + 1)}%;
`;
