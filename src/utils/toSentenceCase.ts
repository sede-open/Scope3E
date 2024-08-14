export const toSentenceCase = (text: string) =>
  `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`.replace(
    '_',
    ' '
  );
