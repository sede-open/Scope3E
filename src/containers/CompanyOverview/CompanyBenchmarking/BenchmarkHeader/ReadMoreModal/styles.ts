import { Text } from 'components/Text';
import styled from 'styled-components';
import { Alto, Scorpion, Tundora, White } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const ContentSection = styled.div`
  flex: 2;
  background-color: ${White};
  padding: 48px;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '2rem',
  family: exampleBold,
  color: Tundora,
})`
  margin-bottom: 8px;
`;

export const Section = styled.section`
  border-bottom: 1px solid ${Alto};
  padding: 16px 0;

  :last-of-type {
    border-bottom: 0;
    margin-bottom: 8px;
  }
`;

export const SectionTitle = styled(Text).attrs({
  as: 'h4',
  weight: 'bold',
  size: '1rem',
  color: Scorpion,
})``;

export const SectionDescription = styled(Text).attrs({
  size: '0.875rem',
  color: Scorpion,
})``;

export const UnorderedList = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
  padding-top: 8px;
`;

export const ListItem = styled(Text).attrs({
  as: 'li',
  size: '0.875rem',
  color: Scorpion,
})``;

export const IconSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: end;
`;
