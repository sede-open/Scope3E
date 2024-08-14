import { fireEvent, render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import communityNamespace from '../../../../locales/en/community.json';
import commonNamespace from '../../../../locales/en/common.json';

import * as selectors from './selectors';
import { CommunityDiscoverCards } from '.';

const openModal = jest.fn();

const setup = (namespaceOverrides: any = {}) =>
  render(
    <I18nProvider
      namespaces={{
        community: communityNamespace,
        common: commonNamespace,
        ...namespaceOverrides,
      }}
    >
      <CommunityDiscoverCards />
    </I18nProvider>
  );

const firstCommunityDiscoverCard =
  communityNamespace['discover-the-community-cards'][0];

describe('CommunityDiscoverCards', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'open', {
      configurable: true,
    });
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display the community cards', async () => {
    const { findByTestId, findAllByTestId } = setup();
    const communityCardElements = await findAllByTestId(
      selectors.communityCard
    );

    expect(communityCardElements).toHaveLength(3);
    expect(communityCardElements[1]).toHaveTextContent('Inspiring stories');
    expect(
      await findByTestId(selectors.communityDiscoverCards)
    ).toBeInTheDocument();
  });

  describe('when the communityCardUrl does not contain the example.com domain', () => {
    it('should open the link confirmation modal when the card link is clicked', async () => {
      const { getAllByTestId, findByTestId } = setup();

      const communityCard = getAllByTestId(selectors.communityCardLink)[0];

      fireEvent.click(communityCard);

      const { url } = firstCommunityDiscoverCard;

      const continueButton = await findByTestId(
        'external-link-disclaimer-continue-button'
      );

      expect(continueButton).toHaveTextContent('Continue');
      expect(continueButton).toHaveAttribute('href', url);
    });

    it('should not call window.open when clicked', () => {
      const { getAllByTestId } = setup();

      const communityCard = getAllByTestId(selectors.communityCardLink)[0];

      fireEvent.click(communityCard);

      expect(window.open).not.toHaveBeenCalled();
    });
  });

  describe('when the communityCardUrl contains the example.com domain', () => {
    const communityCardUrl = 'http://www.example.com/some-card';

    it('should not call openModal when clicked', () => {
      const { getAllByTestId } = setup({
        community: {
          ...communityNamespace,
          'discover-the-community-cards': [
            {
              ...firstCommunityDiscoverCard,
              url: communityCardUrl,
            },
          ],
        },
      });

      const communityCard = getAllByTestId(selectors.communityCardLink)[0];

      fireEvent.click(communityCard);

      expect(openModal).not.toHaveBeenCalled();
    });

    it('should call window.open with the solution url when clicked', () => {
      const { getAllByTestId } = setup({
        community: {
          ...communityNamespace,
          'discover-the-community-cards': [
            {
              ...firstCommunityDiscoverCard,
              url: communityCardUrl,
            },
          ],
        },
      });

      const communityCard = getAllByTestId(selectors.communityCardLink)[0];

      fireEvent.click(communityCard);

      expect(window.open).toHaveBeenCalledWith(communityCardUrl);
    });
  });
});
