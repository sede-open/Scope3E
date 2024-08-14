import { render } from '@testing-library/react';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import { PublicHeader } from '.';

jest.mock('next/config');

describe('Public header', () => {
  beforeEach(() => {
    resetLDMocks();
  });
  it('should render the public site header including page links', async () => {
    mockFlags({ demoLogo: false });
    const { getByTestId, findAllByTestId } = render(<PublicHeader />);

    expect(getByTestId('public-header')).toBeInTheDocument();

    expect(getByTestId('home-btn')).toBeInTheDocument();
    expect(getByTestId('stories-btn')).toBeInTheDocument();

    expect(await findAllByTestId('register-btn')).toHaveLength(2);
  });

  it('should render supplier login btn link to "auth/akamai', async () => {
    mockFlags({ demoLogo: false });
    const { findAllByTestId } = render(<PublicHeader />);
    expect(await findAllByTestId('user-login-btn')).toHaveLength(2);
  });
});
