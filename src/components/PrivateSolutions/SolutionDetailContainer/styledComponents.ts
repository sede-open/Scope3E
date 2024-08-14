import styled from 'styled-components';

import { abcdGray, Scorpion, Supernova, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';
import Button from 'components/Button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 36px;
`;

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 22px;
`;

export const TitleContainer = styled.div`
  max-width: 504px;
  margin-right: 70px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 0.5rem;
`;

export const BackButton = styled(Button).attrs({
  color: 'text-button',
})`
  margin-right: auto;
`;

export const Divider = styled.div`
  width: 44px;
  padding: 2px 0;
  margin: 72px 0 32px 0;
  background-color: ${Supernova};
`;

export const DetailContainer = styled.div`
  max-width: 648px;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '32px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 40px;
`;

export const Subtext = styled(Text).attrs({
  size: '16px',
  color: Tundora,
})`
  line-height: 24px;
  margin: 24px 0 97px 0;
`;

export const Image = styled.img`
  background-color: transparent;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  width: 552px;
  height: 310px;
  transition: 0.5s ease-out;
`;

export const ColumnLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
`;

export const SolutionGridWrapper = styled.div<{ background?: string }>`
  background-color: ${abcdGray};
  position: relative;
  margin: 78px -184px 0 -184px;
  padding: 96px 184px 0 184px;
`;

export const Disclaimer = styled(Text)`
  color: ${Scorpion};
  font-size: 14px;
  font-style: italic;
  line-height: 20px;
  padding-top: 24px;
`;
