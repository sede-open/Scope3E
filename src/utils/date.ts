import moment from 'moment';

export const max = (...dates: Date[]) =>
  moment.max(dates.map((x) => moment(x))).toDate();

export const addDays = (days: number) => (date: Date) =>
  moment(date).add(days, 'days').toDate();

export const addSeconds = (seconds: number) => (date: Date) =>
  moment(date).add(seconds, 'seconds').toDate();

export const addDay = addDays(1);

export const getCurrentYear = () => new Date().getFullYear();
export const getCurrentFormattedDate = (format: string = 'YYYY-MM-DD') =>
  moment().format(format);

export const getSecondsInNumberOfDays = (numDays: number) => {
  return 60 * 60 * 24 * numDays;
};
