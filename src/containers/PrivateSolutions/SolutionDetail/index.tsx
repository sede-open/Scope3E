import NextLink from 'next/link';
import { DetailContentBlock } from 'components/PrivateSolutions/DetailContentBlock';
import { SolutionDetailContainer } from 'components/PrivateSolutions/SolutionDetailContainer';
import useTranslation from 'next-translate/useTranslation';
import { Link } from 'components/Link';

import { TComponents } from 'components/PrivateSolutions/DetailContentBlock/types';
import { Solutions } from '../types';

interface IProps {
  solutionId: Solutions;
}

export const SolutionDetail = ({ solutionId }: IProps) => {
  const { t } = useTranslation();

  const hasToolTip = ![
    Solutions.SUSTAINABLE_AVIATION,
    Solutions.VESSELS_SOFTWARE,
  ].includes(solutionId);

  const components: TComponents = {
    strong: <strong />,
  };

  if (Solutions.REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS === solutionId) {
    components.link = (
      <NextLink
        href={`/solutions/${Solutions.CO2_FLEET_EMISSION_COMPENSATION}`}
      >
        <Link
          href={`/solutions/${Solutions.CO2_FLEET_EMISSION_COMPENSATION}`}
        />
      </NextLink>
    );
    components.externalLink = (
      <Link
        href={t(
          `solutionDetail:${Solutions.REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS}-external-link`
        )}
        target="_blank"
      />
    );
  }

  return (
    <SolutionDetailContainer
      hasToolTip={hasToolTip}
      solutionId={solutionId}
      solutionDetail={
        <DetailContentBlock
          contentItems={t(
            `solutionDetail:${solutionId}-content-blocks`,
            {},
            { returnObjects: true }
          )}
          solutionId={solutionId}
          components={components}
        />
      }
    />
  );
};
