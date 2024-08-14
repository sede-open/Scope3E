import { Paragraph } from 'components/Paragraph';
import { Text } from 'components/Text';
import { UnorderedList } from 'components/UnorderedList';
import { ListItem } from 'components/UnorderedList/styledComponents';
import styled from 'styled-components';
import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const Title = styled.h2`
  color: ${Tundora};
  font-family: ${exampleBold};
  font-size: 24px;
  font-weight: normal;
  line-height: 28px;
  margin: 0 0 16px;
  padding: 16px 0 0;

  &:first-of-type {
    padding: 0;
  }
`;

export const StyledParagraph = styled(Paragraph)`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 16px;
`;

export const StyledUnorderedList = styled(UnorderedList)`
  margin-bottom: 16px;
`;
export const List = styled.ol`
  color: ${Tundora};
  font-family: Arial, sans-serif;
  line-height: 20px;
  margin-bottom: 0.5rem;
`;

export const StyledOrderedList = styled(List)`
  margin-bottom: 16px;
`;

export const OrderedListItem = styled(ListItem)`
  list-style-type: decimal; /* or 'decimal-leading-zero', 'upper-alpha', 'lower-alpha'... */
  list-style-position: outside; /* or 'inside' */
  margin-left: 1em; /* gives 'room' for the numbers to appear in */
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const IconContainer = styled.div`
  margin-right: 8px;
`;

export const SolutionCardContainer = styled.div`
  margin-top: 48px;
  margin-bottom: 48px;
`;

export const ImageContainer = styled.img`
  width: 100%;
  margin-bottom: 48px;
`;

export const Disclaimer = styled(Text)`
  color: ${Scorpion};
  font-size: 14px;
  font-style: italic;
  line-height: 20px;
  padding-top: 24px;
`;
