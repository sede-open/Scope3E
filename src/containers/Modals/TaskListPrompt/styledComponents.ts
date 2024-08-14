import styled from 'styled-components';

import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Button } from 'components/Button';
import { TaskListCheck } from 'components/Glyphs/TaskListCheck';

export const Container = styled.div`
  display: flex;
  max-width: 744px;
  padding-top: 1rem;
`;

export const Header = styled.h1`
  color: ${Tundora};
  font-family: ${exampleBold};
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 1rem;
`;

export const StyledTaskListCheck = styled(TaskListCheck)`
  height: 40px;
  margin-right: 12px;
  width: 40px;
`;

export const Description = styled.p`
  color: ${Scorpion};
  font-size: 1rem;
  line-height: 24px;
  margin-bottom: 24px;
`;

export const StyledButton = styled(Button)`
  margin: 0 0 0 auto;
`;
