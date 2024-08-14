import * as Styled from './styledComponents';

interface IProps {
  $size?: string;
}

export const Spinner = ({ $size }: IProps) => <Styled.Spinner $size={$size} />;
