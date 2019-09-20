import { parse, format } from 'date-fns';
var moment = require('moment');

export function formatDate(utc_datetime) {
  if (!utc_datetime.includes("Z")) {
    utc_datetime += "Z";
  }
  return format(parse(utc_datetime), 'MMMM DD, YYYY')
}

export const formatToISOString = date => {
  let entered_date = parse(date)
  return entered_date.toISOString();
}

export function ISOStringToLocaleDate(utc_datetime) {
  return format(parse(utc_datetime), 'YYYY-MM-DD')
}

export function formatDateToLocaleDate(date) {
  return format(parse(date), 'YYYY-MM-DD')
}

export function stringIsDate(date, format = "MMMM DD, YYYY") {
  return moment(date, format, true).isValid()
}
