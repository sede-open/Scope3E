import { formatDecimal } from 'utils/number';
import useTranslation from 'next-translate/useTranslation';

import { isexampleDomain } from 'utils/url';

import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';

type ReadMoreLink = {
  text: string;
  url: string;
};

interface IProps {
  description: string;
  openLinkDisclaimerModal?: (url: string) => void;
  readMoreLink?: ReadMoreLink;
  total: number;
  totalName: string;
}

export const StepEmissionsTotal = ({
  description,
  openLinkDisclaimerModal,
  readMoreLink,
  total,
  totalName,
}: IProps) => {
  const { t } = useTranslation();

  const formattedTotal = formatDecimal(total);

  const onLinkClick = () => {
    if (!isexampleDomain(readMoreLink!.url) && openLinkDisclaimerModal) {
      openLinkDisclaimerModal(readMoreLink!.url);
    } else {
      window.open(readMoreLink!.url);
    }
  };

  return (
    <StyledComponents.Container>
      <StyledComponents.Total data-testid={selectors.totalEmissions}>
        {formattedTotal} {t('common:unit-mt-co2')}
      </StyledComponents.Total>

      <StyledComponents.TotalName>{totalName}</StyledComponents.TotalName>

      <StyledComponents.TotalDescription>
        {description}
      </StyledComponents.TotalDescription>

      {readMoreLink && (
        <StyledComponents.TotalDescription>
          <StyledComponents.ReadMoreButton
            color="text-button"
            data-testid={selectors.readMoreButton}
            onClick={onLinkClick}
          >
            {readMoreLink.text}
          </StyledComponents.ReadMoreButton>
        </StyledComponents.TotalDescription>
      )}
    </StyledComponents.Container>
  );
};

StepEmissionsTotal.defaultProps = {
  readMoreLink: undefined,
  openLinkDisclaimerModal: undefined,
};
