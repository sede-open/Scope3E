import Icon from 'components/Icon';
import useTranslation from 'next-translate/useTranslation';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import * as StyledComponents from './styledComponents';

type Props = {
  reverse?: boolean;
  iconUrl?: string;
  title: string;
  desc: string;
  community?: boolean;
  laptopImgSource: StaticImageData;
};
export const Feature = ({
  reverse = false,
  iconUrl,
  title,
  desc,
  community,
  laptopImgSource,
}: Props) => {
  const { t } = useTranslation('publicFeatures');

  const icon = iconUrl ? <Icon src={iconUrl} alt="icon" size={124} /> : null;
  return (
    <StyledComponents.Feature>
      <StyledComponents.FeatureBackground $reverse={reverse}>
        {reverse && (
          <StyledComponents.ImageContainer>
            <StyledComponents.ImageBlock>
              <StyledComponents.LaptopImg src={laptopImgSource} alt="laptop" />
            </StyledComponents.ImageBlock>
            <StyledComponents.LaptopIconRight>
              {icon}
            </StyledComponents.LaptopIconRight>
          </StyledComponents.ImageContainer>
        )}

        <StyledComponents.FeatureTextContainer
          $maxWidth={community ? 500 : 392}
        >
          <StyledComponents.FeatureTitle>{title}</StyledComponents.FeatureTitle>
          <StyledComponents.FeatureDesc>{desc}</StyledComponents.FeatureDesc>
          {community && (
            <Link href="/join-us" passHref>
              <StyledComponents.JoinUsButton>
                {t('joinUs')}
              </StyledComponents.JoinUsButton>
            </Link>
          )}
        </StyledComponents.FeatureTextContainer>

        {!reverse && (
          <StyledComponents.ImageContainerRight>
            <StyledComponents.LaptopIconLeft>
              {icon}
            </StyledComponents.LaptopIconLeft>
            <StyledComponents.ImageBlock>
              <StyledComponents.LaptopImg src={laptopImgSource} alt="laptop" />
            </StyledComponents.ImageBlock>
          </StyledComponents.ImageContainerRight>
        )}
      </StyledComponents.FeatureBackground>
    </StyledComponents.Feature>
  );
};
