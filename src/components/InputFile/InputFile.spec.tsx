import { fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import { AlizarinCrimson, Alto, abcdGray } from 'styles/colours';

import commonNamespace from '../../../locales/en/common.json';
import * as selectors from './selectors';
import { InputFile, IProps } from '.';

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    name: 'file',
    clearValue: jest.fn(),
    register: jest.fn(),
    ...overrides,
  };

  return render(
    <I18nProvider namespaces={{ common: commonNamespace }}>
      <InputFile {...props} />
    </I18nProvider>
  );
};

describe('InputFile', () => {
  const label = 'I am a file input';
  const description = 'I am a file description';
  const existingFile = {
    id: '12323344',
    originalFilename: 'file.pdf',
  };
  const file = ({ name: 'hello_world.pdf' } as unknown) as File;
  const selectedFile = ([file] as unknown) as FileList;
  const errorMessage = 'I am error';
  const hasError = true;

  it('should render the input label', () => {
    const { getByText } = setup({
      label,
    });

    expect(getByText(label)).toBeInTheDocument();
  });

  it('should render the input description', () => {
    const { getByText } = setup({
      description,
    });

    expect(getByText(description)).toBeInTheDocument();
  });

  describe('when an existing file is provided', () => {
    it('should display existing file details', () => {
      const { getByText } = setup({
        existingFile,
      });

      expect(getByText(existingFile.originalFilename)).toBeInTheDocument();
    });

    it('should allow user to remove the current file', async () => {
      const clearValue = jest.fn();
      const { getByTestId, queryByTestId } = setup({
        existingFile,
        clearValue,
      });

      expect(queryByTestId(selectors.chooseLabel)).not.toBeVisible();
      fireEvent.click(getByTestId(selectors.deleteButton));

      await waitFor(() => expect(clearValue).toHaveBeenCalled());
    });
  });

  describe('when an existing file is NOT provided', () => {
    it('should render a default message', () => {
      const { getByText } = setup();
      expect(
        getByText(commonNamespace['no-file-selected'])
      ).toBeInTheDocument();
    });

    it('should allow user to select a file', () => {
      const { getByTestId, queryByTestId } = setup();
      expect(queryByTestId(selectors.deleteButton)).not.toBeInTheDocument();
      expect(getByTestId(selectors.chooseLabel)).toBeVisible();
    });
  });

  describe('when a file has been selected', () => {
    it('should display file name', () => {
      const { getByText } = setup({ selectedFile });
      expect(getByText(file.name)).toBeInTheDocument();
    });

    it('should render selected container state', () => {
      const { getByTestId } = setup({ selectedFile });
      expect(getByTestId(selectors.inputContainer)).toHaveStyle(
        `background: ${abcdGray}`
      );
    });
  });

  describe('error state', () => {
    describe('when NO errorMessage is provided', () => {
      it('should render container default state', () => {
        const { getByTestId } = setup({ selectedFile });
        expect(getByTestId(selectors.inputContainer)).toHaveStyle(
          `border: 1px solid ${Alto}`
        );
      });
    });

    describe('when hasError is provided', () => {
      it('should render container error state', () => {
        const { getByTestId } = setup({ selectedFile, hasError });
        expect(getByTestId(selectors.inputContainer)).toHaveStyle(
          `border: 1px solid ${AlizarinCrimson}`
        );
      });

      it('should render error message', () => {
        const { getByText } = setup({ selectedFile, errorMessage });
        expect(getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
});
