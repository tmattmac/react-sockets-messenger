import { utcToZonedTime, format } from 'date-fns-tz';

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const formatTime = (date) => {
  const offsetDate = utcToZonedTime(date, timeZone);
  const formatString = 'HH:mm';
  return format(offsetDate, formatString);
}

export default formatTime;