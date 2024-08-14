import { truncate } from './truncate';

const mockStringOne =
  'Silence, Earthling! My Name Is Darth Vader. I Am An Extraterrestrial From The Planet Vulcan!';
const expectedStringOne =
  'Silence, Earthling! My Name Is Darth Vader. I Am A...';

const mockStringTwo =
  'Wait A Minute, Doc. Are You Telling Me You Built A Time Machine...Out Of A DeLorean?';
const expectedStringTwo =
  'Wait A Minute, Doc. Are You Telling Me You Built A...';

const mockStringThree = 'Roads? Where We’re Going, We Don’t Need Roads.';
const mockStringFour = 'Nobody Calls Me Chicken.';

describe('truncate', () => {
  it('should truncate string greater than 55 characters', () => {
    expect(truncate(mockStringOne)).toEqual(expectedStringOne);
    expect(truncate(mockStringTwo)).toEqual(expectedStringTwo);
  });

  it('should not truncate string less than 55', () => {
    expect(truncate(mockStringThree)).toEqual(mockStringThree);
    expect(truncate(mockStringFour)).toEqual(mockStringFour);
  });
});
