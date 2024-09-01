export const roundTo = (value: number, places: number): number => {
  const factor = Math.pow(10, places);
  return Math.round(value * factor) / factor;
};
