import { isMailToString } from './isMailToString';

describe('isMailToString', () => {
  it.each`
    url                                                                                                                                                                           | expected
    ${'mailto:support@example.com?subject=Customer%20queries%20and%20support&body=First%20Name%3A%0D%0A%0D%0A%0D%0ALast%20Name%3A%0D%0A%0D%0A%0D%0AEnquire%20About%3A'} | ${true}
    ${'https://www.mobil.com/some-article'}                                                                                                                                       | ${false}
  `(
    'should return $expected for url $url',
    ({ url, expected }: { url: string; expected: boolean }) => {
      expect(isMailToString(url)).toBe(expected);
    }
  );
});
