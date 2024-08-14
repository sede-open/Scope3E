import { ReactNode } from 'react';
import { v4 as uuidV4 } from 'uuid';
import * as StyledComponents from './styledComponents';

interface IProps {
  className?: string;
  items: (string | ReactNode)[];
}

const { List, ULListItem } = StyledComponents;

export const UnorderedList = ({ className, items }: IProps) => (
  <StyledComponents.List className={className}>
    {items.map((item) => (
      <StyledComponents.ULListItem key={uuidV4()}>
        {item}
      </StyledComponents.ULListItem>
    ))}
  </StyledComponents.List>
);

UnorderedList.defaultProps = {
  className: undefined,
};

export { List, ULListItem };
