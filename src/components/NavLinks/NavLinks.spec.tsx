import Link from 'next/link';
import { render } from '@testing-library/react';
import { White } from 'styles/colours';
import { NavLink } from './styledComponents';

import * as selectors from './selectors';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NavLink button Active state style', () => {
  describe('When current page is "/"', () => {
    it('"Home" NavButton component should have isActive style', () => {
      const { getByTestId } = render(
        <Link as="a" href="/">
          <NavLink
            color="text-button"
            $footer={false}
            $isActive
            data-testid={selectors.homeBtn}
          />
        </Link>
      );

      expect(getByTestId(selectors.homeBtn)).toBeInTheDocument();
      expect(getByTestId(selectors.homeBtn)).toHaveStyle(
        `border-bottom: 3px solid ${White}`
      );
    });

    it('"Solutions" NavButton component should not have isActive style', () => {
      const { getByTestId } = render(
        <Link as="a" href="/stories">
          <NavLink
            $footer={false}
            color="text-button"
            $isActive={false}
            data-testid={selectors.storiesBtn}
          />
        </Link>
      );

      expect(getByTestId(selectors.storiesBtn)).toBeInTheDocument();
      expect(getByTestId(selectors.storiesBtn)).toHaveStyle(
        'border-bottom: 3px solid transparent'
      );
    });
  });

  describe('When current page is "/stories"', () => {
    it('"Solutions" NavButton component should have isActive style', () => {
      const { getByTestId } = render(
        <Link as="a" href="/stories">
          <NavLink
            $footer={false}
            color="text-button"
            $isActive
            data-testid={selectors.storiesBtn}
          />
        </Link>
      );

      expect(getByTestId(selectors.storiesBtn)).toBeInTheDocument();
      expect(getByTestId(selectors.storiesBtn)).toHaveStyle(
        `border-bottom: 3px solid ${White}`
      );
    });

    it('"Home" NavButton component should not have isActive style', () => {
      const { getByTestId } = render(
        <Link as="a" href="/">
          <NavLink
            $footer={false}
            color="text-button"
            $isActive={false}
            data-testid={selectors.homeBtn}
          />
        </Link>
      );

      expect(getByTestId(selectors.homeBtn)).toBeInTheDocument();
      expect(getByTestId(selectors.homeBtn)).toHaveStyle(
        'border-bottom: 3px solid transparent'
      );
    });
  });
});
