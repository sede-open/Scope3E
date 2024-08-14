import styled from 'styled-components';
import {
  AlizarinCrimson,
  Alto,
  Gallery,
  Scorpion,
  SilverChalice,
  Tundora,
} from 'styles/colours';

export const StyledContainer = styled.div<{
  content?: string;
  hasError?: boolean;
  classNamePrefix: string;
  isThin?: boolean;
  removeValueContainerPadding?: boolean;
}>`
  width: 100%;

  * {
    font-family: Arial;
  }

  ${({ content }) =>
    content
      ? `
      .single__single-value:before,
      .single-wide__single-value:before {
        display: inline-block;
        content: '${content}';
        margin-right: 0.25rem;
      }
    `
      : ''}

  .single__control,
  .single-wide__control {
    :hover,
    :focus {
      border: 1px solid ${Scorpion};
      outline: none;
    }
    border-radius: 0px;
    ${({ hasError }) =>
      hasError &&
      `
      border: 1px solid ${AlizarinCrimson};
      :hover {
        border: 1px solid ${AlizarinCrimson};
      }
    `}
  }

  .single__option {
    color: ${Tundora};
  }

  .single__placeholder,
  .single-wide__placeholder {
    color: ${Scorpion};
  }

  .single__single-value--is-disabled,
  .single-wide__single-value--is-disabled {
    color: ${Scorpion};
  }

  .single__indicator-separator,
  .single-wide__indicator-separator {
    display: none;
  }

  .single__menu,
  .single-wide__menu {
    z-index: 3;
  }

  .single-wide__menu {
    width: 268px;
  }

  .single__option--is-focused:active,
  .single-wide__option--is-focused:active {
    background-color: ${Gallery};
  }
  .single__single-value,
  .single-wide__single-value {
    font-size: 14px;
  }

  .single__value-container,
  .single-wide__value-container {
    padding: ${({ isThin }) => (isThin ? '0' : '12px')} 16px;
    ${({ removeValueContainerPadding }) =>
      removeValueContainerPadding && `padding: 0px`};
  }

  .single__group {
    margin-left: 13px;
    margin-right: 30px;
    padding-bottom: 16px;
    padding-top: 16px;
    border-bottom: 1px solid ${Alto};

    :last-of-type {
      border-bottom: none;
    }
  }

  .single__group-heading {
    margin-left: -13px;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 20px;
    color: ${Tundora};
    font-weight: bold;
    text-transform: revert;
  }

  .single__option--is-disabled {
    color: ${SilverChalice};
  }

  .single__option--is-selected {
    background-color: ${SilverChalice};
    color: ${Tundora};
  }
`;
