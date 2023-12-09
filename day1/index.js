const readline = require("readline");
const fs = require("fs");

const readlineInterface = readline.createInterface({
    input: fs.createReadStream("day1/input"),
});

const numberMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
};

const reverseNumberMap = {
    eno: "1",
    owt: "2",
    eerht: "3",
    ruof: "4",
    evif: "5",
    xis: "6",
    neves: "7",
    thgie: "8",
    enin: "9",
};

let sum = 0;

readlineInterface.on("line", (line) => {
    const matchedNumberArray =
        line.match(/\d|one|two|three|four|five|six|seven|eight|nine/) || [];

    const firstNumber =
        numberMap[matchedNumberArray[0]] || matchedNumberArray[0];

    const reversedInputValue = line.split("").reverse().join("");

    const matchedReverseNumberArray =
        reversedInputValue.match(
            /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/
        ) || [];

    const lastNumber =
        reverseNumberMap[matchedReverseNumberArray[0]] ||
        matchedReverseNumberArray[0];

    const numberToAdd = parseInt(`${firstNumber}${lastNumber}`);

    sum += numberToAdd;
});

readlineInterface.on("close", () => {
    console.log(sum);
});
