import styled from 'styled-components';

import { Gray, Tundora } from 'styles/colours';

export const ToggleOptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 405px;
  padding: 1rem 21px;
  width: 100%;
`;

export const TextContainer = styled.div`
  flex: 1;
  margin-right: 21px;
`;

export const Title = styled.h3`
  color: ${Tundora};
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 0.5rem;
`;

export const Text = styled.p`
  color: ${Gray};
  font-size: 12px;
  line-height: 14px;
`;
