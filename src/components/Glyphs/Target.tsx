import { FunGreen, TawnyPort } from 'styles/colours';
import { TargetType } from 'types/globalTypes';
import { Svg } from '.';

export enum TargetImageSize {
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
}

const colorsMap = new Map<TargetType, string>([
  [TargetType.ABSOLUTE, FunGreen],
  [TargetType.INTENSITY, TawnyPort],
]);

const dimensionsMap = new Map<TargetImageSize, { h: string; w: string }>([
  [TargetImageSize.LARGE, { w: '88', h: '88' }],
  [TargetImageSize.MEDIUM, { w: '54', h: '54' }],
]);

interface IProps {
  size: TargetImageSize;
  type: TargetType;
}

export const TargetImage = ({ size, type }: IProps) => (
  <Svg
    width={dimensionsMap.get(size)!.w}
    height={dimensionsMap.get(size)!.h}
    viewBox="0 0 88 88"
    fill="none"
  >
    <>
      <circle cx={44} cy={44} r={44} fill="#D9D9D9" />
      <mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={88}
        height={88}
      >
        <circle cx={44} cy={44} r={44} fill="#D9D9D9" />
      </mask>
      <g mask="url(#prefix__a)">
        <g filter="url(#prefix__filter0_d)">
          <path fill="#fff" d="M21 18h52v71H21z" />
          <path stroke="#F7F7F8" d="M21.5 18.5h51v70h-51z" />
        </g>
        <g filter="url(#prefix__filter1_d)">
          <path fill="#fff" d="M19 22h52v71H19z" />
          <path stroke="#F7F7F7" d="M19.5 22.5h51v70h-51z" />
        </g>
        <path
          d="M30.818 40.247v1a1 1 0 00.813-.418l-.813-.582zM36 33l.809-.588a1 1 0 00-1.622.006L36 33zm8 11l-.809.588a1 1 0 001.562.07L44 44zm7-8l.824-.566a1 1 0 00-1.577-.092L51 36zm5.5 8l-.824.566A1 1 0 0056.5 45v-1zm5 0l.524-.852A1 1 0 0061.5 43v1zm-39-2.753h8.318v-2H22.5v2zm9.131-.418l5.182-7.247-1.626-1.164-5.183 7.248 1.627 1.163zm3.56-7.24l8 11 1.618-1.177-8-11-1.618 1.176zm9.562 11.07l7-8-1.506-1.317-7 8 1.506 1.316zm5.423-8.093l5.5 8 1.648-1.133-5.5-8-1.648 1.133zM56.5 45h5v-2h-5v2zm4.476-.148l6.5 4 1.048-1.704-6.5-4-1.048 1.704z"
          fill={colorsMap.get(type)!}
        />
        <rect x={26} y={58} width={36} height={3} rx={1} fill="#D9D9D9" />
        <rect x={26} y={63} width={29} height={3} rx={1} fill="#D9D9D9" />
        <rect x={26} y={68} width={20} height={3} rx={1} fill="#D9D9D9" />
      </g>
      <defs>
        <filter
          id="prefix__filter0_d"
          x={17}
          y={12}
          width={60}
          height={79}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={-2} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter1_d"
          x={15}
          y={16}
          width={60}
          height={79}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={-2} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </>
  </Svg>
);
