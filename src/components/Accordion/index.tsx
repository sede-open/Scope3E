import { useState } from 'react';
import { Tundora } from 'styles/colours';
import { Text } from 'components/Text';

import { AccordionCollapse } from 'components/Glyphs/AccordionCollapse';
import { AccordionExpand } from 'components/Glyphs/AccordionExpand';
import * as StyledComponents from './styledComponents';

interface IProps {
  title: string;
  content: string;
}

const Accordion = ({ title, content }: IProps) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <StyledComponents.StyledContainer data-testid="accordion">
      <StyledComponents.AccordionWrapper>
        <StyledComponents.StyledTitle
          data-testid="accordion-title"
          open={open}
          color={Tundora}
          size="16px"
        >
          {title}
        </StyledComponents.StyledTitle>
        <StyledComponents.AccordionButton
          onClick={() => {
            handleClick();
          }}
          data-testid="accordion-toggle-btn"
        >
          {open ? (
            <AccordionCollapse title="Accordion open" />
          ) : (
            <AccordionExpand title="Accordion closed" />
          )}
        </StyledComponents.AccordionButton>
      </StyledComponents.AccordionWrapper>
      <StyledComponents.ContentWrapper
        open={open}
        data-testid="accordion-content"
      >
        <Text color={Tundora} size="14px">
          {content}
        </Text>
      </StyledComponents.ContentWrapper>
    </StyledComponents.StyledContainer>
  );
};

export default Accordion;
