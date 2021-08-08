import { Line } from 'react-chartjs-2';
import { Skeleton } from '@chakra-ui/skeleton';

import { unixConvert } from '../utils/unixConvert';
import { tempConvert } from '../utils/tempConvert';
import { dailyWeather } from '../api/weatherAPI';
import dailyDummy from '../dailyDummy.json';
import { useEffect, useState } from 'react';

const Chart = ({ target }) => {
  let date = [];
  let temp = [];
  const [daily, setDaily] = useState(null);

  useEffect(async () => {
    setDaily(await dailyWeather(target));
  }, [target]);
  console.log(daily);

  if (daily) {
    date = [];
    temp = [];
    daily.data.list.map(e => {
      date.push(unixConvert(e.dt, dailyDummy.data.city.timezone));
      temp.push(tempConvert(e.temp.day));
    });

    const data = {
      labels: date.map(e => e.localTime.split(' ').slice(0, 2).join(' ')),
      datasets: [
        {
          label: `temperature`,
          data: temp.map(e => e.tempK),
          fill: false,
          backgroundColor: 'salmon',
          borderColor: 'salmon',
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { display: false },
      },
      plugins: {
        title: { display: true, text: 'Future 7 Days of Weather' },
        tooltip: {
          callbacks: {
            label: v => {
              const temp = tempConvert(Number(v.raw));
              return `${temp.tempC} | ${temp.tempF} | ${temp.tempK}K`;
            },
          },
        },
      },
    };

    return <Line data={data} options={options} />;
  } else {
    return <Skeleton></Skeleton>;
  }
};

export default Chart;
