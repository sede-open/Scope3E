import { Solutions } from 'containers/PrivateSolutions/types';
import { ReactElement } from 'react';

export enum ContentBlockType {
  PARAGRAPH = 'paragraph',
  TITLE = 'title',
  ORDERED_LIST = 'ordered-list',
  UNORDERED_LIST = 'list',
  OPEN_IN_NEW_TAB_TEXT = 'openInNewTabText',
  QUOTE = 'quote',
  STORY = 'story',
  IMAGE = 'contentImage',
  DISCLAIMER = 'disclaimer',
}

export interface IContentBlockItem {
  type: ContentBlockType;
  content: string | string[];
}

export type TComponents = Record<string, ReactElement>;

export interface IProps {
  components?: TComponents;
  contentItems: IContentBlockItem[];
  solutionId: Solutions;
}
