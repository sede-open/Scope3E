import { Svg } from '.';

interface IProps {
  className?: string;
  title?: string;
}

export const TaskListIllustration = ({ className, title }: IProps) => (
  <Svg
    className={className}
    width="77"
    height="84"
    viewBox="0 0 77 84"
    fill="none"
    title={title}
  >
    <>
      <rect x="63" y="5" width="5" height="5" fill="#FBCE07" />
      <rect
        x="20"
        y="64"
        width="7"
        height="7"
        transform="rotate(90 20 64)"
        fill="#FDEB9C"
      />
      <rect
        x="13"
        y="53"
        width="7"
        height="7"
        transform="rotate(90 13 53)"
        fill="#FCD839"
      />
      <g filter="url(#filter0_x)">
        <rect
          x="16"
          y="15.8105"
          width="39.0082"
          height="34.2857"
          fill="#F7F7F7"
        />
      </g>
      <g filter="url(#filter1_y)">
        <rect x="16.0723" y="9" width="44" height="52" fill="white" />
      </g>
      <rect
        x="32.0005"
        y="18.5469"
        width="20.8569"
        height="2.11258"
        fill="#008443"
      />
      <rect
        x="26"
        y="18"
        width="2"
        height="2"
        transform="rotate(90 26 18)"
        stroke="#008443"
        strokeWidth="2"
      />
      <rect
        x="32.0005"
        y="26.6562"
        width="20.8569"
        height="2.11258"
        fill="#7F7F7F"
      />
      <rect
        x="26.5"
        y="25.5"
        width="3"
        height="3"
        transform="rotate(90 26.5 25.5)"
        stroke="#7F7F7F"
      />
      <rect
        x="32.0005"
        y="34.7656"
        width="20.8569"
        height="2.11258"
        fill="#7F7F7F"
      />
      <rect
        x="26.5"
        y="33.5"
        width="3"
        height="3"
        transform="rotate(90 26.5 33.5)"
        stroke="#7F7F7F"
      />
      <rect x="32.0005" y="42.875" width="21" height="2.07195" fill="#7F7F7F" />
      <rect
        x="26.5"
        y="41.5"
        width="3"
        height="3"
        transform="rotate(90 26.5 41.5)"
        stroke="#7F7F7F"
      />
      <rect
        x="32.0005"
        y="50.9844"
        width="21"
        height="2.07195"
        fill="#7F7F7F"
      />
      <rect
        x="26.5"
        y="49.5"
        width="3"
        height="3"
        transform="rotate(90 26.5 49.5)"
        stroke="#7F7F7F"
      />
      <defs>
        <filter
          id="filter0_x"
          x="0"
          y="6.81055"
          width="71.0082"
          height="66.2857"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="7" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_y"
          x="0.0722656"
          y="0"
          width="76"
          height="84"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="7" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </>
  </Svg>
);

TaskListIllustration.defaultProps = {
  className: undefined,
  title: undefined,
};
