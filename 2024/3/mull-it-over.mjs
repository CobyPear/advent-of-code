import inputFileHelper from "../../utils/input-file-helper.js";

const sampleInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const sampleInput2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
const rawFile = inputFileHelper(process.argv[2]).trim();

const getMuls = (input) => {
  // get the muls (got some hits on the regex for part 2 :))
  const regexp = /((?<=(?:do\(\)|^)(?:[^d]|d(?!on't\(\)))*)(mul\(\d+,\d+\)))/g;
  const matches = input.match(regexp);

  if (matches?.length) {
    console.log(matches);
    // map over the muls and get the numbers,
    const results = matches
      .map((m) => {
        const matches = m.matchAll(/(?:\()(?<one>\d+)(?:,)(?<two>\d+)(?:\))/g);
        for (const match of matches) {
          console.log(match);
          const [, mul1, mul2, ...rest] = match;
          // multipy them
          return parseInt(mul1) * parseInt(mul2);
        }
      })
      .reduce((acc, cur) => {
        // add the results
        acc = acc + cur;
        return acc;
      }, 0);

    console.log(results);
  }
};

console.log(getMuls(rawFile));
