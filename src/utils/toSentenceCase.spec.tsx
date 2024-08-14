import { toSentenceCase } from './toSentenceCase';

const testSentenceLowerCase = 'test sentence went to the test sentence';
const testSentenceUpperCase = 'TEST SENTENCE WENT TO THE TEST SENTENCE';
const testSentenceMixCase = 'TeSt SeNtEnCe WeNt To ThE tEsT sEnTeNcE';

const expectedSentence = 'Test sentence went to the test sentence';

describe('toSentenceCase', () => {
  it('should set string to sentence case when all characters are lowercase', () => {
    expect(toSentenceCase(testSentenceLowerCase)).toEqual(expectedSentence);
  });

  it('should set string to sentence case when all characters are uppercase', () => {
    expect(toSentenceCase(testSentenceUpperCase)).toEqual(expectedSentence);
  });

  it('should set string to sentence case when characters are mixed case', () => {
    expect(toSentenceCase(testSentenceMixCase)).toEqual(expectedSentence);
  });
});
