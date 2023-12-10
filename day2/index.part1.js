const readline = require("readline");
const fs = require("fs");

const readlineInterface = readline.createInterface({
    input: fs.createReadStream("day2/input.txt"),
});

const bagQuantity = {
    red: 12,
    green: 13,
    blue: 14,
};

let sum = 0;

readlineInterface.on("line", (line) => {
    const gameIdAndResults = line.split(":");
    const gameId = gameIdAndResults[0].split(" ")[1];
    const gameResults = gameIdAndResults[1].split(";");
    let isImpossible = false;

    gameResults.map((gameResult) => {
        const individualGameResults = gameResult.trim().split(",");

        individualGameResults.map((individualGameResult) => {
            // @ts-ignore
            const valueToTest = parseInt(individualGameResult.match(/[0-9]+/)[0]);

            if (
                (individualGameResult.includes("red") &&
                    valueToTest > bagQuantity.red) ||
                (individualGameResult.includes("green") &&
                    valueToTest > bagQuantity.green) ||
                (individualGameResult.includes("blue") &&
                    valueToTest > bagQuantity.blue)
            ) {
                isImpossible = true;
                return;
            }
        });

        if (isImpossible) {
            return;
        }
    });

    if (!isImpossible) {
        sum += parseInt(gameId);
    }
});

readlineInterface.on("close", () => {
    console.log(sum);
});
