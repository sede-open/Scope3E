import { ReactNode } from 'react';

import * as StyledComponents from './styledComponents';

interface IProps {
  cta?: ReactNode;
  title: string;
  subtitle?: string;
}

export const Toast = ({ cta, title, subtitle }: IProps) => (
  <StyledComponents.Container>
    <StyledComponents.Wrapper>
      <StyledComponents.Title as="h4">{title}</StyledComponents.Title>
      {subtitle && (
        <StyledComponents.Subtitle>{subtitle}</StyledComponents.Subtitle>
      )}
    </StyledComponents.Wrapper>
    {cta && <StyledComponents.CtaWrapper>{cta}</StyledComponents.CtaWrapper>}
  </StyledComponents.Container>
);

Toast.defaultProps = {
  cta: null,
  subtitle: undefined,
};
