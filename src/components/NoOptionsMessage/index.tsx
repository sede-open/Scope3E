import * as StyledComponents from './styledComponents';

interface IProps {
  dataTestId?: string;
  message: string;
}

export const NoOptionsMessage = ({ dataTestId, message }: IProps) => (
  <StyledComponents.NoOptionsContainer data-testid={dataTestId}>
    <StyledComponents.NoOptionsParagraph>
      {message}
    </StyledComponents.NoOptionsParagraph>
  </StyledComponents.NoOptionsContainer>
);

NoOptionsMessage.defaultProps = {
  dataTestId: undefined,
};
