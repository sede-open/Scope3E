import { fireEvent, render, waitFor } from '@testing-library/react';

import { InfoToolTip, IProps } from '.';

const title = 'I am tooltip';
const content = 'I am tooltip content';
const ariaLabel = 'I am aria label';

const setup = (overrides: Partial<IProps> = {}) => {
  const props: Omit<IProps, 'children'> = {
    id: 'tooltip-id',
    title,
    ariaLabel,
    ...overrides,
  };

  return render(<InfoToolTip {...props} />);
};

describe('InfoToolTip', () => {
  it('should display tooltip content when clicked', async () => {
    const { queryByText, findByText, getByLabelText } = setup({ content });

    expect(queryByText(content)).not.toBeVisible();

    fireEvent.click(await findByText(title));

    expect(await findByText(content)).toBeVisible();
    expect(await getByLabelText(ariaLabel)).toBeInTheDocument();
  });

  describe('when close button is clicked', () => {
    it('should hide tooltip content', async () => {
      const { queryByText, getByText, findByTestId } = setup({ content });

      fireEvent.click(await getByText(title));
      await waitFor(() => expect(queryByText(content)).toBeVisible());
      fireEvent.click(await findByTestId('tooltip-id-close-button'));
      await waitFor(() => expect(queryByText(content)).not.toBeVisible());
    });
  });

  describe('when tooltip title is clicked second time', () => {
    it('should hide tooltip content ', async () => {
      const { queryByText, getByText } = setup({ content });

      fireEvent.click(await getByText(title));
      await waitFor(() => expect(queryByText(content)).toBeVisible());
      fireEvent.click(await getByText(title));
      await waitFor(() => expect(queryByText(content)).not.toBeVisible());
    });
  });

  describe('when outside of tooltip is clicked', () => {
    it('should hide tooltip content', async () => {
      const id1 = 'id1';
      const outsideTestId = 'outsideTestId';

      const { getByText, getByTestId, queryByText } = render(
        <div data-testid={outsideTestId}>
          <InfoToolTip
            id={id1}
            title={title}
            content={content}
            ariaLabel={ariaLabel}
          />
        </div>
      );

      fireEvent.click(await getByText(title));
      await waitFor(() => expect(getByText(content)).toBeVisible());
      fireEvent.click(await getByTestId(outsideTestId));
      await waitFor(() => expect(queryByText(content)).not.toBeVisible());
    });
  });

  describe('when there are multiple tooltips present', () => {
    describe('when there is an already open tooltip', () => {
      it('should close the open tooltip to open a clicked tooltip', async () => {
        const id1 = 'id1';
        const id2 = 'id2';
        const title2 = 'title 2';
        const content2 = 'content 2';
        const ariaLabel1 = 'aria label 1';
        const ariaLabel2 = 'aria label 2';

        const { getByText } = render(
          <>
            <InfoToolTip
              id={id1}
              title={title}
              content={content}
              ariaLabel={ariaLabel1}
            />
            <InfoToolTip
              id={id2}
              title={title2}
              content={content2}
              ariaLabel={ariaLabel2}
            />
          </>
        );

        fireEvent.click(await getByText(title));

        await waitFor(() => expect(getByText(content)).toBeVisible());

        fireEvent.click(await getByText(title2));

        await waitFor(() => {
          expect(getByText(content)).not.toBeVisible();
          expect(getByText(content2)).toBeVisible();
        });
      });
    });
  });
});
