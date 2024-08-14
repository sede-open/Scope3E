import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import * as solutionCardSelectotrs from 'components/SolutionsTopThree/SolutionCards/selectors';

import publicSolutionsNamespace from '../../../locales/en/publicSolutions.json';

import { Home } from '.';
import * as selectors from './selectors';

const setup = () =>
  render(
    <I18nProvider
      namespaces={{
        publicSolutions: publicSolutionsNamespace,
      }}
    >
      <Home />
    </I18nProvider>
  );

describe('Home Page', () => {
  describe('landing section', () => {
    it('should render the turbine graphic', () => {
      const { getByTestId } = setup();
      expect(getByTestId(selectors.homeLandingSection)).toBeInTheDocument();
      expect(getByTestId(selectors.turbineGraphic)).toBeInTheDocument();
    });

    it('should render the squares graphic', () => {
      const { getByTestId } = setup();
      expect(getByTestId(selectors.homeLandingSection)).toBeInTheDocument();
      expect(getByTestId(selectors.squaresGraphic)).toBeInTheDocument();
    });

    it('should render get in touch btn with href link to Get in touch page', () => {
      const { getByTestId } = setup();
      expect(getByTestId(selectors.homeLandingSection)).toBeInTheDocument();
      expect(getByTestId(selectors.getInTouchBtn)).toBeInTheDocument();
      expect(getByTestId(selectors.getInTouchBtn)).toHaveAttribute(
        'href',
        '/join-us'
      );
    });

    it('should render find out more btn with href link to features page', () => {
      const { getByTestId } = setup();
      expect(getByTestId(selectors.homeLandingSection)).toBeInTheDocument();
      expect(getByTestId(selectors.findOutMoreBtn)).toBeInTheDocument();
      expect(getByTestId(selectors.findOutMoreBtn)).toHaveAttribute(
        'href',
        '/features'
      );
    });
  });

  describe('goals section', () => {
    it('should render goals section', () => {
      const { getByTestId } = setup();

      expect(getByTestId(selectors.homeGoalsSection)).toBeInTheDocument();
    });
  });

  describe('testimonial section', () => {
    it('should render testimonial section', () => {
      const { getByTestId } = setup();

      expect(getByTestId(selectors.homeTestimonialSection)).toBeInTheDocument();
    });
  });

  describe('banner quote', () => {
    it('should render banner section', () => {
      const { getByTestId } = setup();

      expect(getByTestId(selectors.homeBannerSection)).toBeInTheDocument();
    });

    it('should render find out more btn with href link to example site', () => {
      const { getByTestId } = setup();
      expect(getByTestId(selectors.homeBannerSection)).toBeInTheDocument();
      expect(getByTestId(selectors.exampleSiteBtn)).toBeInTheDocument();
      expect(getByTestId(selectors.exampleSiteBtn)).toHaveAttribute(
        'href',
        'publicHome:example-climate-url'
      );
    });
  });

  describe('solutions section', () => {
    it('should render solutions section', () => {
      const { getByTestId } = setup();

      expect(getByTestId(selectors.homeSolutionsSection)).toBeInTheDocument();
    });

    it('should render solution card', () => {
      const { getByTestId } = setup();
      expect(getByTestId(selectors.homeSolutionsSection)).toBeInTheDocument();
      expect(
        getByTestId(solutionCardSelectotrs.solutionCard)
      ).toBeInTheDocument();
    });
  });

  describe('footer card', () => {
    it('should render footer card', () => {
      const { getByTestId } = setup();

      expect(getByTestId('footer-card')).toBeInTheDocument();
    });

    it('should render get in touch btn with href link to Get in touch page', () => {
      const { getByTestId } = setup();
      expect(getByTestId('footer-card')).toBeInTheDocument();
      expect(getByTestId('footer-card-btn')).toBeInTheDocument();
      expect(getByTestId('footer-card-btn')).toHaveAttribute(
        'href',
        '/join-us'
      );
    });
  });

  it('should render solutions section', () => {
    const { getByTestId } = setup();

    expect(getByTestId(selectors.homeSolutionsSection)).toBeInTheDocument();
  });
});
