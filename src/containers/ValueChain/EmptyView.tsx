import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CorporateEmissionType } from 'types/globalTypes';
import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import Button from 'components/Button';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  shouldDisplayControls: Boolean;
}

export const EmptyView = ({ shouldDisplayControls }: IProps) => {
  const { t } = useTranslation();

  const { openModal } = useModal();

  const onAddBaselineEmission = useCallback(() => {
    openModal({
      modalType: ModalType.EMISSION_PATH_SELECT,
      contentProps: {
        emissionType: CorporateEmissionType.BASELINE,
      },
    });
  }, []);

  return (
    <StyledComponents.ValueChainEmptyView
      data-testid={selectors.valueChainEmptyView}
    >
      <StyledComponents.EmptyViewTextContainer>
        <StyledComponents.EmptyViewHeading>
          {t('valueChain:value-chain-empty-heading')}
        </StyledComponents.EmptyViewHeading>
        <StyledComponents.EmptyViewText>
          {t('valueChain:value-chain-empty-text')}
        </StyledComponents.EmptyViewText>
        {shouldDisplayControls && (
          <StyledComponents.EmptyViewCtaContainer>
            <Button
              color="primary"
              data-testid={selectors.valueChainEmptyViewCTA}
              onClick={onAddBaselineEmission}
            >
              {t('valueChain:value-chain-empty-button')}
            </Button>
          </StyledComponents.EmptyViewCtaContainer>
        )}
      </StyledComponents.EmptyViewTextContainer>
    </StyledComponents.ValueChainEmptyView>
  );
};
