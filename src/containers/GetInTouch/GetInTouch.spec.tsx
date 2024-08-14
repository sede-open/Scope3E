import { act, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import * as getInTouchEmailMocks from 'mocks/getInTouchEmail';
import * as selectors from './selectors';
import { GetInTouch } from '.';

const setup = (mocks: any[]) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <GetInTouch />
    </MockedProvider>
  );

describe('GetInTouchForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GetInTouch', () => {
    it('should render get in touch form', async () => {
      const { getByTestId } = setup([getInTouchEmailMocks.enquiryEmailMock]);

      await act(async () => {
        expect(getByTestId('get-in-touch-form')).toBeInTheDocument();
      });
    });

    it('should render page graphic', async () => {
      const { getByTestId } = setup([getInTouchEmailMocks.enquiryEmailMock]);

      await act(async () => {
        expect(getByTestId(selectors.pageGraphic)).toBeInTheDocument();
      });
    });

    it('should render locations cards', async () => {
      const { getByTestId } = setup([getInTouchEmailMocks.enquiryEmailMock]);

      await act(async () => {
        expect(getByTestId('locations-cards')).toBeInTheDocument();
      });
    });
  });
});
