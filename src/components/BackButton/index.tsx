import Icon from 'components/Icon';
import Link from 'next/link';
import * as StyledComponents from './styledComponents';

interface BackButtonProps {
  dataTestIdPrefix?: string;
  backNavigationText: string;
  href?: string;
}

export const BackButton = ({
  dataTestIdPrefix,
  backNavigationText,
  href = '/dashboard',
}: BackButtonProps) => {
  return (
    <Link href={href} passHref>
      <StyledComponents.BackButton
        as="a"
        color="text-button"
        data-testid={dataTestIdPrefix && `${dataTestIdPrefix}-nav-btn`}
      >
        <StyledComponents.IconContainer>
          <Icon alt="Arrow left" src="/arrow-left.svg" size={12} />
        </StyledComponents.IconContainer>
        {backNavigationText}
      </StyledComponents.BackButton>
    </Link>
  );
};
