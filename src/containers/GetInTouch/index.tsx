import useTranslation from 'next-translate/useTranslation';
import { LocationsCards } from 'components/LocationsCards';
import { GetInTouchForm } from './GetInTouchForm';
import { locationsData } from './locationsData';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export const GetInTouch = () => {
  const { t } = useTranslation();

  return (
    <StyledComponents.Wrapper>
      <StyledComponents.HeadContainer>
        <StyledComponents.GraphicContainer>
          <StyledComponents.Graphic
            data-testid={selectors.pageGraphic}
            alt={t('publicGetInTouch:squares-graphic')}
            title={t('publicGetInTouch:squares-graphic')}
          />
        </StyledComponents.GraphicContainer>
        <StyledComponents.ContentWrapper>
          <GetInTouchForm />
        </StyledComponents.ContentWrapper>
      </StyledComponents.HeadContainer>
      <StyledComponents.SubTextContainer>
        <StyledComponents.Subtext>
          {t('publicGetInTouch:page-subtext')}
        </StyledComponents.Subtext>
      </StyledComponents.SubTextContainer>
      <StyledComponents.LocationsCardContainer>
        <LocationsCards locationsData={locationsData} />
      </StyledComponents.LocationsCardContainer>
    </StyledComponents.Wrapper>
  );
};
