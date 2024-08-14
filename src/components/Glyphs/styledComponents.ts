import styled from 'styled-components';

interface SVGProps {
  height?: string;
}

export const Svg = styled.svg<SVGProps>`
  ${({ height }) => (height ? `height: ${height};` : 'auto')}
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;
`;

export const Mask = styled.mask`
  mask-type: alpha;
`;

export const Path = styled.path`
  transform: translate(14px, 16px);
`;

export const GlyphGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  row-gap: 20px;
  column-gap: 20px;
`;

export const GlyphContainer = styled.div`
  width: 200px;
  background-color: #f7eeec;
  > p {
    text-align: center;
  }
  > div:first-of-type {
    display: flex;
    justify-content: center;
  }
`;
