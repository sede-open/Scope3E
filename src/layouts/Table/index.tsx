import styled, { css } from 'styled-components';
import { Gallery, Gray, Tundora, Alto } from 'styles/colours';

export const Table = styled.table`
  border-bottom: none;
  border-collapse: collapse;
  width: 100%;

  tr:last-child td {
    border-bottom: 0;
  }

  tr:hover td {
    background: ${Gallery};
  }
`;

interface IProps {
  align?: 'left' | 'right' | 'center';
  width?: number;
}

export const TD = styled.td<IProps>`
  color: ${Tundora};
  font-size: 14px;
  padding-top: 2rem;
  font-weight: normal;
  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
`;

export const TH = styled.th<IProps>`
  color: ${Gray};
  font-size: 12px;
  border-bottom: 1px solid ${Alto};
  padding-bottom: 1rem;
  text-transform: uppercase;
  font-weight: normal;
  width: ${({ width }) => (width ? `${width}rem` : 'auto')};
  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `};
`;
