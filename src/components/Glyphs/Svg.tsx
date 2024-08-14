import { ReactNode } from 'react';
import * as StyledComponents from './styledComponents';

interface IProps {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
  height: string;
  title?: string;
  stroke?: string;
  width: string;
  viewBox: string;
  fill: string;
}

export const Svg = ({
  children,
  className,
  dataTestId,
  height,
  title,
  width,
  viewBox,
  fill,
  stroke,
}: IProps) => (
  <StyledComponents.Svg
    className={className}
    data-testid={dataTestId}
    height={height}
    width={width}
    viewBox={viewBox}
    fill={fill}
    stroke={stroke}
  >
    {title && <title>{title}</title>}
    {children}
  </StyledComponents.Svg>
);

Svg.defaultProps = {
  className: undefined,
  dataTestId: undefined,
  title: undefined,
  stroke: undefined,
};
