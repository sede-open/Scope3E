import { Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';

import * as StyledComponents from './styledComponents';

export type TagListState = {
  [key: string]: boolean;
};

interface IProps {
  onChange: (tagKey: string, value: boolean) => void;
  tagListState: TagListState;
  translationPrefix: string;
}

export const TagList = ({
  tagListState,
  translationPrefix,
  onChange,
}: IProps) => {
  const { t } = useTranslation();

  const handleChange = (tagKey: string, value: boolean) =>
    onChange(tagKey, value);
  return (
    <StyledComponents.TagList>
      {Object.keys(tagListState).map((tagKey) => (
        <Fragment key={tagKey}>
          <StyledComponents.TagLabel
            htmlFor={tagKey}
            isChecked={tagListState[tagKey]}
          >
            {t(`${translationPrefix}${tagKey}`)}
          </StyledComponents.TagLabel>
          <StyledComponents.TagInput
            checked={tagListState[tagKey]}
            id={tagKey}
            name={tagKey}
            onChange={({ target: { checked } }) =>
              handleChange(tagKey, checked)
            }
          />
        </Fragment>
      ))}
    </StyledComponents.TagList>
  );
};
