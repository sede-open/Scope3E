import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora, Supernova, BrightSun, Festival } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const ModuleTitle = styled(Text).attrs({
  as: 'h2',
  family: exampleBold,
  color: Tundora,
  size: '24px',
})`
  line-height: 28px;
  margin-bottom: 24px;
`;

export const IconContainer = styled.div`
  margin-right: 10px;
`;

export const CtaContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin: 0 0 110px 450px;
`;

export const CtaButton = styled.div`
  max-height: 56px;
  width: auto;
  text-align: left;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 14px;
  font-weight: bold;
  line-height: 100%;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  background-color: ${Supernova};
  color: ${Tundora};
  border: none;
  &:focus,
  &:hover {
    background-color: ${Festival};
  }
  &:active {
    background-color: ${BrightSun};
  }
`;
