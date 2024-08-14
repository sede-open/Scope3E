import { Svg } from '.';

interface IProps {
  title?: string;
}

export const QuoteIcon = ({ title }: IProps) => (
  <Svg title={title} width="65" height="64" viewBox="0 0 65 64" fill="none">
    <>
      <circle cx="32" cy="32" r="32" fill="#D9D9D9" />
      <g filter="url(#filter0_d)">
        <path
          d="M61 48.8134H50.9565V55.47L44.2609 48.8134H27.5217V23.8516H61V48.8134Z"
          fill="white"
        />
        <path
          d="M50.4565 48.8134V48.3134H50.9565H60.5V24.3516H28.0217V48.3134H44.2609H44.4671L44.6134 48.4589L50.4565 54.2678V48.8134Z"
          stroke="#F7F7F7"
        />
      </g>
      <g filter="url(#filter1_d)">
        <path
          d="M4.27277 40.7855H15.1532V48.0293L22.4068 40.7855H40.5409V13.6211H4.27277V40.7855Z"
          fill="white"
        />
        <path
          d="M15.6532 40.7855V40.2855H15.1532H4.77277V14.1211H40.0409V40.2855H22.4068H22.1999L22.0535 40.4317L15.6532 46.8234V40.7855Z"
          stroke="#F7F7F7"
        />
      </g>
      <rect
        x="14.5023"
        y="21.9922"
        width="17.6691"
        height="2.78986"
        rx="1"
        fill="#99B1CF"
      />
      <rect
        x="14.5023"
        y="25.7109"
        width="17.6691"
        height="2.78986"
        rx="1"
        fill="#99B1CF"
      />
      <rect
        x="14.5023"
        y="29.4336"
        width="9.29953"
        height="2.78986"
        rx="1"
        fill="#99B1CF"
      />
      <path
        d="M9.09095 23.4806H7.06262V22.3739C7.06262 21.926 7.11315 21.5736 7.21421 21.3167C7.32007 21.056 7.51256 20.8229 7.79167 20.6174C8.07077 20.4118 8.42687 20.2503 8.85997 20.1328L9.25697 20.7715C8.85275 20.8743 8.56161 21.0175 8.38356 21.201C8.21033 21.3846 8.11889 21.6287 8.10927 21.9334H9.09095V23.4806ZM12.4763 23.4806H10.448V22.3739C10.448 21.9224 10.4985 21.5681 10.5996 21.3112C10.7054 21.0542 10.8979 20.8229 11.177 20.6174C11.4609 20.4118 11.8171 20.2503 12.2453 20.1328L12.6423 20.7715C12.2381 20.8743 11.947 21.0175 11.7689 21.201C11.5957 21.3846 11.5043 21.6287 11.4946 21.9334H12.4763V23.4806Z"
        fill="#003C88"
      />
      <path
        d="M36.0607 31.2922L37.751 31.2922L37.751 32.2145C37.751 32.5877 37.7089 32.8814 37.6247 33.0955C37.5364 33.3127 37.376 33.5069 37.1434 33.6782C36.9109 33.8495 36.6141 33.9841 36.2532 34.082L35.9224 33.5498C36.2592 33.4641 36.5018 33.3448 36.6502 33.1918C36.7946 33.0389 36.8707 32.8355 36.8788 32.5816L36.0607 32.5816L36.0607 31.2922ZM33.2396 31.2922L34.9298 31.2922L34.9298 32.2145C34.9298 32.5907 34.8877 32.8859 34.8035 33.1001C34.7153 33.3142 34.5549 33.5069 34.3223 33.6782C34.0857 33.8495 33.789 33.9841 33.432 34.082L33.1012 33.5498C33.4381 33.4641 33.6807 33.3448 33.8291 33.1918C33.9734 33.0389 34.0496 32.8355 34.0576 32.5816L33.2396 32.5816L33.2396 31.2922Z"
        fill="#003C88"
      />
      <defs>
        <filter
          id="filter0_d"
          x="23.5217"
          y="21.8516"
          width="41.4783"
          height="39.6184"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
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
          id="filter1_d"
          x="0.272766"
          y="13.6211"
          width="44.2682"
          height="42.4083"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
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

QuoteIcon.defaultProps = {
  title: '',
};
