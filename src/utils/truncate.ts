export const truncate = (str: string) =>
  str.length > 55 ? `${str.substring(0, 50)}...` : str;
