import styled from 'styled-components';
import { device } from 'styles/variables';
import { Text } from 'components/Text';
import { Gray, Tundora } from 'styles/colours';
import { prop } from 'styled-tools';

export const CardsContainer = styled.div<{ $direction: string }>`
  display: flex;
  flex-direction: ${prop('$direction')};
  flex-wrap: wrap;
  justify-content: center;
`;

export const Card = styled.div`
  padding: 4px;

  @media ${device.mobileL} {
    padding: 8px;
  }

  @media ${device.tabletS} {
    padding: 8px;
  }
`;

export const Image = styled.img`
  width: 264px;
  height: 154px;
`;

export const TextContainer = styled.div`
  max-width: 160px;

  @media ${device.laptopS} {
    max-width: 234px;
  }
`;

export const LocationContainer = styled.div`
  margin: 8px 0 4px 0;

  @media ${device.laptopS} {
    margin: 16px 0 13px 0;
  }
`;

export const Location = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 17px;
  font-weight: bold;
`;

export const AddressContainer = styled.div`
  margin-bottom: 16px;
`;

export const Address = styled(Text).attrs({
  color: Gray,
  size: '12px',
})`
  line-height: 17px;

  @media ${device.tabletS} {
    font-size: 14px;
    line-height: 21px;
  }
`;
