const input =
  "655-1102,2949-4331,885300-1098691,1867-2844,20-43,4382100-4484893,781681037-781860439,647601-734894,2-16,180-238,195135887-195258082,47-64,4392-6414,6470-10044,345-600,5353503564-5353567532,124142-198665,1151882036-1151931750,6666551471-6666743820,207368-302426,5457772-5654349,72969293-73018196,71-109,46428150-46507525,15955-26536,65620-107801,1255-1813,427058-455196,333968-391876,482446-514820,45504-61820,36235767-36468253,23249929-23312800,5210718-5346163,648632326-648673051,116-173,752508-837824";

const ranges = input.split(",").map((range) => {
  const [start, end] = range.split("-");

  return { start, end };
});

function part1Validation(str) {
  if (str.length % 2 === 1) return;

  const firstHalf = str.slice(0, str.length / 2);
  const secondHalf = str.slice(str.length / 2, str.length);

  return firstHalf === secondHalf;
}

function part2Validation(n) {
  const s = String(n);

  return (s + s).slice(1, -1).includes(s);
}

function foo() {
  let part1 = 0;
  let part2 = 0;

  for (let i = 0; i < ranges.length; i++) {
    let start = Number(ranges[i].start);
    let end = Number(ranges[i].end);

    for (let j = start; j <= end; j++) {
      const str = String(j);

      if (part1Validation(str)) part1 += j;

      if (part2Validation(str)) part2 += j;
    }
  }

  return {part1, part2};
}

console.log(foo());
