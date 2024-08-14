import { isexampleDomain } from './url';

describe('isexampleDomain', () => {
  it.each`
    url                                               | expected
    ${'http://example.com'}                             | ${true}
    ${'https://example.com'}                            | ${true}
    ${'https://www.example.com/some-article'}           | ${true}
    ${'https://subdomain.example.com'}                  | ${true}
    ${'http://example.com'}                            | ${false}
    ${'https://example.co.uk'}                          | ${true}
    ${'https://example.co.uk/some-article'}             | ${true}
    ${'https://subdomain.example.co.uk'}                | ${true}
    ${'https://www.mobil.com/some-article'}           | ${false}
    ${'https://www.mobil.com/some-example.com-article'} | ${false}
  `(
    'should return $expected for url $url',
    ({ url, expected }: { url: string; expected: boolean }) => {
      expect(isexampleDomain(url)).toBe(expected);
    }
  );
});
