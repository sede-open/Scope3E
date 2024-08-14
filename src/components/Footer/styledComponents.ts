import styled from 'styled-components';
import { Alto, Gray, Scorpion, Tundora } from 'styles/colours';
import { Text } from 'components/Text';
import Button from 'components/Button';
import { device } from 'styles/variables';

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  width: 1110px;
  max-width: 100%;
  padding: 24px 16px;
  margin: 0 auto;
  transition: all 150ms linear;
  border-top: 1px solid ${Alto};

  @media ${device.tabletS} {
    padding: 32px;
  }

  @media ${device.laptopS} {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: baseline;
    padding: 24px;
  }
`;

export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media ${device.laptopS} {
    margin-right: 60px;
  }
`;

export const Title = styled(Text).attrs({ as: 'h3', size: '16px' })<{
  isPublicRoute?: boolean;
}>`
  color: ${Tundora};
  font-weight: bold;
  margin-bottom: ${({ isPublicRoute }) => (isPublicRoute ? '8px' : '12px')};
  @media ${device.laptopS} {
    min-width: 170%;
  }

  @media ${device.laptopM} {
    min-width: 200%;
  }
`;

export const NavigationContainer = styled.div`
  margin-bottom: 24px;
  margin-right: 47px;
  @media ${device.laptopS} {
    margin-right: 0px;
  }
`;

export const ContactContainer = styled.div<{ isNavigationVisible?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  @media ${device.tabletS} {
    margin-left: ${({ isNavigationVisible }) =>
      isNavigationVisible ? '65px' : '0'};
  }
`;

export const LogoContainer = styled.div`
  margin: 37px 0;
  @media ${device.laptopS} {
    margin: 12px 0;
  }
`;

export const InfoContainer = styled.div`
  margin-bottom: 56px;
  display: grid;

  @media ${device.laptopS} {
    margin-right: -55px;
  }
`;

export const InfoText = styled(Text)`
  color: ${Scorpion};
  line-height: 20px;
  margin-bottom: 1rem;
  max-width: 343px;

  @media ${device.tabletS} {
    margin-bottom: 1.5rem;
    max-width: 473px;
  }
`;

export const FooterButton = styled(Button).attrs({
  color: 'text-button',
})<{ isPublicRoute?: boolean }>`
  margin: ${({ isPublicRoute }) =>
    isPublicRoute ? '8px 0px 3px 0px' : '0px 0px 3px 9px'};
}
  display: inline-block;
  :focus {
    color: ${Gray};
  }

  @media ${device.tabletS} {
    min-width: 170%;
  }

  @media ${device.laptopM} {
    min-width: 150%;
  }
`;

export const ColumnSpacer = styled.div`
  margin-right: 1rem;
`;

export const Container = styled(Button).attrs({
  color: 'text-button',
})<{ isPublicRoute?: boolean }>`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;

  @media ${device.mobileM} {
    width: 100%;
  }

  @media ${device.tabletS} {
    margin-bottom: ${({ isPublicRoute }) => (isPublicRoute ? '0px' : '10px')};
  }  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.mobileL} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const FooterContactUsContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`;

export const FooterContactUsButton = styled(Button).attrs({
  color: 'text-button',
})`
  margin: 8px 0px 3px 0px;

  display: inline-block;
  :focus {
    color: ${Gray};
  }
`;

export const BottomLanguageButton = styled(Button)`
  display: none;
  @media ${device.laptopS} {
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin-top: 43px;
    cursor: pointer;
    line-height: 26px;
    max-height: 48px;
    text-decoration: underline;
  }
`;
