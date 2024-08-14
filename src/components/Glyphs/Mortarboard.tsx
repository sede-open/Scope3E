import { Svg } from '.';
import * as StyledComponents from './styledComponents';

interface IProps {
  title?: string;
  colour?: string;
}

export const Mortarboard = ({ title, colour }: IProps) => (
  <Svg title={title} width="48" height="49" viewBox="0 0 48 49" fill="none">
    <>
      <rect
        x="0.5"
        y="0.5"
        width="47"
        height="48"
        fill={colour}
        stroke={colour}
      />
      <StyledComponents.Path
        d="M10 0L20 5.00628L18 6.004V14H16V7.002L15 7.501V12.173L14.941 12.3371C14.2944 14.135 12.5643 15 9.99697 15C7.52059 15 5.82444 14.195 5.13101 12.5238L5.05809 12.3345L5 12.1716V7.501L0 5.00628L10 0ZM13 8.498L10 9.99595L7 8.498V11.804L7.04766 11.9C7.4173 12.5788 8.26412 12.9587 9.74437 12.9968L9.99697 13C11.635 13 12.5593 12.6159 12.9523 11.898L13 11.799V8.498ZM10 2.236L4.473 5.003L10 7.761L15.526 5.003L10 2.236Z"
        fill="#404040"
      />
    </>
  </Svg>
);

Mortarboard.defaultProps = {
  title: '',
  colour: '#F7F7F7',
};
