import { useState } from 'react';
import { boolean, number, text } from '@storybook/addon-knobs';
import I18nProvider from 'next-translate/I18nProvider';

import common from '../../../../../locales/en/common.json';
import { TextareaField } from '.';

export default {
  title: 'Form fields/TextareaField',
  component: TextareaField,
};

export const textareaField = () => {
  const [fieldValue, setFieldValue] = useState('');

  return (
    <I18nProvider lang="en" namespaces={{ common }}>
      <TextareaField
        errorMessage={text('errorMessage', '')}
        id="some-id"
        hasCharacterCount={boolean('hasCharacterCount', true)}
        isDisabled={boolean('isDisabled', false)}
        label="Textarea field"
        maxLength={100}
        name="some-name"
        onChange={setFieldValue}
        rows={number('rows', 5)}
        value={fieldValue}
      />
    </I18nProvider>
  );
};
