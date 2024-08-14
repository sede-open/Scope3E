import { exampleBold } from 'styles/fonts';
import { Scorpion } from 'styles/colours';

import Icon from 'components/Icon';
import * as StyledComponents from './styledComponents';

interface IProps {
  title: string;
  message: string;
  dataTestId?: string;
  ctaText?: string;
  ctaClick?: () => void;
}

export const EmptyComponent = ({
  title,
  message,
  dataTestId,
  ctaText,
  ctaClick,
}: IProps) => (
  <StyledComponents.Container data-testid={dataTestId}>
    <Icon alt="" src="/images/data-missing.svg" size="115px" />
    <StyledComponents.Title
      as="h4"
      family={exampleBold}
      color={Scorpion}
      size="16px"
    >
      {title}
    </StyledComponents.Title>
    <StyledComponents.Message color={Scorpion} size="16px">
      {message}
    </StyledComponents.Message>
    {ctaText && ctaClick && (
      <StyledComponents.StyledButton color="primary" onClick={ctaClick}>
        {ctaText}
      </StyledComponents.StyledButton>
    )}
  </StyledComponents.Container>
);

EmptyComponent.defaultProps = {
  dataTestId: '',
  ctaClick: undefined,
  ctaText: '',
};
