import styled from 'styled-components';
import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const Container = styled.div`
  display: flex;
  flex-flow: row;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 1rem;
  width: 70%;
  justify-content: space-between;
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 30%;
  margin-right: 2rem;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.h1`
  display: flex;
  justify-content: flex-start;
  color: ${Tundora};
  font-family: ${exampleBold};
  font-size: 2rem;
  line-height: 2rem;
  margin-bottom: 1rem;
`;

export const Body = styled.p`
  display: flex;
  color: ${Scorpion};
  justify-content: flex-start;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const TextContainer = styled.div``;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  > button {
    margin-left: 1rem;
  }
`;
