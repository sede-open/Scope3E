import { Svg } from '.';

interface IProps {
  title?: string;
}

export const EmissionDataIcon = ({ title }: IProps) => (
  <Svg title={title} width="80" height="80" viewBox="0 0 80 80" fill="none">
    <>
      <rect width="80" height="80" fill="#FBCE07" />
      <path
        d="M40 20L60 30.0126L49.996 35.002L60 40.0126L49.996 45.002L60 50.0126L40 59.9919L20 50.0126L30.004 45.002L20 40.0126L30.004 35.002L20 30.0126L40 20ZM45.584 47.266L40.0048 49.718L34.388 47.28L28.944 50.006L40 55.522L51.054 50.006L45.584 47.266ZM45.584 37.266L40.0048 39.718L34.386 37.28L28.946 40.004L37.486 44.264L39.994 45.352L42.808 44.116L51.052 40.004L45.584 37.266ZM40 24.472L28.948 30.006L37.484 34.262L39.994 35.352L42.81 34.116L51.05 30.006L40 24.472Z"
        fill="#595959"
      />
    </>
  </Svg>
);

EmissionDataIcon.defaultProps = {
  title: '',
};
