import * as StyledComponents from './styledComponents';

export interface IProps {
  alt: string;
  src: string;
  size?: string | number;
  [key: string]: any;
}

const Icon = ({ alt, src, size }: IProps) => (
  <StyledComponents.StyledImage
    data-testid="icon"
    alt={alt}
    src={src}
    height={size}
    width={size}
  />
);

Icon.defaultProps = {
  size: 20,
};

export default Icon;
