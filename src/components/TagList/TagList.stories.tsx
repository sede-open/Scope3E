import { useState } from 'react';
import I18nProvider from 'next-translate/I18nProvider';

import { TagList, TagListState } from '.';

export default {
  title: 'TagList',
  component: TagList,
};

const someNamespace = {
  'some-prefix-taglist-FUEL_SWITCH_ROAD': 'Fuel switch - road',
  'some-prefix-taglist-FUEL_SWITCH_MARINE': 'Fuel switch - marine',
  'some-prefix-taglist-FUEL_SWITCH_AVIATION': 'Fuel switch - aviation',
  'some-prefix-taglist-MATERIAL_PROCESS_EFFICIENCY':
    'Material and process efficiency',
  'some-prefix-taglist-FUEL_SWITCH_ROAD2': 'Fuel switch - road 2',
  'some-prefix-taglist-FUEL_SWITCH_MARINE2': 'Fuel switch - marine 2',
  'some-prefix-taglist-FUEL_SWITCH_AVIATION2': 'Fuel switch - aviation 2',
  'some-prefix-taglist-MATERIAL_PROCESS_EFFICIENCY2':
    'Material and process efficiency 2',
};

const tags = [
  'FUEL_SWITCH_ROAD',
  'FUEL_SWITCH_MARINE',
  'FUEL_SWITCH_AVIATION',
  'MATERIAL_PROCESS_EFFICIENCY',
  'FUEL_SWITCH_ROAD2',
  'FUEL_SWITCH_MARINE2',
  'FUEL_SWITCH_AVIATION2',
  'MATERIAL_PROCESS_EFFICIENCY2',
];

const initialTagListState = tags.reduce(
  (acc, tag) => ({
    ...acc,
    [tag]: false,
  }),
  {}
);

export const tagList = () => {
  const [tagListState, setTagListState] = useState<TagListState>(
    initialTagListState
  );

  const updateTagState = (tagKey: string, value: boolean) => {
    setTagListState({
      ...tagListState,
      [tagKey]: value,
    });
  };

  return (
    <I18nProvider lang="en" namespaces={{ someNamespace }}>
      <TagList
        onChange={updateTagState}
        tagListState={tagListState}
        translationPrefix="someNamespace:some-prefix-taglist-"
      />
    </I18nProvider>
  );
};
