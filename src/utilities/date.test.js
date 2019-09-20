import {
  formatDate,
  formatToISOString,
  ISOStringToLocaleDate,
  formatDateToLocaleDate,
  stringIsDate
} from './date';

describe('date utilities', () => {
  it("converts a string from backend", () => {
    expect(formatDate("2019-07-17T16:53:52Z")).toEqual("July 17, 2019")
  })

  it("converts a date string to a ISO string", () => {
    expect(formatToISOString("July 17, 2019")).toEqual("2019-07-17T07:00:00.000Z")
  })

  it("converts a string from backend to input expected format", () => {
    expect(ISOStringToLocaleDate("2019-07-17T16:53:52Z")).toEqual("2019-07-17")
  })

  it("converts a formatted date to input expected format", () => {
    expect(formatDateToLocaleDate("July 17, 2019")).toEqual("2019-07-17")
  })

  it("checks whether a string is a date", () => {
    expect(stringIsDate("July 17, 2019", "MMMM DD, YYYY")).toEqual(true)
    expect(stringIsDate("2019-01-01", "YYYY-MM-DD")).toEqual(true)
    expect(stringIsDate("300", "YYYY-MM-DD")).toEqual(false)
    expect(stringIsDate("2019-01-2300", "YYYY-MM-DD")).toEqual(false)
    expect(stringIsDate("2019012019", "YYYY-MM-DD")).toEqual(false)
    expect(stringIsDate("17th of December", "YYYY-MM-DD")).toEqual(false)
    expect(stringIsDate("123-456-7890", "YYYY-MM-DD")).toEqual(false)
  })
});