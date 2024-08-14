import { FunGreen } from 'styles/colours';

type Props = {
  color?: string;
};
export const NewTab = ({ color = FunGreen }: Props) => (
  <svg
    width="34"
    height="26"
    viewBox="0 0 34 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_105_2203)">
      <path
        d="M28 6H1V25H28V6Z"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M6 1H33V21.167"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <clipPath id="clip0_105_2203">
        <rect width="34" height="26" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
