import styled from 'styled-components';

import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';
import Button from 'components/Button';

export const ParagraphTitle = styled(Text).attrs({
  as: 'h2',
  size: '24px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 28px;
`;

export const ParagraphSubtext = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 20px;
  margin: 16px 0 24px 0;
  white-space: pre-wrap;
`;

export const Image = styled.img`
  background-color: transparent;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  width: 552px;
  height: 310px;
  transition: 0.5s ease-out;
`;

export const NavLink = styled(Button)`
  display: inline-block;
`;
