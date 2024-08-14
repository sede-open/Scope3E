import { useCallback, useState } from 'react';

export type UploadedFileType = {
  id: string;
  originalFilename: string;
  azureBlobFilename: string;
  mimetype: string;
  sizeInBytes: number;
};

export type FileUploadOptions = {
  onCompleted?: () => void;
  onError?: (err: Error) => void;
};

export const useFileUpload = (
  url: string,
  { onCompleted, onError }: FileUploadOptions = {}
) => {
  const [uploadedFile, setUploadedFile] = useState<
    UploadedFileType | undefined
  >();

  const resetFile = useCallback(() => {
    setUploadedFile(undefined);
  }, [setUploadedFile]);

  const uploadFile = async (payload: File) => {
    const formData = new FormData();
    formData.append('file', payload);

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data: UploadedFileType = await res.json();

      setUploadedFile(data);

      if (onCompleted) {
        onCompleted();
      }

      return data;
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }

    return undefined;
  };

  return [uploadFile, uploadedFile, resetFile] as const;
};
