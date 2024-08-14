import styled from 'styled-components';
import { Gallery, Scorpion, SilverChalice, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const Label = styled.label`
  display: block;
  font-family: ${exampleBold};
  font-size: 1.1875rem;
  color: ${Tundora};
  margin-bottom: 14px;
`;

export const Textarea = styled.textarea`
  width: min(392px, 100%);
  padding: 6px 10px;
  border: 1px solid ${SilverChalice};
  font-size: 1.0625rem;
  color: ${Tundora};
  resize: none;
  font-family: Arial, Helvetica, sans-serif;

  &:focus,
  &:hover {
    border-color: ${Scorpion};
    outline: none;
  }

  &:disabled {
    opacity: 0.65;
    background-color: ${Gallery};
    pointer-events: none;
  }
`;
