import { fireEvent, render } from '@testing-library/react';
import { IModalContext } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import { mocked } from 'jest-mock';
import I18nProvider from 'next-translate/I18nProvider';
import { IProps, SolutionsDisplay } from '.';
import publicSolutionsNamespace from '../../../locales/en/publicSolutions.json';
import * as selectors from './selectors';

jest.mock('effects/useModal');

const mockedOpenModal = mocked(useModal);

const openModalMock = jest.fn();

const setup = (props: Partial<IProps> = {}, namespaceOverrides: any = {}) => {
  return render(
    <I18nProvider
      namespaces={{
        publicSolutions: publicSolutionsNamespace,
        ...namespaceOverrides,
      }}
    >
      <SolutionsDisplay {...props} />
    </I18nProvider>
  );
};

const totalPublicSolutionsLength =
  publicSolutionsNamespace['solution-cards'].length;
const lastSolutionCard =
  publicSolutionsNamespace['solution-cards'][totalPublicSolutionsLength - 1];

describe('SolutionsDisplay', () => {
  const modalMock = ({ openModal: openModalMock } as unknown) as IModalContext;

  mockedOpenModal.mockReturnValue(modalMock);
  beforeEach(() => {
    Object.defineProperty(window, 'open', {
      configurable: true,
    });
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    solutionsLength | expectedLength
    ${1}            | ${1}
    ${2}            | ${2}
    ${3}            | ${3}
    ${undefined}    | ${totalPublicSolutionsLength}
  `(
    'should render the correct number of solutionsCards',
    ({
      solutionsLength,
      expectedLength,
    }: {
      solutionsLength: number | undefined;
      expectedLength: number;
    }) => {
      const { getAllByTestId } = setup({ solutionsLength });

      expect(getAllByTestId(selectors.solutionsCard)).toHaveLength(
        expectedLength
      );
    }
  );

  describe('Solution Card', () => {
    it('should contain date text content', () => {
      const { getByTestId } = setup({ solutionsLength: 1 });

      const solutionsCard = getByTestId(selectors.link);

      const { date } = lastSolutionCard;
      expect(solutionsCard).toHaveTextContent(date);
    });
  });

  describe('when the solutionsUrl does not contain the example.com domain', () => {
    it('should call openModal with the solution url when clicked', () => {
      const { getByTestId } = setup({ solutionsLength: 1 });

      const solutionsCard = getByTestId(selectors.link);

      fireEvent.click(solutionsCard);

      const { url } = lastSolutionCard;

      expect(openModalMock).toHaveBeenCalledWith(
        expect.objectContaining({ contentProps: { externalLink: url } })
      );
    });

    it('should not call window.open when clicked', () => {
      const { getByTestId } = setup({ solutionsLength: 1 });

      const solutionsCard = getByTestId(selectors.link);

      fireEvent.click(solutionsCard);

      expect(window.open).not.toHaveBeenCalled();
    });
  });

  describe('when the solutionsUrl contains the example.com domain', () => {
    const solutionUrl = 'http://www.example.com/some-article';

    it('should not call openModal when clicked', () => {
      const { getByTestId } = setup(
        { solutionsLength: 1 },
        {
          publicSolutions: {
            ...publicSolutionsNamespace,
            'solution-cards': [
              {
                ...lastSolutionCard,
                url: solutionUrl,
              },
            ],
          },
        }
      );

      const solutionsCard = getByTestId(selectors.link);

      fireEvent.click(solutionsCard);

      expect(openModalMock).not.toHaveBeenCalled();
    });

    it('should call window.open with the solution url when clicked', () => {
      const { getByTestId } = setup(
        { solutionsLength: 1 },
        {
          publicSolutions: {
            ...publicSolutionsNamespace,
            'solution-cards': [
              {
                ...lastSolutionCard,
                url: solutionUrl,
              },
            ],
          },
        }
      );

      const solutionsCard = getByTestId(selectors.link);

      fireEvent.click(solutionsCard);

      expect(window.open).toHaveBeenCalledWith(solutionUrl);
    });
  });
});
