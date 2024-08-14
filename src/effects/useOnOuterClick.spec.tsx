import { fireEvent, render, waitFor } from '@testing-library/react';
import { useRef } from 'react';
import useOnOuterClick from './useOnOuterClick';

const insideRefBtn = 'inside-ref-button';
const outsideRefBtn = 'outside-ref-button';

describe('useOnOuterClick', () => {
  const callback = jest.fn();

  const TestComponent = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useOnOuterClick(callback, [ref], []);

    return (
      <>
        <div>
          <button type="button" data-testid={outsideRefBtn}>
            Outside Ref Test Button
          </button>
        </div>
        <div ref={ref}>
          <button type="button" data-testid={insideRefBtn}>
            Inside Ref Test Button
          </button>
        </div>
      </>
    );
  };

  it('when an element outside the ref is clicked, callback is called', async () => {
    const { findByTestId } = render(<TestComponent />);

    fireEvent.click(await findByTestId(outsideRefBtn));

    waitFor(() => {
      expect(callback).toHaveBeenCalled();
    });
  });

  it('when an element inside the ref is clicked, callback is not called', async () => {
    const { findByTestId } = render(<TestComponent />);

    fireEvent.click(await findByTestId(insideRefBtn));

    waitFor(() => {
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
