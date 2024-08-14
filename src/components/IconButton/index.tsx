import Icon from 'components/Icon';

import * as StyledComponents from './styledComponents';

export interface IProps {
  dataTestId: string;
  iconSrc: string;
  onClick: () => void;
}

export const IconButton = ({ iconSrc, onClick, dataTestId }: IProps) => (
  <StyledComponents.Button data-testid={dataTestId} onClick={onClick}>
    <Icon src={iconSrc} size={24} alt="" />
  </StyledComponents.Button>
);
