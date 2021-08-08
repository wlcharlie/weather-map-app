import axios from 'axios';

export const currentWeather = async ({ lat, lng }) => {
  const options_CURRENT = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
      lat: lat,
      lon: lng,
      units: '"metric" or "imperial"',
    },
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API,
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    },
  };

  const data = await axios.request(options_CURRENT);
  return data;
};

export const dailyWeather = async ({ lat, lng }) => {
  const options_DAILY = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
    params: {
      lat: lat,
      lon: lng,
      cnt: '7',
      units: 'metric or imperial',
    },
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API,
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    },
  };

  const data = await axios.request(options_DAILY);
  return data;
};
