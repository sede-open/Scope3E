import { ReactNode } from 'react';

import * as Styled from './styledComponents';

interface IProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClick: () => void;
  dataTestId?: string;
}

export const ButtonCard = ({
  icon,
  title,
  subtitle,
  onClick,
  dataTestId,
}: IProps) => (
  <Styled.Container data-testid={dataTestId} onClick={onClick}>
    <Styled.IconContainer>{icon}</Styled.IconContainer>
    <Styled.Title>{title}</Styled.Title>
    <Styled.Subtitle>{subtitle}</Styled.Subtitle>
  </Styled.Container>
);

ButtonCard.defaultProps = {
  dataTestId: '',
};
