import styled from 'styled-components';

import {
  Alto,
  CongressBlue,
  abcdGray,
  Scorpion,
  Tundora,
  White,
} from 'styles/colours';
import { Table } from 'layouts/Table';

export const Wrapper = styled.div`
  padding-top: 8px;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-self: flex-end;
`;

export const SelectContainer = styled.div`
  margin-right: 1rem;
  width: 196px;

  .single__menu {
    z-index: 3;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const Tr = styled.tr<{ isSelected: boolean }>`
  td {
    background: ${({ isSelected }) => (isSelected ? abcdGray : White)};
    color: ${Scorpion};

    &:first-child {
      border-left: ${({ isSelected }) =>
        isSelected ? `8px solid ${CongressBlue}` : `8px solid ${White}`};
    }
  }
  :hover {
    background: ${({ isSelected }) => (isSelected ? abcdGray : White)};
  }
`;

export const Scroll = styled.div`
  overflow-y: auto;
  height: 494px;
  background: ${White};
  border: 1px solid ${Alto};
  thead th {
    position: sticky;
    top: 0;
  }
`;

export const TableContainer = styled.div`
  margin-top: 1rem;
`;

export const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0;
  background: ${White};

  tr:hover td {
    background: none;
  }

  th,
  td {
    padding: 1rem 0.5rem;
    padding-bottom: 1rem;

    &:first-of-type {
      padding-left: 17px;
    }

    &:last-of-type {
      padding-right: 1.5rem;
    }
  }

  th {
    background: ${White};
    color: ${Tundora};

    &:first-of-type {
      padding-left: 25px;
    }
  }
`;

export const InfoContainer = styled.div`
  align-items: center;
  background: ${abcdGray};
  border: 1px solid ${Alto};
  border-top: none;
  display: flex;
  flex-direction: row;
  padding: 14px 25px;
`;

export const InfoImage = styled.div`
  margin-right: 18px;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: ${Tundora};
`;

export const ToggleOptionMenu = styled.div`
  background: ${White};
  box-shadow: 0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%);
  margin: 0 0 0 -209px;
  position: absolute;
  width: 405px;
  z-index: 3;
`;
