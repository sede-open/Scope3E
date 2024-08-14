import { Svg } from '.';

export const SupplierIcon = ({ dataTestId }: { dataTestId?: string }) => {
  return (
    <Svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      dataTestId={dataTestId}
    >
      <rect width="56" height="56" fill="#0097BB" />
      <path
        d="M23 18V20H25V22H27V38H18V22H20V20H22V18H23ZM34 26C36.2091 26 38 27.7909 38 30C38 31.8636 36.7256 33.4295 35.0008 33.8738L35 38H33L33.0002 33.874C31.2749 33.4301 30 31.8639 30 30C30 27.7909 31.7909 26 34 26ZM25 24H20V36H25V24ZM24 32V34H21V32H24ZM34 28C32.8954 28 32 28.8954 32 30C32 30.7403 32.4022 31.3866 32.9999 31.7324L33 30H35L35.0011 31.7318C35.5983 31.3858 36 30.7398 36 30C36 28.8954 35.1046 28 34 28ZM24 29V31H21V29H24ZM24 26V28H21V26H24Z"
        fill="white"
      />
    </Svg>
  );
};
