import styled from 'styled-components';
import { Gray, White } from 'styles/colours';
import { device } from 'styles/variables';
import { Text } from 'components/Text';
import Button from 'components/Button';
import { exampleBold } from 'styles/fonts';

export const Container = styled.div`
  display: flex;
  flex-grow: inherit;
  flex-flow: column;
  justify-content: start;
  background-color: ${White};
  min-width: 60%;
  min-height: 400px;
`;

export const Header = styled.div`
  display: flex;
  margin: 12px 12px 48px 12px;
  min-height: 48px;

  @media ${device.tabletS} {
    margin: 24px 24px 96px 24px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 12px 12px 12px;

  @media ${device.tabletS} {
    margin: 0 24px 24px 24px;
  }
`;

export const BodyHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BodyLoginTitle = styled(Text).attrs({
  as: 'h1',
  family: exampleBold,
})`
  margin-bottom: 24px;
  font-size 24px;
  
  @media ${device.tabletS} {
    font-size 48px;
  }
`;

export const BodyLoginSubtitle = styled(Text).attrs({
  as: 'p',
})`
  margin-bottom: 64px;
  font-size: 12px;

  @media ${device.tabletS} {
    font-size: 18px;
  }
`;

export const BodyContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BodyNewToHubPrompt = styled(Text).attrs({
  size: '16px',
  as: 'p',
})`
  font-weight: bold;
`;

export const BodySignUp = styled.div`
  margin-bottom: 160px;
`;

export const LogoContainer = styled.img`
  width: 240px;

  @media ${device.tabletS} {
    width: 480px;
  }
`;

export const NavButton = styled(Button).attrs({ color: 'text-button' })`
  line-height: 26px;
  display: inline-block;
  :focus {
    color: ${Gray};
  }
`;
