import { Svg } from '.';

interface IProps {
  title?: string;
}

export const AccordionExpand = ({ title }: IProps) => (
  <Svg title={title} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M13 4V10.999L20 11V13L13 12.999V20H11V12.999L4 13V11L11 10.999V4H13Z"
      fill="#595959"
    />
  </Svg>
);

AccordionExpand.defaultProps = {
  title: '',
};
