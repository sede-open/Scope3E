import { fireEvent, render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import * as sortUtils from 'utils/randomSort';
import * as disclaimerSelectors from 'components/ExternalLinkDisclaimer/selectors';
import communityNamespace from '../../../../locales/en/community.json';
import commonNamespace from '../../../../locales/en/common.json';

import * as selectors from './selectors';
import { CommunityPopularSpaces } from '.';

jest.mock('utils/randomSort');

const setup = (namespaceOverrides: any = {}) =>
  render(
    <I18nProvider
      namespaces={{
        community: communityNamespace,
        common: commonNamespace,
        ...namespaceOverrides,
      }}
    >
      <CommunityPopularSpaces />
    </I18nProvider>
  );

const firstCommunitySpaceCard =
  communityNamespace['most-popular-spaces-cards'][0];

describe('CommunitySpaceCards', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'open', {
      configurable: true,
    });
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display the community space cards', async () => {
    const { findByTestId } = setup();
    expect(
      await findByTestId(selectors.communitySpaceCards)
    ).toBeInTheDocument();
  });

  it('should display show more space cards button', async () => {
    const { findByTestId } = setup();

    expect(
      await findByTestId(selectors.showMoreSpacesButton)
    ).toBeInTheDocument();
  });

  it('should should open the Disclaimer when show more space cards button is clicked', async () => {
    const { getByTestId, findByTestId, queryByTestId } = setup();

    expect(queryByTestId(disclaimerSelectors.container)).toBeNull();
    fireEvent.click(getByTestId(selectors.showMoreSpacesButton));
    fireEvent.click(getByTestId('external-link-btn'));
    expect(
      await findByTestId(disclaimerSelectors.container)
    ).toBeInTheDocument();
  });

  describe('when the communitySpaceLink does not contain the example.com domain', () => {
    beforeEach(() => {
      (sortUtils.randomSort as jest.Mock).mockImplementation(() => [
        communityNamespace['most-popular-spaces-cards'][0],
        communityNamespace['most-popular-spaces-cards'][1],
        communityNamespace['most-popular-spaces-cards'][2],
      ]);
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    it('should open the extenal link disclaimer with the URL attached to the continue button', async () => {
      const { getAllByTestId, findByTestId } = setup();

      const communitySpaceCard = getAllByTestId(
        selectors.communitySpaceCardLink
      )[0];

      fireEvent.click(communitySpaceCard);
      const { url } = firstCommunitySpaceCard;

      const continueButton = await findByTestId(
        'external-link-disclaimer-continue-button'
      );

      expect(continueButton).toHaveTextContent('Continue');
      expect(continueButton).toHaveAttribute('href', url);
    });

    describe('when the communitySpaceCardLink contains the example.com domain', () => {
      const communitySpaceCardUrl = 'http://www.example.com/some-card';

      it('should not call openModal when clicked', async () => {
        const { getAllByTestId, queryByTestId } = setup({
          community: {
            ...communityNamespace,
            'most-popular-spaces-cards': [
              {
                ...firstCommunitySpaceCard,
                url: communitySpaceCardUrl,
              },
            ],
          },
        });

        const communitySpaceCard = getAllByTestId(
          selectors.communitySpaceCardLink
        )[0];

        fireEvent.click(communitySpaceCard);

        expect(
          await queryByTestId('external-link-disclaimer-continue-button')
        ).not.toBeInTheDocument();
      });

      it('should call window.open with the solution url when clicked', () => {
        const { getAllByTestId } = setup({
          community: {
            ...communityNamespace,
            'most-popular-spaces-cards': [
              {
                ...firstCommunitySpaceCard,
                url: communitySpaceCardUrl,
              },
            ],
          },
        });

        const communitySpaceCard = getAllByTestId(
          selectors.communitySpaceCardLink
        )[0];

        fireEvent.click(communitySpaceCard);

        expect(window.open).toHaveBeenCalledWith(communitySpaceCardUrl);
      });
    });
  });
});
