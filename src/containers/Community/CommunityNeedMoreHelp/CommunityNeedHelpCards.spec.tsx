import { fireEvent, render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import commonNamespace from '../../../../locales/en/common.json';
import communityNamespace from '../../../../locales/en/community.json';

import * as selectors from './selectors';
import { CommunityNeedMoreHelp } from '.';

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
      <CommunityNeedMoreHelp />
    </I18nProvider>
  );

const firstCommunityNeedHelpCard =
  communityNamespace['need-more-help-cards'][1];

describe('CommunityNeedMoreHelpCards', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'open', {
      configurable: true,
    });
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display the community need more help cards', async () => {
    const { findByTestId, findAllByTestId } = setup();

    const communityCardElements = await findAllByTestId(
      selectors.communityNeedHelpCard
    );

    expect(communityCardElements).toHaveLength(3);
    expect(communityCardElements[0]).toHaveTextContent('Help centre');
    expect(
      await findByTestId(selectors.communityNeedHelpCards)
    ).toBeInTheDocument();
  });

  describe('when the communityNeedHelpCardLink does not contain the example.com domain', () => {
    it('should open the external link disclaimer', async () => {
      const { getAllByTestId, findByTestId } = setup();

      const communityNeedHelpCard = getAllByTestId(
        selectors.communityNeedHelpCardLink
      )[1];

      fireEvent.click(communityNeedHelpCard);

      const { url } = firstCommunityNeedHelpCard;

      const continueButton = await findByTestId(
        'external-link-disclaimer-continue-button'
      );

      expect(continueButton).toHaveTextContent('Continue');
      expect(continueButton).toHaveAttribute('href', url);
    });

    it('should not call window.open when clicked', () => {
      const { getAllByTestId } = setup();

      const communityNeedHelpCard = getAllByTestId(
        selectors.communityNeedHelpCardLink
      )[1];

      fireEvent.click(communityNeedHelpCard);

      expect(window.open).not.toHaveBeenCalled();
    });
  });

  describe('whent the communityNeedHelpCardLink contains the example.com domain', () => {
    const communityNeedHelpCardUrl = 'http://www.example.com/some-card';

    it('should not call openModal when clicked', () => {
      const { getAllByTestId } = setup({
        community: {
          ...communityNamespace,
          'need-more-help-cards': [
            {
              ...firstCommunityNeedHelpCard,
              url: communityNeedHelpCardUrl,
            },
          ],
        },
      });

      const communityNeedHelpCard = getAllByTestId(
        selectors.communityNeedHelpCardLink
      )[0];

      fireEvent.click(communityNeedHelpCard);

      expect(openModal).not.toHaveBeenCalled();
    });

    it('should call window.open with the solution url when clicked', () => {
      const { getAllByTestId } = setup({
        community: {
          ...communityNamespace,
          'need-more-help-cards': [
            {
              ...firstCommunityNeedHelpCard,
              url: communityNeedHelpCardUrl,
            },
          ],
        },
      });

      const communityNeedHelpCard = getAllByTestId(
        selectors.communityNeedHelpCardLink
      )[0];

      fireEvent.click(communityNeedHelpCard);

      expect(window.open).toHaveBeenCalledWith(communityNeedHelpCardUrl);
    });
  });
});
