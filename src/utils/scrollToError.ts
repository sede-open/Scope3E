export const scrollToFieldError = (err: any) => {
  const elements = Object.keys(err)
    .map((name) => document.getElementsByName(name)[0])
    .filter((e) => !!e);
  elements.sort((a, b) => b.scrollHeight - a.scrollHeight);
  elements[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

export const scrollToElementId = (elementId: string) => {
  const element = document.getElementById(elementId);
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
