const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim().split("\n");

const neighbors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const part1 = (input) => {
  let paperCount = 0;
  let coordinates = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === ".") {
        continue;
      }

      let count = 0;

      for (const [dx, dy] of neighbors) {
        const x = i + dx;
        const y = j + dy;

        if (x < 0 || x >= input.length || y < 0 || y >= input[i].length) {
          continue;
        }

        if (input[x][y] === "@") {
          count++;
        }
      }

      if (count < 4) {
        paperCount++;
        coordinates.push([i, j]);
      }
    }
  }

  for (const [x, y] of coordinates) {
    input[x] = input[x].slice(0, y) + "." + input[x].slice(y + 1);
  }

  return { paperCount, input };
};

let { paperCount, input: updatedInput } = part1(input);
let sum = paperCount;

console.log("Part 1:", paperCount);

while (paperCount > 0) {
  const result = part1(updatedInput);
  paperCount = result.paperCount;
  updatedInput = result.input;
  sum += paperCount;
}

console.log("Part 2:", sum);

