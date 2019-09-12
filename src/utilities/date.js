const parse = require('date-fns/parse');
const format = require('date-fns/format');

export function formatDate(utc_datetime) {
  if (!utc_datetime.includes("Z")) {
    utc_datetime += "Z";
  }
  return format(parse(utc_datetime), 'MMMM DD, YYYY')
}