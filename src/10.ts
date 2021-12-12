type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map((a) => a.trim()) as unknown as Chars[][];
}

type Chars = "(" | ")" | "[" | "]" | "{" | "}" | "<" | ">";

function scanLine(line: Chars[]) {
  const pairs = [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
  ] as const;

  const openings = pairs.map(([opening]) => opening);
  const closings = pairs.map(([_, closing]) => closing);
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    const symbol = line[i];
    if (openings.find((o) => o === symbol)) {
      stack.push(symbol);
      continue;
    }

    if (closings.find((c) => c === symbol)) {
      const expectedPairTo = stack.pop();
      const expected = pairs.find(
        ([opening]) => opening === expectedPairTo
      )![1];

      if (symbol !== expected) {
        return {
          valid: false,
          found: symbol as typeof closings[number],
          expected,
          stack,
        };
      }
    }
  }

  let toComplete = [] as typeof closings;
  if (stack.length) {
    toComplete = [...stack]
      .reverse()
      .map((a) => pairs.find(([opening]) => opening === a)![1]);
  }

  return { valid: true, toComplete };
}

export const solution = (input: Input) => {
  const scoreTable = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  } as const;

  const lines = parseInput(input);

  let score = 0;
  for (let line of lines) {
    const { valid, found } = scanLine(line);
    if (!valid && found) {
      score += scoreTable[found];
    }
  }

  return score;
};

export const solution2 = (input: Input) => {
  const scoreTable = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  } as const;

  const lines = parseInput(input);

  const scores = [] as number[];
  for (let line of lines) {
    const { valid, toComplete } = scanLine(line);

    if (!valid) continue;
    if (!toComplete) continue;

    let score = toComplete.reduce((acc, v) => {
      return acc * 5 + scoreTable[v];
    }, 0);

    scores.push(score);
  }

  // take the middle score
  return scores.sort((a, b) => a - b)[Math.round(scores.length / 2) - 1];
};
