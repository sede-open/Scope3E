export const replaceElement = <T>(arr: T[], index: number, replacement: T) => [
  ...arr.slice(0, index),
  replacement,
  ...arr.slice(index + 1, arr.length),
];
