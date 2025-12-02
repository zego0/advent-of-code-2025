const fs = require("fs");
const path = require("path");
const readline = require("readline");

const inputPath = path.join(__dirname, "input.txt");

const rl = readline.createInterface({
  input: fs.createReadStream(inputPath, "utf8"),
  crlfDelay: Infinity,
});

let pos = 50;

let part1 = 0;
let part2 = 0;

rl.on("line", (line) => {
  const direction = line.charAt(0);
  const value = Number(line.slice(1));

  let crossings = 0;

  switch (direction) {
    case "R": {
      let firstHit = (100 - pos) % 100;

      if (firstHit === 0 && value > 0) {
        crossings = Math.floor(value / 100);
      } else if (firstHit > value) {
        crossings = 0;
      } else {
        crossings = 1 + Math.floor((value - firstHit) / 100);
      }

      pos = (pos + value) % 100;
      break;
    }

    case "L": {
      let firstHit = pos % 100;

      if (firstHit === 0 && value > 0) {
        crossings = Math.floor(value / 100);
      } else if (firstHit > value) {
        crossings = 0;
      } else {
        crossings = 1 + Math.floor((value - firstHit) / 100);
      }

      pos = (pos - (value % 100) + 100) % 100;
      break;
    }
  }

  part2 += crossings;

  if (pos === 0) {
    part1++;
  }
});

rl.on("close", () => {
  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
});
