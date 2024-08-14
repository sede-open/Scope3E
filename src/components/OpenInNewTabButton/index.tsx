import useTranslation from 'next-translate/useTranslation';
import Icon from 'components/Icon';
import * as StyledComponents from './styledComponents';

interface IProps {
  onClick?: () => void;
  dataTestId?: string;
  href: string;
  text: string;
}

export const OpenInNewTabButton = ({
  onClick,
  dataTestId,
  href,
  text,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <StyledComponents.Container
      data-testid={dataTestId}
      aria-label={t(`common:opening-in-a-new-window`)}
      as="a"
      target="_blank"
      href={href}
      onClick={onClick}
    >
      <Icon src="/images/PublicSite/open.svg" alt={t('common:open-tab')} />
      <StyledComponents.LinkTextButton>{text}</StyledComponents.LinkTextButton>
    </StyledComponents.Container>
  );
};

OpenInNewTabButton.defaultProps = {
  dataTestId: '',
  onClick: undefined,
};
