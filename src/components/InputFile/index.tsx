import { ReactChild, SyntheticEvent } from 'react';
import { UseFormMethods, ValidationRules } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { InputLabel } from 'components/InputLabel';
import { InputError } from 'components/InputError';
import { InputDescription } from 'components/InputDescription';
import { UploadedFileType } from 'effects/useFileUpload';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export interface IProps extends Partial<Pick<UseFormMethods, 'register'>> {
  name: string;
  clearValue: (e: SyntheticEvent<HTMLSpanElement>) => void;
  description?: ReactChild;
  dataTestId?: string;
  label?: string;
  existingFile?: Pick<UploadedFileType, 'id' | 'originalFilename'> | null;
  selectedFile?: FileList | null;
  errorMessage?: string | null;
  validationRules?: ValidationRules;
  lrgLabelSize?: boolean;
  size?: 'small' | 'regular';
  hasError?: boolean;
}

export const InputFile = ({
  label,
  description,
  dataTestId = '',
  name,
  existingFile,
  selectedFile,
  errorMessage,
  register,
  clearValue,
  validationRules = {},
  lrgLabelSize,
  hasError,
  size,
}: IProps) => {
  const { t } = useTranslation();
  const newFile = selectedFile?.[0];
  const isFileAdded = Boolean(newFile || existingFile);
  const addedFileName = newFile?.name || existingFile?.originalFilename;

  return (
    <>
      {label && (
        <InputLabel
          isOptional={!validationRules.required}
          lrgSize={lrgLabelSize}
        >
          <>{label} </>
        </InputLabel>
      )}
      {description && (
        <StyledComponents.InputDescriptionContainer>
          <InputDescription lrgSize={lrgLabelSize}>
            {description}
          </InputDescription>
        </StyledComponents.InputDescriptionContainer>
      )}
      <StyledComponents.Container
        data-testid={`${dataTestId}${selectors.inputContainer}`}
        hasError={hasError}
        isFileAdded={isFileAdded}
        size={size}
      >
        <StyledComponents.FileName>
          {addedFileName ?? t('common:no-file-selected')}
        </StyledComponents.FileName>
        <StyledComponents.Label
          htmlFor={name}
          hidden={isFileAdded}
          data-testid={`${dataTestId}${selectors.chooseLabel}`}
        >
          <StyledComponents.Input
            data-testid={`${dataTestId}${selectors.input}`}
            ref={register && register(validationRules)}
            type="file"
            id={name}
            name={name}
          />
          <StyledComponents.FileButton>
            {t('common:choose')}
          </StyledComponents.FileButton>
        </StyledComponents.Label>
        {isFileAdded && (
          <StyledComponents.FileButton
            data-testid={`${dataTestId}${selectors.deleteButton}`}
            onClick={clearValue}
          >
            {t('common:delete')}
          </StyledComponents.FileButton>
        )}
      </StyledComponents.Container>
      {errorMessage && <InputError>{errorMessage}</InputError>}
    </>
  );
};

InputFile.defaultProps = {
  dataTestId: '',
  label: undefined,
  existingFile: undefined,
  selectedFile: undefined,
  errorMessage: null,
  validationRules: {},
  description: null,
  lrgLabelSize: false,
  size: 'regular',
  hasError: false,
};
