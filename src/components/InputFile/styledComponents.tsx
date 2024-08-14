import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import {
  Alto,
  Tundora,
  Gray,
  SilverChalice,
  AlizarinCrimson,
  abcdGray,
} from 'styles/colours';

export const Container = styled.div<{
  hasError?: boolean;
  isFileAdded: boolean;
  size?: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 48px;
  max-width: ${({ size }) => (size === 'small' ? '360px' : '100%')};
  padding: 8px 10px 8px 16px;
  border: 1px solid ${ifProp({ hasError: true }, AlizarinCrimson, Alto)};
  background: ${ifProp({ isFileAdded: true }, abcdGray, 'transparent')};
`;

export const Label = styled.label<{ hidden: boolean }>`
  color: ${Tundora};
  font-size: 14px;
  z-index: 2;
  background: transparent;
  cursor: pointer;
  display: ${ifProp({ hidden: true }, 'none', 'flex')};
`;

export const Input = styled.input`
  display: none;
`;

export const InputDescriptionContainer = styled.div`
  margin-bottom: 21px;
`;

export const FileButton = styled.span`
  padding: 6px 15px;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  color: ${Tundora};
  border: 1px solid ${SilverChalice};
  cursor: pointer;
`;

export const FileName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 20px;
  color: ${Gray};
`;
