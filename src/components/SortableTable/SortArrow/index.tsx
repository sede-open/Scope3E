import { UpArrow } from 'components/Glyphs/UpArrow';
import * as StyledComponents from './styledComponents';

interface IProps {
  shouldDisplayDown: boolean;
  shouldDisplay: boolean;
}

export const SortArrow = ({ shouldDisplayDown, shouldDisplay }: IProps) => (
  <StyledComponents.SortArrowWrapper
    shouldDisplayDown={shouldDisplayDown}
    shouldDisplay={shouldDisplay}
  >
    <UpArrow />
  </StyledComponents.SortArrowWrapper>
);
