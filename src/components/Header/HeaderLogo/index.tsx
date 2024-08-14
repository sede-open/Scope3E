import { SethLogo } from 'components/Glyphs/SethLogo';
import * as StyledComponents from './styledComponents';

export const HeaderLogo = () => (
  <StyledComponents.StyledContainer data-testid="seth-logo">
    <StyledComponents.StyledImgContainer>
      <SethLogo title="Seth Logo" />
    </StyledComponents.StyledImgContainer>
  </StyledComponents.StyledContainer>
);
