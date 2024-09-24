// convert unix timestamp to date
export function convertToDate(time) {
  let unix_timestamp = time;
  let fullDate = new Date(unix_timestamp * 1000);
  let date = fullDate.getDate();
  let month = fullDate.getMonth() + 1;
  let year = fullDate.getFullYear();

  return date + '.' + month + '.' + year;
}
