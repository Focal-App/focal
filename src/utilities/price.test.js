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
        expect(convertPenniesToDollars(555555)).toEqual("5,555.55");
        expect(convertPenniesToDollars(80000000)).toEqual("800,000.00");
        expect(convertPenniesToDollars(99999999999)).toEqual("999,999,999.99");
        expect(convertPenniesToDollars(10402060900025)).toEqual("104,020,609,000.25");
    })

    it('convert dollars to pennies', () => {
        expect(convertDollarsToPennies(0.01)).toEqual(1);
        expect(convertDollarsToPennies(0.10)).toEqual(10);
        expect(convertDollarsToPennies(1)).toEqual(100);
        expect(convertDollarsToPennies(2)).toEqual(200);
        expect(convertDollarsToPennies(10)).toEqual(1000);
        expect(convertDollarsToPennies(500)).toEqual(50000);
        expect(convertDollarsToPennies(70000)).toEqual(7000000);
        expect(convertDollarsToPennies(30000000)).toEqual(3000000000);
        expect(convertDollarsToPennies(99999.69)).toEqual(9999969);
        expect(convertDollarsToPennies(9999999999.99)).toEqual(999999999999);
    })
})

