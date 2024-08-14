import { render } from '@testing-library/react';
import redirect from 'utils/redirect';
import RedirectTo from '.';

jest.mock('utils/redirect');

describe('RedirectTo', () => {
  it('should redirect a user to the specified location upon being mounted', () => {
    render(<RedirectTo url="/some-url" />);
    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith('/some-url');
  });
});
