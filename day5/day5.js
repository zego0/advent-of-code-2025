const { randomBytes } = require("crypto");
const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim().split("\n");

const ranges = [];
const ingredients = [];

for (let i = 0; i < input.length; i++) {
  if (!input[i].includes("-")) {
    ingredients.push(input[i]);
    continue;
  }
  const [start, end] = input[i].split("-").map(Number);
  ranges.push({ start, end });
}

const part1 = () => {
  let availableIngredients = 0;

  for (const ingredient of ingredients) {
    for (const { start, end } of ranges) {
      if (ingredient <= end && ingredient >= start) {
        availableIngredients++;
        break;
      }
    }
  }

  return availableIngredients;
};

console.log("Part 1:", part1());

ranges.sort((a, b) => a.start - b.start);

const merged = [];
for (let range of ranges) {
  if (merged.length === 0) {
    merged.push({ ...range });
    continue;
  }

  let last = merged[merged.length - 1];

  if (range.start <= last.end + 1) {
    last.end = Math.max(last.end, range.end);
  } else {
    merged.push({ ...range });
  }
}

let total = 0;
for (const { start, end } of merged) {
  total += end - start + 1;
}

console.log("Part 2:", total);