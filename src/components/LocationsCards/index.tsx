import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from './styledComponents';

export interface ILocationsDataProps {
  id: string;
  imagePath: string;
  location: string;
  address: string;
}

interface IProps {
  locationsData: ILocationsDataProps[];
  direction?: 'row' | 'column';
}

export const LocationsCards = ({
  locationsData,
  direction = 'row',
}: IProps) => {
  const { t } = useTranslation();
  return (
    <StyledComponents.CardsContainer
      $direction={direction}
      data-testid="locations-cards"
    >
      {locationsData.map((data) => (
        <StyledComponents.Card key={data.id}>
          <StyledComponents.Image
            src={data.imagePath}
            title={t(`publicGetInTouch:${data.location}`)}
          />
          <StyledComponents.TextContainer>
            <StyledComponents.LocationContainer>
              <StyledComponents.Location>
                {t(`publicGetInTouch:${data.location}`)}
              </StyledComponents.Location>
            </StyledComponents.LocationContainer>
            <StyledComponents.AddressContainer>
              <StyledComponents.Address>
                {t(`publicGetInTouch:${data.address}`)}
              </StyledComponents.Address>
            </StyledComponents.AddressContainer>
          </StyledComponents.TextContainer>
        </StyledComponents.Card>
      ))}
    </StyledComponents.CardsContainer>
  );
};
