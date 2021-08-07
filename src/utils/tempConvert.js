export const tempConvert = K => {
  const tempC = Number((K - 273.15).toFixed(0));
  const tempF = Number(((K * 9) / 5 - 459.67).toFixed(0));
  return {
    tempC: tempC + ' \xB0C',
    tempF: tempF + ' \xB0F',
    tempK: K,
  };
};
