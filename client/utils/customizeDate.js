export default (date) => {
  const day = date.getDate();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  return strTime;
};

export function parseISOString(ISOstring) {
  const date = new Date(ISOstring);
  const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  return newDate;
}
