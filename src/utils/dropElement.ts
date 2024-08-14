export const dropElement = <T>(arr: T[], index: number) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1, arr.length),
];
