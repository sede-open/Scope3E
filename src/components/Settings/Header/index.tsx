import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { BackButton } from 'components/BackButton';
import * as StyledComponents from './styledComponents';

interface SettingHeaderProps {
  backNavigationText: string;
  title: string;
  dataTestIdPrefix?: string;
}

export const SettingHeader = ({
  backNavigationText,
  title,
  dataTestIdPrefix,
}: SettingHeaderProps) => {
  return (
    <StyledComponents.StyledHeader>
      <BackButton
        dataTestIdPrefix={dataTestIdPrefix}
        backNavigationText={backNavigationText}
      />
      <StyledComponents.Title
        as="h2"
        size="1.5rem"
        family={exampleBold}
        color={Tundora}
      >
        {title}
      </StyledComponents.Title>
    </StyledComponents.StyledHeader>
  );
};
