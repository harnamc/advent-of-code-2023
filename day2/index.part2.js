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
    const colourMap = {
        red: 1,
        green: 1,
        blue: 1,
    };

    gameResults.map((gameResult) => {
        const individualGameResults = gameResult.trim().split(",");

        individualGameResults.map((individualGameResult) => {
            const valueToTest = parseInt(
                // @ts-ignore
                individualGameResult.match(/[0-9]+/)[0]
            );

            if (
                individualGameResult.includes("red") &&
                valueToTest > colourMap.red
            ) {
                colourMap.red = valueToTest;
            }

            if (
                individualGameResult.includes("green") &&
                valueToTest > colourMap.green
            ) {
                colourMap.green = valueToTest;
            }

            if (
                individualGameResult.includes("blue") &&
                valueToTest > colourMap.blue
            ) {
                colourMap.blue = valueToTest;
            }
        });
    });

    sum += colourMap.red * colourMap.green * colourMap.blue;
});

readlineInterface.on("close", () => {
    console.log(sum);
});
