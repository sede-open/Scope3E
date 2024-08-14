import { Svg } from '.';

interface IProps {
  title?: string;
}

export const AccordionCollapse = ({ title }: IProps) => (
  <Svg title={title} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M22 11V13H2V11H22Z" fill="#404040" />
  </Svg>
);

AccordionCollapse.defaultProps = {
  title: '',
};
