import styled from 'styled-components';
import { abcdGray } from 'styles/colours';

export const GhostUserControls = styled.div`
  align-items: center;
  display: flex;
  height: 34px;
  margin: 0 1rem 0 auto;
  justify-content: space-between;
  position: relative;
  width: 118px;

  &::before,
  &::after {
    background: ${abcdGray};
    content: '';
    display: block;
  }

  &::after {
    height: 1rem;
    width: 118px;
  }
`;
