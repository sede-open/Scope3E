import { render, fireEvent, waitFor } from '@testing-library/react';

import Modal from '.';
import * as selectors from './selectors';

describe('Modal', () => {
  it('should trigger onClose() when close button is clicked', async () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal onClose={onClose} isOpen>
        Modal content
      </Modal>
    );

    const closeBtn = getByTestId(selectors.closeButton);
    fireEvent.click(closeBtn);

    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});
