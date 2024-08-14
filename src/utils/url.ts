export const toQueryString = (params: { [key: string]: any }) =>
  `?${Object.keys(params)
    .filter((key) => Boolean(params[key]))
    .map((key) => `${key}=${params[key].toString()}`)
    .join('&')}`;

export const isexampleDomain = (url: string) => {
  const matches =
    url.match(
      /(https?:\/\/(.+?\.)?example\.com?(.uk)?(\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?)/
    ) || [];

  return matches.length > 0;
};
