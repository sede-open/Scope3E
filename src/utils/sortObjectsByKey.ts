import get from 'lodash/get';

export const sortObjectsByKey = (
  path: string,
  direction: 'ASC' | 'DESC' = 'ASC'
) => (a: { [key: string]: any }, b: { [key: string]: any }) => {
  const attributeA = get(a, path);
  const attributeB = get(b, path);
  if (attributeA > attributeB) {
    return direction === 'ASC' ? 1 : -1;
  }
  if (attributeA < attributeB) {
    return direction === 'ASC' ? -1 : 1;
  }
  return 0;
};
