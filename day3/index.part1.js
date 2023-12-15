const fs = require("fs");
const path = require("path");

const inputFile = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const schematic = inputFile.split("\n").filter((a) => a);
const mappedSchematic = [];

let sum = 0;

function verifyPartNumber(partConfig) {
    const rowsToCheck = [
        partConfig.row,
        partConfig.row - 1,
        partConfig.row + 1,
    ];

    let isPartNumber = false;

    rowLoop: for (const row of rowsToCheck) {
        if (row === -1 || row > schematic.length - 1) {
            // Out of range so we can ignore these rows.
            continue;
        }

        let startIndex =
            partConfig.index === 0 ? partConfig.index : partConfig.index - 1;

        const endIndex =
            startIndex + partConfig.partNumber.length + 1 >=
            schematic[row].length
                ? schematic[row].length - 1
                : startIndex + partConfig.partNumber.length + 1;

        for (; startIndex <= endIndex; startIndex++) {
            if (schematic[row][startIndex].match(/[^\d\.]/)) {
                console.log(partConfig, startIndex, endIndex);
                isPartNumber = true;
                break rowLoop;
            }
        }
    }

    return isPartNumber;
}

for (let row = 0; row < schematic.length; row++) {
    for (const match of schematic[row].matchAll(/\d+/g)) {
        mappedSchematic.push({
            partNumber: match[0],
            row,
            index: match.index,
        });
    }
}

for (const partConfig of mappedSchematic) {
    const isPartNumber = verifyPartNumber(partConfig);

    if (isPartNumber) {
        sum += parseInt(partConfig.partNumber);
    }
}

console.log(sum);
