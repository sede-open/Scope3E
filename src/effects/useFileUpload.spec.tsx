import { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import {
  FileUploadOptions,
  UploadedFileType,
  useFileUpload,
} from './useFileUpload';

const url = '/hello';
const payload = new File([], 'test.pdf');
const file = {
  id: '123456789',
  originalFilename: 'origina;.pdf',
};

const setup = (fileUploadOptions?: Partial<FileUploadOptions>) => {
  const TestComponent = () => {
    const [uploadFile, uploadedFile] = useFileUpload(url, fileUploadOptions);
    const [fileUploadResult, setFileUploadResult] = useState<
      UploadedFileType | undefined
    >();

    const onClick = async () => {
      const result = await uploadFile(payload);
      setFileUploadResult(result);
    };

    return (
      <>
        <div data-testid="uploaded-file">
          {uploadedFile && uploadedFile.originalFilename}
        </div>
        <div data-testid="upload-result">
          {fileUploadResult && fileUploadResult.originalFilename}
        </div>
        <button data-testid="button" type="button" onClick={onClick}>
          click me
        </button>
      </>
    );
  };

  return render(<TestComponent />);
};

describe('useFileUpload', () => {
  describe('when file upload is successful', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
      ((global.fetch as unknown) as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => file,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return file data', async () => {
      const { getByTestId, queryByText, findByTestId } = setup();

      expect(queryByText(file.originalFilename)).not.toBeInTheDocument();

      fireEvent.click(getByTestId('button'));

      expect((await findByTestId('uploaded-file')).textContent).toBe(
        file.originalFilename
      );
      expect(getByTestId('upload-result').textContent).toBe(
        file.originalFilename
      );

      expect(global.fetch).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: 'POST',
        })
      );

      const {
        body,
      } = ((global.fetch as unknown) as jest.Mock).mock.calls[0][1];
      expect(body.get('file')).toEqual(payload);
    });

    describe('when onCompleted callback is provided', () => {
      it('should return call onCompleted', async () => {
        const onCompleted = jest.fn();

        const { getByTestId } = setup({ onCompleted });

        fireEvent.click(getByTestId('button'));

        await waitFor(() => expect(onCompleted).toHaveBeenCalled());
      });
    });
  });

  describe('when file upload fails', () => {
    const errorMessage = 'Oopsy daisy';
    const error = new Error(errorMessage);
    beforeEach(() => {
      global.fetch = jest.fn();
      ((window.fetch as unknown) as jest.Mock).mockRejectedValue(error);
    });

    it('should return undefined', async () => {
      const { getByTestId, queryByText } = setup();

      fireEvent.click(getByTestId('button'));

      await waitFor(() =>
        expect(queryByText(file.originalFilename)).not.toBeInTheDocument()
      );
    });

    describe('when onError callback is provided', () => {
      it('should return call onError', async () => {
        const onError = jest.fn();
        const { getByTestId } = setup({ onError });

        fireEvent.click(getByTestId('button'));

        await waitFor(() =>
          expect(expect(onError).toHaveBeenCalledWith(error))
        );
      });
    });
  });
});
