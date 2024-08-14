import { render } from '@testing-library/react';
import { DetailContentBlock } from 'components/PrivateSolutions/DetailContentBlock';
import { SolutionDetailContainer } from 'components/PrivateSolutions/SolutionDetailContainer';
import { mocked } from 'jest-mock';
import { SolutionDetail } from '.';
import { Solutions } from '../types';

jest.mock('components/PrivateSolutions/SolutionDetailContainer');
jest.mock('components/PrivateSolutions/DetailContentBlock');

const solutionDetailContainerMocked = mocked(SolutionDetailContainer);
const detailContentBlockMocked = mocked(DetailContentBlock);
describe('SolutionDetail Component', () => {
  solutionDetailContainerMocked.mockReturnValue(<div />);
  detailContentBlockMocked.mockReturnValue(<div />);

  beforeEach(() => {
    solutionDetailContainerMocked.mockClear();
    detailContentBlockMocked.mockClear();
  });

  it('should render component with tooltip and strong component', () => {
    render(<SolutionDetail solutionId={Solutions.BATTERY_STORAGE} />);
    const props = solutionDetailContainerMocked.mock.calls[0][0];
    expect(props).toEqual(
      expect.objectContaining({
        hasToolTip: true,
        solutionId: Solutions.BATTERY_STORAGE,
      })
    );
  });

  it('should render component without tooltip', () => {
    render(<SolutionDetail solutionId={Solutions.SUSTAINABLE_AVIATION} />);
    const props = solutionDetailContainerMocked.mock.calls[0][0];
    expect(props).toEqual(
      expect.objectContaining({
        hasToolTip: false,
        solutionId: Solutions.SUSTAINABLE_AVIATION,
      })
    );
  });

  it('should render component with custom components', () => {
    render(<SolutionDetail solutionId={Solutions.NATURE_BASED} />);

    const {
      // @ts-ignore
      props,
    } = solutionDetailContainerMocked.mock.calls[0][0].solutionDetail;
    expect(props).toEqual(
      expect.objectContaining({
        solutionId: Solutions.NATURE_BASED,
        contentItems: `solutionDetail:${Solutions.NATURE_BASED}-content-blocks`,
        components: expect.objectContaining({
          strong: expect.anything(),
        }),
      })
    );
  });
});
