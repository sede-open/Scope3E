import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const Container = styled.div`
  padding: 8px;
  max-width: 408px;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '2rem',
  color: Tundora,
  family: exampleBold,
})`
  margin-bottom: 16px;
`;

export const Content = styled(Text).attrs({
  size: '0.875rem',
  color: Tundora,
})`
  margin-bottom: 8px;
  max-width: 388px;

  :last-of-type {
    margin-bottom: 24px;
  }
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
