import { render, fireEvent } from '@testing-library/react';
import { REDIRECT_SESSION_KEY } from '../../constants';
import * as selectors from './selectors';
import { BurgerMenu } from '.';

describe('BurgerMenu', () => {
  describe('User Login Button', () => {
    it('removes redirect item from localStorage on login btn click', () => {
      const { getByTestId } = render(<BurgerMenu dark={false} isOpen />);
      Storage.prototype.removeItem = jest.fn();

      const supplierLoginBtn = getByTestId(selectors.userLoginBtn);
      fireEvent.click(supplierLoginBtn);
      expect(sessionStorage.removeItem).toBeCalledWith(REDIRECT_SESSION_KEY);
    });
  });
});
