import styled from 'styled-components';
import { Alto } from 'styles/colours';

export const DropdownList = styled.div`
  background-color: white;
  font-size: 1rem;
  color: black;
  max-height: 200px;
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${Alto};

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    // border-radius: 3px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const DropdownListItem = styled.div`
  cursor: pointer;
  height: 48px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropdownListItemSpan = styled.span`
  padding-left: 16px;
  line-height: 48px;
`;
