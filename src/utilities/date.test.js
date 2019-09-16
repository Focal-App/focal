import {
  formatDate,
} from './date';

describe('date formatter', () => {
  test("converts a string from backend", () => {
    expect(formatDate("2019-07-17T16:53:52Z")).toEqual("July 17, 2019")
  })
});