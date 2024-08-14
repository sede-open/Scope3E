import { sortObjectsByKey } from './sortObjectsByKey';

const objects = [
  {
    name: 'b-name',
    date: '2021-01-02',
  },
  {
    name: 'c-name',
    date: '2021-01-01',
  },
  {
    name: 'a-name',
    date: '2021-01-03',
  },
];

describe('sortObjectsByKey', () => {
  it('should sort objects by specified key (name)', () => {
    const result = objects.sort(sortObjectsByKey('name'));

    expect(result).toEqual([
      { name: 'a-name', date: '2021-01-03' },
      { name: 'b-name', date: '2021-01-02' },
      { name: 'c-name', date: '2021-01-01' },
    ]);
  });

  it('should sort objects by specified key (date) and direction (ASC)', () => {
    const result = objects.sort(sortObjectsByKey('date', 'ASC'));

    expect(result).toEqual([
      { name: 'c-name', date: '2021-01-01' },
      { name: 'b-name', date: '2021-01-02' },
      { name: 'a-name', date: '2021-01-03' },
    ]);
  });

  it('should sort objects by specified key (date) and direction (DESC)', () => {
    const result = objects.sort(sortObjectsByKey('date', 'DESC'));

    expect(result).toEqual([
      { name: 'a-name', date: '2021-01-03' },
      { name: 'b-name', date: '2021-01-02' },
      { name: 'c-name', date: '2021-01-01' },
    ]);
  });
});
