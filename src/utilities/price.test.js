import { convertPenniesToDollars, convertDollarsToPennies } from './price';

describe('Price Formatting', () => {
    it('formats price from pennies to dollar value', () => {
        expect(convertPenniesToDollars(1)).toEqual("0.01");
        expect(convertPenniesToDollars(2)).toEqual("0.02");
        expect(convertPenniesToDollars(10)).toEqual("0.10");
        expect(convertPenniesToDollars(100)).toEqual("1.00");
        expect(convertPenniesToDollars(200)).toEqual("2.00");
        expect(convertPenniesToDollars(999)).toEqual("9.99");
        expect(convertPenniesToDollars(1000)).toEqual("10.00");
        expect(convertPenniesToDollars(10000)).toEqual("100.00");
        expect(convertPenniesToDollars(100000)).toEqual("1000.00");
    })

    it('convert dollars to pennies', () => {
        expect(convertDollarsToPennies(0.01)).toEqual(1);
        expect(convertDollarsToPennies(0.10)).toEqual(10);
        expect(convertDollarsToPennies(1)).toEqual(100);
        expect(convertDollarsToPennies(2)).toEqual(200);
        expect(convertDollarsToPennies(10)).toEqual(1000);
        expect(convertDollarsToPennies(500)).toEqual(50000);
    })
})

