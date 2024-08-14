import styled from 'styled-components';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Alto, Gray, SilverChalice, Tundora, White } from 'styles/colours';

export const Wrapper = styled.div`
  position: relative;
  width: 356px;
  height: 420px;
  background: ${White};
  overflow: visible;
`;

export const TextContainer = styled.div`
  padding: 24px 20px;
`;

export const Title = styled(Text).attrs({
  family: exampleBold,
  size: '24px',
  color: Tundora,
  as: 'h2',
})`
  line-height: 28px;
  margin-bottom: 8px;
`;

export const Subtext = styled(Text).attrs({
  size: '16px',
  color: Tundora,
})`
  line-height: 24px;
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

export const HoverContainer = styled.div`
  overflow: hidden;
  height: 210px;
`;

export const ButtonAnchor = styled.a`
  background: transparent;
  border: none;
  display: block;
  padding: 0;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid ${Alto};
  height: 100%;

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
