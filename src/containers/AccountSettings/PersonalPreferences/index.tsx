import { MailIcon } from 'components/Glyphs/MailIcon';
import { Mortarboard } from 'components/Glyphs/Mortarboard';
import { NameIcon } from 'components/Glyphs/NameIcon';
import { RoleIcon } from 'components/Glyphs/RoleIcon';
import Icon from 'components/Icon';
import { Link } from 'components/Link';
import Modal from 'components/Modal';
import { TagListState } from 'components/TagList';
import { TextBold, TextNormal } from 'components/Text';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useCombinedSolutionInterestsQuery } from 'queries/userOnboarding';
import { useEffect, useMemo, useState } from 'react';
import { abcdGray, Supernova } from 'styles/colours';
import { getRoleOptions, getRoleTypeFromRoles } from 'utils/roleHelpers';
import { getInitialSolutionInterestsState } from 'utils/userOnboarding';
import { EditSolutionInterests } from '../EditSolutionInterest';
import * as selectors from '../selectors';
import { EXPERTISE_DOMAIN } from '../utils';
import * as StyledComponents from './styledComponents';
import UserDetailsModalForm from './UserDetailsModalForm';

export const PersonalPreferences = () => {
  const { t } = useTranslation();

  const user = useAuthenticatedUser();
  const companyId = user.company?.id;

  if (!companyId) {
    return null;
  }
  const {
    data: combinedSolutionInterestsData,
    loading: isCombinedSolutionInterestsDataLoading,
  } = useCombinedSolutionInterestsQuery();

  const role = getRoleTypeFromRoles(
    user.roles.map((userRole) => userRole.name)
  );
  const roleDescription = getRoleOptions(t).find(
    (roleOption) => roleOption.value === role
  );

  const solutionInterests =
    combinedSolutionInterestsData?.solutionInterests || [];

  const [solutionInterestsState, updateSolutionInterestsState] = useState<
    TagListState
  >({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialSolutionInterestsState = useMemo(
    () =>
      getInitialSolutionInterestsState(
        combinedSolutionInterestsData?.solutionInterests || [],
        combinedSolutionInterestsData?.userSolutionInterests || []
      ),
    [combinedSolutionInterestsData]
  );

  useEffect(() => {
    if (isCombinedSolutionInterestsDataLoading) return;
    updateSolutionInterestsState(initialSolutionInterestsState);
  }, [initialSolutionInterestsState, isCombinedSolutionInterestsDataLoading]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <StyledComponents.UserDetailWrapper
        data-testid={selectors.personalPreferences}
      >
        <StyledComponents.HeaderContainer>
          <TextBold>
            {t('accountSettings:personal-preferences-about-you-header')}
          </TextBold>
          <StyledComponents.EditDetailsButton
            data-testid={selectors.editDetailsBtn}
            onClick={openModal}
          >
            <Icon src="/images/pen.svg" alt="pen" size={14} />
            <StyledComponents.EditDetailsText>
              {t('accountSettings:personal-preferences-edit-details')}
            </StyledComponents.EditDetailsText>
          </StyledComponents.EditDetailsButton>
        </StyledComponents.HeaderContainer>
        <StyledComponents.SubHeaderContainer>
          <TextNormal>
            <Trans
              components={[
                <Link
                  href={`mailto:${t('common:support-email')}`}
                  target="_blank"
                />,
              ]}
              i18nKey="accountSettings:personal-preferences-contact-us-sub-header"
            />
          </TextNormal>
        </StyledComponents.SubHeaderContainer>
        <StyledComponents.UserDetailContainer>
          <NameIcon />
          <StyledComponents.InformationContainer>
            <StyledComponents.IconHeadings>
              {t('accountSettings:your-name')}
            </StyledComponents.IconHeadings>
            <StyledComponents.IconContent data-testid={selectors.userName}>
              {`${user.firstName} ${user.lastName}`}
            </StyledComponents.IconContent>
          </StyledComponents.InformationContainer>

          <>
            <Mortarboard colour={user.expertiseDomain ? abcdGray : Supernova} />
            <StyledComponents.InformationContainer
              data-testid={selectors.domainExpertiseSection}
            >
              <StyledComponents.IconHeadings>
                {t('accountSettings:domain-expertise')}
              </StyledComponents.IconHeadings>
              {user.expertiseDomain ? (
                <StyledComponents.IconContent
                  data-testid={selectors.userDomainExpertise}
                >
                  {t(
                    `accountSettings:expertise-domain-option-type-${
                      EXPERTISE_DOMAIN[user.expertiseDomain]
                    }`
                  )}
                </StyledComponents.IconContent>
              ) : (
                <StyledComponents.IconAction
                  onClick={openModal}
                  data-testid={selectors.addDomainExpertiseBtn}
                >
                  {t('accountSettings:add')}
                </StyledComponents.IconAction>
              )}
            </StyledComponents.InformationContainer>
          </>

          <StyledComponents.MailIconContainer>
            <MailIcon />
          </StyledComponents.MailIconContainer>
          <StyledComponents.InformationContainer>
            <StyledComponents.IconHeadings>
              {t('accountSettings:your-email')}
            </StyledComponents.IconHeadings>
            <StyledComponents.IconContent data-testid={selectors.userEmail}>
              {user.email}
            </StyledComponents.IconContent>
          </StyledComponents.InformationContainer>
        </StyledComponents.UserDetailContainer>
        <StyledComponents.RowContainer>
          <RoleIcon />
          {roleDescription && (
            <StyledComponents.InformationContainer>
              <StyledComponents.IconHeadings>
                {t('accountSettings:role-type')}
              </StyledComponents.IconHeadings>
              <StyledComponents.IconContent
                data-testid={selectors.userRoleName}
              >
                {roleDescription.label} ({roleDescription?.meta})
              </StyledComponents.IconContent>
            </StyledComponents.InformationContainer>
          )}
        </StyledComponents.RowContainer>
      </StyledComponents.UserDetailWrapper>
      <StyledComponents.EditInterestWrapper>
        <StyledComponents.HeaderContainer>
          <TextBold>{t('accountSettings:areas-of-interest')}</TextBold>
        </StyledComponents.HeaderContainer>
        <StyledComponents.SubHeaderContainer>
          <TextNormal>
            {t('accountSettings:areas-of-interest-description')}
          </TextNormal>
        </StyledComponents.SubHeaderContainer>

        <StyledComponents.Columns>
          <EditSolutionInterests
            updateState={updateSolutionInterestsState}
            solutionInterests={solutionInterests}
            initialSolutionInterestsState={initialSolutionInterestsState}
            state={solutionInterestsState}
          />
        </StyledComponents.Columns>
      </StyledComponents.EditInterestWrapper>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserDetailsModalForm closeModal={closeModal} />
      </Modal>
    </>
  );
};
