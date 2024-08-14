import * as StyledComponents from './styledComponents';

interface Item {
  term: string;
  description: string;
  dataTestId?: string;
}

interface IProps {
  isVertical?: boolean;
  items: Item[];
}

export const DescriptionList = ({ items, isVertical }: IProps) => (
  <StyledComponents.Dl>
    {items.map(({ term, description, dataTestId }) => (
      <StyledComponents.PairWrapper isVertical={isVertical} key={term}>
        <StyledComponents.Dt isVertical={isVertical}>
          {term}
        </StyledComponents.Dt>
        <StyledComponents.Dd data-testid={dataTestId}>
          {description}
        </StyledComponents.Dd>
      </StyledComponents.PairWrapper>
    ))}
  </StyledComponents.Dl>
);

DescriptionList.defaultProps = {
  isVertical: false,
};
