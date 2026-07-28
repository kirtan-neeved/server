export const isEmptyString = (str: string): boolean => {
  return typeof str !== "string" || str.trim() === "";
};
