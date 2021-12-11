import { difference, map } from "lodash";

type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map((i) =>
    i
      .trim()
      .split("|")
      .map((i) => i.trim().split(" "))
  ) as Array<[signalPatterns: Array<string>, outputValue: Array<string>]>;
}

export const solution = (input: Input) => {
  const configuration = parseInput(input)
    .map(([_, outputValue]) => outputValue)
    .flat()
    .filter((value) => [2, 3, 4, 7].includes(value.length));
  return configuration.length;
};

function getDifference(a: string, b: string) {
  const sortedA = [...a];
  const sortedB = [...b];

  const [inputA, inputB] =
    sortedA.length > sortedB.length ? [sortedA, sortedB] : [sortedB, sortedA];

  return difference(inputA, inputB);
}

export const solution2 = (input: Input) => {
  const configuration = parseInput(input);

  const mappings = configuration
    .flatMap(([signalPatterns, outputValue]) => [
      [...signalPatterns, ...outputValue],
    ])
    .map((a) =>
      a.reduce((acc, val, i, arr) => {
        const sortedValue = val.split("").sort().join("");
        if (!acc[sortedValue.length]) {
          acc[sortedValue.length] = [sortedValue];
          return acc;
        }

        if (!acc[sortedValue.length].includes(sortedValue)) {
          acc[sortedValue.length] = [...acc[sortedValue.length], sortedValue];
        }

        return acc;
      }, {} as Record<number, Array<string>>)
    )
    .map((a) => {
      const mapping = {} as Record<number, string>;
      // those are there only once (if we trust the correct input)
      const solution = {} as Record<string, number>;

      mapping[1] = a[2][0];
      solution[mapping[1]] = 1;
      mapping[4] = a[4][0];
      solution[mapping[4]] = 4;

      mapping[7] = a[3][0];
      solution[mapping[7]] = 7;

      mapping[8] = a[7][0];
      solution[mapping[8]] = 8;

      // 3
      for (let c of a[5]) {
        if (getDifference(c, mapping[1]).length === 3) {
          mapping[3] = c;
          solution[mapping[3]] = 3;
        }
      }

      // 9
      for (let c of a[6]) {
        if (getDifference(c, mapping[3]).length === 1) {
          mapping[9] = c;
          solution[mapping[9]] = 9;
        }
      }

      // 2
      for (let c of a[5]) {
        if (c.includes(getDifference(mapping[9], mapping[8])[0])) {
          mapping[2] = c;
          solution[mapping[2]] = 2;
        }
      }

      // 0
      for (let c of a[6]) {
        if (
          getDifference(c, mapping[7]).length === 3 &&
          !Object.values(mapping).includes(c)
        ) {
          mapping[0] = c;
          solution[mapping[0]] = 0;
        }
      }

      // 6
      for (let c of a[6]) {
        if (
          getDifference(c, mapping[8]).length === 1 &&
          !Object.values(mapping).includes(c)
        ) {
          mapping[6] = c;
          solution[mapping[6]] = 6;
        }
      }

      // 5
      for (let c of a[5]) {
        if (!Object.values(mapping).includes(c)) {
          mapping[5] = c;
          solution[mapping[5]] = 5;
        }
      }

      return solution;
    });

  return configuration.reduce((acc, [_, outputValue], index) => {
    const preparedOutput = parseInt(
      outputValue
        .map((a) => [...a].sort().join(""))
        .map((a) => mappings[index][a])
        .join(""),
      10
    );

    return acc + preparedOutput;
  }, 0);
};
