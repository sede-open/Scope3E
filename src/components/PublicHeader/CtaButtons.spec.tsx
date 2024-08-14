import { render, fireEvent } from '@testing-library/react';
import { REDIRECT_SESSION_KEY } from '../../constants';
import * as selectors from './selectors';
import { CtaButtons } from './CtaButtons';

describe('CtaButtons', () => {
  it('removes redirect item from localStorage on login btn click', () => {
    const { getByTestId } = render(<CtaButtons />);
    Storage.prototype.removeItem = jest.fn();

    const supplierLoginBtn = getByTestId(selectors.userLoginBtn);
    fireEvent.click(supplierLoginBtn);
    expect(sessionStorage.removeItem).toBeCalledWith(REDIRECT_SESSION_KEY);
  });
});
