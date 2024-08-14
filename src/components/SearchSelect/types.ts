export enum SearchSelectOptionTagType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

type SearchSelectOptionTag = {
  name: string;
  type: SearchSelectOptionTagType;
};

export type SearchSelectOption = {
  value: string;
  label: string;
  metaLabels?: string[];
  tag: SearchSelectOptionTag;
  [key: string]: string | number | undefined | string[] | SearchSelectOptionTag;
};
