import axios from 'axios';

export const currentWeather = async () => {
  const options_CURRENT = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
      lat: '55',
      lon: '38',
      units: '"metric" or "imperial"',
    },
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API,
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    },
  };

  const data = await axios.request(options_CURRENT);
  console.log(data);
};

export const dailyWeather = async () => {
  const options_DAILY = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
    params: {
      lat: '55',
      lon: '38',
      cnt: '7',
      units: 'metric or imperial',
    },
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API,
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    },
  };

  const data = await axios.request(options_DAILY);
  console.log(data);
};
