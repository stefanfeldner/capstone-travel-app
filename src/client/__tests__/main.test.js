// const handleEvent = require('../js/main');
const { calcDaysBetweenDates } = require('../js/main');

// input - expected output - assert the result.

describe("Testing Form Input Results", () => {
    test("Testing the days between two equal dates", () => {
        const firstDate = '2020-08-03';
        const secondDate = '2020-08-03';
        expect(calcDaysBetweenDates(firstDate, secondDate)).toStrictEqual([0, 0]);
    });
});