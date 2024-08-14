import { ComponentType, ReactNode } from 'react';
import styled from 'styled-components';
import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

interface IProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
  family?: string;
  size?: string;
  color?: string;
  weight?: string;
}

export const Text = styled.p<IProps>`
  font-family: ${({ family }) => family};
  font-size: ${({ size }) => size};
  ${({ weight }) =>
    weight ? `font-weight: ${weight};` : 'font-weight: normal;'}
  color: ${({ color }) => color};
  margin: 0;
  padding: 0;
  word-break: break-word;
`;

Text.defaultProps = {
  as: 'p',
  family: 'Arial',
  size: '14px',
  color: 'Black',
};

export const TextBold = styled(Text).attrs({
  as: 'h2',
  size: '24px',
  color: Tundora,
  family: exampleBold,
})``;

export const TextNormal = styled(Text).attrs({
  as: 'h3',
  size: '14px',
  color: Tundora,
})``;

export const TextAction = styled(Text).attrs({
  as: 'span',
  color: Scorpion,
})`
  text-decoration: underline;
  cursor: pointer;
`;
