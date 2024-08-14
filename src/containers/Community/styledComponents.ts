import styled from 'styled-components';
import { Gray, Supernova, Tundora, White, SilverChalice } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Card } from 'components/Card';

export const Wrapper = styled.div`
  padding-top: 3rem;
`;

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
  padding: 16px;
`;

export const Container = styled(Card)`
  float: left;
  position: relative;
  flex-direction: row;
  display: flex;
  width: 360px;
  height: 158px;
  background: ${White};
  margin: 0 20px 96px 0;
  padding: 8px 0 0 11px;
  :last-child {
    margin-right: -20px !important;
  }
  &:hover {
    border: 1px solid ${SilverChalice};
  }

  &:active {
    border: 1px solid ${Gray};
  }
`;

export const ReadMoreText = styled(Text).attrs({
  size: '14px',
  color: Tundora,
})`
  text-decoration: underline;
  line-height: 22px;

  :hover {
    color: ${Gray};
  }
`;

export const ReadMoreContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  width: 263px;
  margin-bottom: 14px;
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

export const CardIcon = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  background: ${Supernova};
`;
