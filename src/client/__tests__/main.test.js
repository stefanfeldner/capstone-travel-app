const { calcDaysBetweenDates } = require('../js/main');

describe("Testing Form Input Results", () => {
    test("Testing the days between two equal dates", () => {
        const firstDate = new Date();
        const secondDate = firstDate;
        expect(calcDaysBetweenDates(firstDate, secondDate)).toStrictEqual(0);
    });
});