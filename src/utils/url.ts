export const isAbsoluteUrl = (url: string) => {
  return /^(?:[a-z]+:)?\/\//i.test(url);
};
