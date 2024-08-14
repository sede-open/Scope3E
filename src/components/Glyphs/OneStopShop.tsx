import { Svg } from '.';

interface IProps {
  title?: string;
}

export const OneStopShop = ({ title }: IProps) => (
  <Svg title={title} width="177" height="182" viewBox="0 0 177 168" fill="none">
    <>
      <path
        d="M35.3761 2.59473C-2.03431 -13.7532 24.7429 51.3999 28.2501 79.2141C23.1841 91.1344 -4.87329 114.874 0.738275 143.483C7.75273 179.244 79.4821 169.089 126.245 155.466C173.008 141.842 179.246 49.8905 151.188 26.0498C123.131 2.20912 82.1392 23.0296 35.3761 2.59473Z"
        fill="#F7F7F7"
      />
      <rect x="134" y="29" width="13.0778" height="13.0778" fill="#FDEB9C" />
      <rect
        x="28.168"
        y="144.09"
        width="13.0778"
        height="13.08"
        transform="rotate(90 28.168 144.09)"
        fill="#FEF5CD"
      />
      <rect
        x="18.0781"
        y="128"
        width="13.0778"
        height="13.0778"
        transform="rotate(90 18.0781 128)"
        fill="#FDE26A"
      />
      <g filter="url(#oneStopFilter0_d)">
        <rect x="27" y="50" width="134" height="90" fill="#F7F7F7" />
      </g>
      <g filter="url(#oneStopFilter1_d)">
        <rect x="30" y="53" width="128" height="84" fill="white" />
      </g>
      <rect x="99" y="115" width="20" height="8" rx="1" fill="#FBCE07" />
      <rect x="99" y="77" width="48" height="5" rx="1" fill="#D9D9D9" />
      <rect x="99" y="88" width="48" height="5" rx="1" fill="#D9D9D9" />
      <rect x="99" y="99" width="31" height="5" rx="1" fill="#D9D9D9" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50.5 76.5V111.5H89.5V114.5H47.5V76.5H50.5Z"
        fill="#D9D9D9"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78.4118 83.8594L87.1214 92.7158L84.9824 94.8193L78.4118 88.1379L66.1725 100.584L61.8553 96.1841L56.0179 102.12L53.8789 100.016L61.8576 91.9032L66.1748 96.3026L78.4118 83.8594Z"
        fill="#003C88"
      />
      <defs>
        <filter
          id="oneStopFilter0_d"
          x="11"
          y="41"
          width="166"
          height="122"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
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
          id="oneStopFilter1_d"
          x="14"
          y="44"
          width="160"
          height="116"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
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

OneStopShop.defaultProps = {
  title: '',
};
