import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from './styledComponents';

interface IProps {
  max: number;
  value: number;
}
const CharacterCounter = ({ max, value }: IProps) => {
  const { t } = useTranslation();
  return (
    <StyledComponents.StyledCharacters
      valid={!value || value !== max}
      data-testid="character-counter"
    >
      {value ? max - value : max} {t('common:character-counter')}
    </StyledComponents.StyledCharacters>
  );
};

export default CharacterCounter;
