type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map((a) => a.trim().split(""));
}

function getLowPoint(x: number, y: number, map: string[][]) {
  const neighbors = [];
  const thisNumber = map[y][x];

  if (y < map.length - 1) neighbors.push(map[y + 1][x]);
  if (x < map[0].length - 1) neighbors.push(map[y][x + 1]);
  if (y > 0) neighbors.push(map[y - 1][x]);
  if (x > 0) neighbors.push(map[y][x - 1]);

  return {
    isLowPoint: neighbors.every((n) => n > thisNumber),
    riskLevel: Number(thisNumber) + 1,
  };
}

export const solution = (input: Input, advanced = false) => {
  const map = parseInput(input);

  const listOfLowPoints = [];
  let riskSum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const { isLowPoint, riskLevel } = getLowPoint(x, y, map);
      if (isLowPoint) {
        listOfLowPoints.push([x, y]);
        riskSum += riskLevel;
      }
    }
  }

  return { listOfLowPoints, riskSum };
};

function getSizeOfBasin(x: number, y: number, map: string[][]) {
  const visited = new Map();
  let size = 0;

  const traverseBasin = (x: number, y: number, map: string[][]) => {
    const key = `${x}${y}`;

    if (visited.has(key)) {
      return;
    }

    visited.set(key, true);
    const thisNumber = Number(map[y][x]);

    if (thisNumber === 9) {
      return;
    }

    size++;

    if (y < map.length - 1) traverseBasin(x, y + 1, map);
    if (x < map[0].length - 1) traverseBasin(x + 1, y, map);
    if (y > 0) traverseBasin(x, y - 1, map);
    if (x > 0) traverseBasin(x - 1, y, map);

    return size;
  };

  traverseBasin(x, y, map);

  return size;
}

export const solution2 = (input: Input) => {
  const map = parseInput(input);

  const { listOfLowPoints } = solution(input);

  const sizeOfBasins = listOfLowPoints.map(([x, y]) =>
    getSizeOfBasin(x, y, map)
  );

  return sizeOfBasins
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((acc, v) => acc * v);
};
