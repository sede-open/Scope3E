import styled from 'styled-components';
import { Scorpion, Supernova } from 'styles/colours';

export const StyledContainer = styled.div`
  width: 100%;

  * {
    font-family: Arial;
  }

  .multi__menu {
    overflow-y: auto;
  }

  .multi__placeholder {
    color: ${Scorpion};
  }

  .multi__control {
    border-radius: 0px;
    :hover {
      border: 1px solid ${Scorpion};
      outline: none;
    }
  }

  .multi__option {
    padding: 1rem;
    width: 95%;
    margin: 0 auto;
  }
  .multi__multi-value {
    background-color: ${Supernova};
    border-radius: 0px;
    font-size: 14px;
    font-weight: bold;
  }

  .multi__multi-value__label {
    font-size: 100%;
  }

  .multi__multi-value__remove {
    :hover {
      background-color: ${Supernova};
    }
  }

  .multi__menu {
    z-index: 3;
  }

  .multi__value-container {
    padding-left: 1rem;
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
  }

  .multi__option:first-child {
    width: 95%;
    margin: 0 auto;
  }
`;
