import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { GhostUserControls } from 'components/GhostUserControls';

import { HeaderLogo } from './HeaderLogo';
import { NavMenu } from './NavMenu';
import * as StyledComponents from './styledComponents';

interface IProps {
  isAdminPage?: boolean;
  isGhosted?: boolean;
}

export const Header = ({ isAdminPage = false, isGhosted }: IProps) => {
  const { firstName, lastName } = useAuthenticatedUser();

  return (
    <StyledComponents.StyledHeader data-testid="page-header">
      <StyledComponents.StyledWrapper>
        <StyledComponents.LogoContainer>
          <HeaderLogo />
        </StyledComponents.LogoContainer>
        {isGhosted && <GhostUserControls />}

        {!isGhosted && firstName && lastName && (
          <NavMenu
            firstName={firstName}
            lastName={lastName}
            isAdminPage={isAdminPage}
          />
        )}
      </StyledComponents.StyledWrapper>
    </StyledComponents.StyledHeader>
  );
};

Header.defaultProps = {
  isAdminPage: false,
  isGhosted: false,
};
