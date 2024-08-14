import styled from 'styled-components';
import { Alto, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const Section = styled.div`
  margin-inline: auto;
  width: min(90%, 1168px);
  margin-top: 96px;
  margin-bottom: 96px;
`;

export const BottomSection = styled(Section)`
  margin-top: 112px;
  margin-bottom: 112px;
`;

export const TopSection = styled(Section)`
  padding-top: 108px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const Section1Container = styled.div`
  display: flex;
`;

export const Header = styled.div`
  margin-top: 72px;
  flex: 50%;
`;
export const IconContainer = styled.div`
  flex: 50%;
`;

export const BannerIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export const CenterContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;
export const BannerIcon2 = styled.img`
  margin-top: 128px;
  height: 144px;
  width: 256px;
`;

const Text = styled.div`
  color: ${Tundora};
`;

const Title = styled(Text)`
  font-family: ${exampleBold};
  font-weight: 700;
`;

export const Section1Title = styled(Title)`
  margin-top: 16px;
  font-size: 2rem;
`;

export const SectionTitle = styled(Title)`
  font-size: 1.5rem;
`;

export const SubTitle = styled(Text)`
  margin-top: 24px;
  font-size: 1rem;
  width: min(100%, 416px);
`;

export const SectionContentContainer = styled.div`
  width: min(100%, 740px);
`;

export const Section2SubHeading = styled(Text)`
  margin-top: 24px;
  font-weight: 700;
`;

export const UnorderedList = styled.ul`
  margin-top: 16px;
  margin-left: 16px;
  list-style-type: disc;
  > li:first-child {
    margin-top: 0px;
  }
  > li {
    margin-top: 8px;
  }
  margin-bottom: 24px;
  color: ${Tundora};
`;

export const SectionSubHeading = styled(Text)<{ fontSize: string }>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 700;
`;

export const GifContainer = styled.div`
  > div:first-child {
    margin-top: 0px;
  }
  > div {
    margin-top: 96px;
  }
`;

export const Gif = styled.img`
  width: 744px;
  border: 1px solid ${Alto};
`;

export const GifText = styled(Text)`
  margin-top: 16px;
  margin-bottom: 24px;
`;

interface SpacerProps {
  pixels: number;
}

export const Spacing = styled.div<SpacerProps>`
  margin-top: ${({ pixels }) => `${pixels}px`};
`;

export const FlexContainer = styled.div`
  display: flex;
`;
