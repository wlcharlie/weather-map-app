import moment from 'moment';

export const unixConvert = (unix, timezone) => {
  const userTime = moment.unix(unix).format('MMM DD HH Z');
  const utcTime = moment.unix(unix).utc().format('MMM DD HH Z');
  const localTime = moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format('MMM DD HH Z');

  return { userTime, utcTime, localTime };
};
