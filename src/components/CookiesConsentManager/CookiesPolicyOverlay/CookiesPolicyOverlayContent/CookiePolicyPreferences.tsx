import { useEffect, useState } from 'react';
import { CheckBoxSlider } from 'components/CheckBoxSlider';
import { Tundora } from 'styles/colours';
import { exampleMedium } from 'styles/fonts';
import { Text } from 'components/Text';
import { Button } from 'components/Button';
import {
  CategoryMapType,
  CategoryStateType,
  DestinationType,
} from 'components/CookiesConsentManager/types';

import * as StyledComponents from './styledComponents';

const INITIAL_CATEGORY_STATE = false;
const ANALYTICS_CATEGORY = 'Analytics';

interface IProps {
  destinations: DestinationType[];
  setPreferences: (param: { [key: string]: boolean }) => void;
}

export const CookiesPolicyPreferences = ({
  destinations,
  setPreferences,
}: IProps) => {
  const categoryMap = destinations.reduce(
    (acc: CategoryMapType, cur: DestinationType) => {
      if (acc[cur.category]) {
        return {
          ...acc,
          [cur.category]: [...acc[cur.category], cur],
        };
      }

      return {
        ...acc,
        [cur.category]: [cur],
      };
    },
    {}
  );

  const initialCategoryState = Object.keys(categoryMap).reduce(
    (acc: CategoryStateType, cur: string) => ({
      ...acc,
      [cur]: INITIAL_CATEGORY_STATE,
    }),
    {}
  );

  // ensuring all destinations conform to category state
  useEffect(() => {
    destinations.forEach((destination) => {
      setPreferences({ [destination.id]: INITIAL_CATEGORY_STATE });
    });
  }, []);

  const [categoryStates, setCategoryStates] = useState<CategoryStateType>(
    initialCategoryState
  );

  const toggleCategory = (category: string) => {
    const newCategoryState = !categoryStates[category];
    categoryMap[category].forEach((destination) => {
      setPreferences({ [destination.id]: newCategoryState });
    });
    setCategoryStates({
      ...categoryStates,
      [category]: !categoryStates[category],
    });
  };

  return (
    <div>
      {Object.keys(categoryMap).map(
        (category) =>
          category === ANALYTICS_CATEGORY && (
            <StyledComponents.InformationContainer key={category}>
              <CheckBoxSlider
                name="analyticAndPerformaceCookies"
                dataTestId="analytic-performace-cookies-slider"
                onChange={() => toggleCategory(category)}
                isChecked={categoryStates[category]}
                title="Preferences Slider"
              />

              <StyledComponents.TextContainer>
                <StyledComponents.Title
                  as="h3"
                  size="20px"
                  color={Tundora}
                  family={exampleMedium}
                >
                  Analytical and Performance cookies
                </StyledComponents.Title>
                <StyledComponents.InformationParagraph color={Tundora}>
                  These cookies are used to measure and analyze our website
                  audience (e.g. visitor volume, pages viewed, average browsing
                  time). By accepting these cookies, you are helping us improve
                  our website performance.
                </StyledComponents.InformationParagraph>
                <StyledComponents.TextSpacer />
                <Text color={Tundora}>Vendors:</Text>
                <StyledComponents.VendorList>
                  <StyledComponents.ListItem>
                    <StyledComponents.VendorTitle color={Tundora}>
                      Segment:
                    </StyledComponents.VendorTitle>
                    <Button
                      data-testid="segment-anchor"
                      as="a"
                      target="blank"
                      href="https://segment.com"
                      color="text-button"
                      title="Segment URL"
                    >
                      https://segment.com
                    </Button>
                  </StyledComponents.ListItem>
                  <StyledComponents.ListItem>
                    <StyledComponents.VendorTitle color={Tundora}>
                      Amplitude:
                    </StyledComponents.VendorTitle>
                    <Button
                      data-testid="amplitude-anchor"
                      as="a"
                      target="blank"
                      href="https://amplitude.com"
                      color="text-button"
                      title="Amplitude URL"
                    >
                      https://amplitude.com
                    </Button>
                  </StyledComponents.ListItem>
                  <StyledComponents.ListItem>
                    <StyledComponents.VendorTitle color={Tundora}>
                      Hubspot:
                    </StyledComponents.VendorTitle>
                    <Button
                      data-testid="hubspot-anchor"
                      as="a"
                      target="blank"
                      href="https://hubspot.com"
                      color="text-button"
                      title="Hubspot URL"
                    >
                      https://hubspot.com
                    </Button>
                  </StyledComponents.ListItem>
                </StyledComponents.VendorList>
              </StyledComponents.TextContainer>
            </StyledComponents.InformationContainer>
          )
      )}
    </div>
  );
};
