import styled from 'styled-components';
import { Gray, Scorpion, Tundora } from 'styles/colours';

export const linkStyles = `
  color: ${Tundora};
  cursor: pointer;
  font-size: inherit;
  text-decoration: underline;

  &:hover {
    color: ${Scorpion};
  }

  &:active,
  &:focus {
    color: ${Gray};
  }
`;

export const Link = styled.a`
  ${linkStyles}
`;

export const LinkButton = styled.button<{ color?: string }>`
  ${linkStyles}

  ${({ color }) => (color ? `color: ${color};` : `color: ${Tundora};`)}
`;
