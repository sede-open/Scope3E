import { Text } from 'components/Text';
import styled from 'styled-components';
import { FunGreen } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';

export const VideoSectionContainer = styled.section`
  text-align: start;
  padding: 52px 24px;

  @media ${device.tabletM} {
    padding: 62px 132px;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 32px;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  color: FunGreen,
  family: exampleBold,
  size: '1.625rem',
})`
  margin-bottom: 20px;
`;

export const DescriptionSection = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: auto;
  flex-direction: column;

  > div {
    flex: 1;
  }

  @media ${device.tabletS} {
    flex-direction: row;
  }
`;
