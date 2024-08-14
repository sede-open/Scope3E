import styled from 'styled-components';
import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const EntityTypeHeaderContainer = styled.div`
  margin-bottom: 2rem;
  width: 90%;
`;

export const EntityTypeHeader = styled.h1`
  display: flex;
  justify-content: flex-start;
  color: ${Tundora};
  font-family: ${exampleBold};
  font-size: 2rem;
  line-height: 2rem;
  margin-bottom: 1rem;
`;

export const EntityTypeDescription = styled.p`
  display: flex;
  color: ${Scorpion};
  justify-content: flex-start;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 66%;
`;
