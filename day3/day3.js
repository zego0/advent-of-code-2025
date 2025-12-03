const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");

const lines = fs.readFileSync(inputPath, "utf8").trim().split(/\n/);

const part1 = () => {
  let joltage = 0;

  for (const line of lines) {
    let max = -1;
    let currentJoltage = 0;

    for (let i = 0; i < line.length; i++) {
      const num = Number(line[i]);

      if (max !== -1) {
        const candidate = max * 10 + num;

        if (candidate > currentJoltage) {
          currentJoltage = candidate;
        }
      }

      if (num > max) {
        max = num;
      }
    }

    joltage += currentJoltage;
  }

  console.log("part1:", joltage);
};

const part2 = () => {
  let joltage = 0;

  for (const line of lines) {
    let current = [];
    let allowedRemovals = line.length - 12;

    for (let i = 0; i < line.length; i++) {
      const currentNum = Number(line.charAt(i));
      while (current[current.length - 1] < currentNum && allowedRemovals > 0) {
        current = current.slice(0, -1);
        allowedRemovals -= 1;
      }

      current.push(currentNum);
    }

    current = current.slice(0, 12);
    joltage += Number(current.join(""));
  }

  console.log("part2:", joltage);
};

part1();
part2();
