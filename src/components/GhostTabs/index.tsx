import { v4 as uuidV4 } from 'uuid';

import * as StyledComponents from './styledComponents';

interface IProps {
  tabCount: number;
}

export const GhostTabs = ({ tabCount }: IProps) => (
  <StyledComponents.GhostTabs>
    {new Array(tabCount).fill(undefined).map(() => (
      <StyledComponents.GhostTab key={uuidV4()} tabCount={tabCount} />
    ))}
  </StyledComponents.GhostTabs>
);
