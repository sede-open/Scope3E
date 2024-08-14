import styled from 'styled-components';
import { Gray, Tundora, White, SilverChalice } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Card } from 'components/Card';

export const ModuleTitle = styled(Text).attrs({
  as: 'h2',
  family: exampleBold,
  color: Tundora,
  size: '24px',
})`
  line-height: 28px;
  margin-bottom: 24px;
`;

export const TextWrapper = styled.div`
  padding: 24px;
`;

export const Image = styled.div<{
  src: string;
}>`
  background-color: transparent;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  width: 100%;
  height: 100%;
  transition: 0.5s ease-out;
`;

export const Container = styled(Card)`
  float: left;
  position: relative;
  width: 360px;
  height: 411px;
  background: ${White};
  margin: 0 20px 24px 0;
  :last-child {
    margin-right: -20px !important;
  }
  &:hover {
    ${Image} {
      transform: scale(1.05);
    }
    border: 1px solid ${SilverChalice};
  }

  &:active {
    border: 1px solid ${Gray};
  }
`;

export const ExploreMoreText = styled(Text).attrs({
  size: '14px',
  color: Tundora,
})`
  text-decoration: underline;
  line-height: 22px;

  :hover {
    color: ${Gray};
  }
`;

export const ExploreMoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  top: 365px;
  position: absolute;
`;

export const TitleText = styled(Text).attrs({
  as: 'h2',
  family: exampleBold,
  color: Tundora,
  size: '24px',
})`
  line-height: 28px;
  margin-bottom: 8px;
`;

export const SubTitleText = styled(Text).attrs({
  as: 'h4',
  color: Tundora,
})`
  font-weight: normal;
  line-height: 20px;
  width: 320px;
  margin-bottom: 57px;
`;

export const NewTabIcon = styled.img`
  display: block;
  width: 19px;
  height: 19px;
  margin-right: 6px;
  object-fit: contain;
`;

export const Link = styled.a`
  background: transparent;
  border: none;
  display: block;
  padding: 0;
  outline: none;
  text-decoration: none;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  height: 201px;
`;
