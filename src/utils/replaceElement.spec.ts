import { replaceElement } from './replaceElement';

describe(replaceElement.name, () => {
  it('should replace the element at the index with the new value', () => {
    expect(replaceElement([1, 2, 3, 4, 5], 2, 100)).toEqual([1, 2, 100, 4, 5]);
  });

  it('should not change the original element', () => {
    const originalObject = [1, 2, 3, 4, 5];
    const newObject = replaceElement(originalObject, 2, 100);

    expect(newObject).not.toEqual(originalObject);
  });
});
