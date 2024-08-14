import { render, fireEvent } from '@testing-library/react';
import {
  DATA_PRIVACY_NOTICE_LINK,
  mailTo,
  REDIRECT_SESSION_KEY,
} from '../../constants';
import { Footer } from '.';
import * as selectors from './selectors';

describe('Footer', () => {
  describe('when Footer is rendered and isPublicRoute prop is true', () => {
    it('should render the terms and conditions button', async () => {
      const { getByTestId, findByTestId } = render(<Footer isPublicRoute />);
      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(await findByTestId(selectors.termsBtn)).toHaveAttribute(
        'href',
        '/terms-of-use'
      );
    });

    it('should render the legal disclaimer button', async () => {
      const { getByTestId, findByTestId } = render(<Footer isPublicRoute />);
      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(await findByTestId(selectors.legalDisclaimerBtn)).toHaveAttribute(
        'href',
        '/legal-disclaimer'
      );
    });

    it('should render the data privacy button', async () => {
      const { getByTestId, findByTestId } = render(<Footer isPublicRoute />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(await findByTestId(selectors.dataPrivacyBtn)).toHaveAttribute(
        'href',
        DATA_PRIVACY_NOTICE_LINK
      );
    });

    it('should render the acceptable use button', async () => {
      const { getByTestId, findByTestId } = render(<Footer isPublicRoute />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(await findByTestId(selectors.acceptableUseBtn)).toHaveAttribute(
        'href',
        '/acceptable-use'
      );
    });

    it('should render the contact us button', () => {
      const { getByTestId } = render(<Footer isPublicRoute />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(getByTestId(selectors.contactBtn)).toBeInTheDocument();
      expect(getByTestId(selectors.contactBtn)).toHaveAttribute(
        'href',
        '/contact-us'
      );
    });

    it('should render the footer navigation link list', () => {
      const { getByTestId } = render(<Footer isPublicRoute />);

      expect(getByTestId(selectors.footerNavList)).toBeInTheDocument();
    });

    it('should render example login btn link to "/auth/example', () => {
      const { getByTestId } = render(<Footer isPublicRoute />);

      const supplierLoginBtn = getByTestId(selectors.exampleLoginBtn);
      expect(supplierLoginBtn).toBeInTheDocument();
      expect(supplierLoginBtn).toHaveAttribute('href', '/auth/example');
    });

    it('should remove sessionStorage redirect item on example login btn click', () => {
      const { getByTestId } = render(<Footer isPublicRoute />);
      Storage.prototype.removeItem = jest.fn();

      const supplierLoginBtn = getByTestId(selectors.exampleLoginBtn);
      fireEvent.click(supplierLoginBtn);
      expect(sessionStorage.removeItem).toBeCalledWith(REDIRECT_SESSION_KEY);
    });

    it('should NOT render the mail to button', () => {
      const { getByTestId, queryByTestId } = render(<Footer isPublicRoute />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(queryByTestId(selectors.mailToBtn)).not.toBeInTheDocument();
    });
  });

  describe('when Footer is rendered and isPublicRoute prop is default setting false', () => {
    it('should render the terms and conditions button', () => {
      const { getByTestId } = render(<Footer />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(getByTestId(selectors.termsBtn)).toHaveAttribute(
        'href',
        '/terms-of-use'
      );
    });

    it('should render the legal disclaimer button', () => {
      const { getByTestId } = render(<Footer />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(getByTestId(selectors.legalDisclaimerBtn)).toHaveAttribute(
        'href',
        '/legal-disclaimer'
      );
    });

    it('should render the data privacy button', () => {
      const { getByTestId } = render(<Footer />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(getByTestId(selectors.dataPrivacyBtn)).toHaveAttribute(
        'href',
        DATA_PRIVACY_NOTICE_LINK
      );
    });

    it('should render the acceptable use button', () => {
      const { getByTestId } = render(<Footer />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(getByTestId(selectors.acceptableUseBtn)).toHaveAttribute(
        'href',
        '/acceptable-use'
      );
    });

    it('should render the mail to button', () => {
      const { getByTestId } = render(<Footer />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(getByTestId(selectors.mailToBtn)).toBeInTheDocument();
      expect(getByTestId(selectors.mailToBtn)).toHaveAttribute('href', mailTo);
    });

    it('should NOT render the contact us button', () => {
      const { getByTestId, queryByTestId } = render(<Footer />);

      expect(getByTestId(selectors.footerContainer)).toBeInTheDocument();
      expect(queryByTestId(selectors.contactBtn)).not.toBeInTheDocument();
    });

    it('should NOT render the footer nav link list', () => {
      const { queryByTestId } = render(<Footer />);

      expect(queryByTestId(selectors.footerNavList)).not.toBeInTheDocument();
    });
  });
});
