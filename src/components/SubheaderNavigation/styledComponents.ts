import styled from 'styled-components';

import { headerHeight, subheaderHeight } from 'styles/variables';
import { Alto, White } from 'styles/colours';
import { Tab, TabList } from 'components/Tabs';

export const SubheaderNavigationWrapper = styled.div`
  background: ${White};
  border-bottom: 1px solid ${Alto};
  height: ${subheaderHeight}px;
  left: 0;
  position: fixed;
  right: 0;
  top: ${headerHeight}px;
  z-index: 5;
`;

export const SubheaderNavigationInner = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 2168px;
  padding: 0 1.5625rem;
  width: 100%;

  ${TabList} {
    border-bottom: none;
    height: 100%;
  }

  ${Tab} {
    white-space: nowrap;
  }
`;
