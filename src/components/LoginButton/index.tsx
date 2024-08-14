import * as StyledComponents from './styledComponents';

interface IProps {
  dataTestId?: string;
  buttonText: any;
}

export const LoginButton = ({ dataTestId, buttonText }: IProps) => (
  <StyledComponents.CtaButton
    as="a"
    href="/auth/akamai"
    data-testid={dataTestId}
    color="primary"
    type="button"
    $maxWidth="168px"
  >
    {buttonText}
  </StyledComponents.CtaButton>
);
