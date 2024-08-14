export const getTerms = jest.fn().mockReturnValue([1, 2, 3, 4]);
export const predictY = jest.fn();
export const read = jest.fn().mockReturnValue({
  getTerms,
  predictY,
});

export default {
  read,
  getTerms,
  predictY,
};
