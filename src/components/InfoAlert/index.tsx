import { AlertIconBlue } from 'components/Glyphs/AlertIconBlue';
import * as StyledComponents from './styledComponents';

interface IProps {
  selectorPrefix?: string;
  title: string;
  paragraphs: { text: string; key: string }[];
}

export const InfoAlert = ({ selectorPrefix, title, paragraphs }: IProps) => {
  return (
    <StyledComponents.Alert>
      <StyledComponents.IconContainer>
        <AlertIconBlue title="Information icon" />
      </StyledComponents.IconContainer>
      <StyledComponents.TextContainer>
        <StyledComponents.AlertTitle
          data-testid={`${selectorPrefix}-alert-title`}
        >
          {title}
        </StyledComponents.AlertTitle>
        {paragraphs.map((paragraph) => (
          <StyledComponents.Paragraph
            key={paragraph.key}
            data-testid={`${selectorPrefix}-${paragraph.key}`}
          >
            {paragraph.text}
          </StyledComponents.Paragraph>
        ))}
      </StyledComponents.TextContainer>
    </StyledComponents.Alert>
  );
};
