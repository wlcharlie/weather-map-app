import { withTheme } from '@emotion/react';
import { Line } from 'react-chartjs-2';

import { unixConvert } from '../utils/unixConvert';
import { tempConvert } from '../utils/tempConvert';
import dailyDummy from '../dailyDummy.json';

const date = [];
const temp = [];

dailyDummy.data.list.map(e => {
  date.push(unixConvert(e.dt));
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

const Chart = () => {
  console.log(temp);
  return <Line data={data} options={options}></Line>;
};

export default Chart;
