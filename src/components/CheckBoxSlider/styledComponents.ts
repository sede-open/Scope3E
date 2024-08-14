import styled from 'styled-components';

import { Alto, SeaGreen, VistaBlue, White } from 'styles/colours';
import { visuallyHidden } from 'styles/variables';

export const Wrapper = styled.div`
  max-width: 100%;
`;

export const CheckBoxLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
`;

export const CheckBoxTitle = styled.span`
  ${visuallyHidden}
`;

export const Slider = styled.span`
  &:before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 2px;
    right: 8px;
    top: 2px;
    bottom: 0px;
    background-color: ${White};
    transition: 0.4s;
  }
  border-radius: 34px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${Alto};
  transition: 0.4s;
`;

export const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + ${Slider} {
    background-color: ${SeaGreen};
  }
  &:checked + ${Slider}:before {
    transform: translateX(16px);
  }
  &:disabled:checked + ${Slider} {
    background-color: ${VistaBlue};
  }
`;
