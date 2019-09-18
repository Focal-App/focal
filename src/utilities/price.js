export const convertPenniesToDollars = (pennies) => {
    if (pennies < 10) {
        return `0.0${pennies}`;
    } else if (pennies < 100) {
        return `0.${pennies}`;
    } else if (pennies >= 100) {
        let insertionIndex = pennies.toString().length - 2;
        let convertedMoney = pennies.toString().split("")
        convertedMoney.splice(insertionIndex, 0, '.')
        return convertedMoney.join("");
    }
}

export const convertDollarsToPennies = price => Math.trunc(price * 100);
