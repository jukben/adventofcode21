type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map((a) => a.trim().split("").map(Number));
}

function flash(
  x: number,
  y: number,
  map: number[][],
  flashed: Map<string, boolean>
) {
  function incrementOctopus(x: number, y: number, map: number[][]) {
    if (!flashed.get(`${x}${y}`)) map[y][x]++;
  }

  // This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent.
  if (y < map.length - 1) {
    incrementOctopus(x, y + 1, map);
  }

  if (x < map[0].length - 1) {
    incrementOctopus(x + 1, y, map);
  }

  if (y > 0) {
    incrementOctopus(x, y - 1, map);
  }

  if (x > 0) {
    incrementOctopus(x - 1, y, map);
  }

  // diagonal
  if (x > 0 && y > 0) {
    incrementOctopus(x - 1, y - 1, map);
  }

  if (y > 0 && x < map[0].length - 1) {
    incrementOctopus(x + 1, y - 1, map);
  }

  if (y < map.length - 1 && x > 0) {
    incrementOctopus(x - 1, y + 1, map);
  }

  if (y < map.length - 1 && x < map[0].length - 1) {
    incrementOctopus(x + 1, y + 1, map);
  }

  // Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
  map[y][x] = 0;
}

export const solution2 = (input: Input) => {
  const map = parseInput(input);

  // step
  let step = 1;
  let flashed: Map<string, boolean>;
  let flashes = 0;
  const flashesInSteps = new Map();
  while (true) {
    let localFlashes = 0;

    // First, the energy level of each octopus increases by 1.
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        map[y][x]++;
      }
    }

    // First, the energy level of each octopus increases by 1.
    // An octopus can only flash at most once per step.)
    flashed = new Map();

    let hasFlashed = 1;
    while (hasFlashed) {
      for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
          if (map[y][x] > 9 && !flashed.get(`${x}${y}`)) {
            flashed.set(`${x}${y}`, true);
            flash(x, y, map, flashed);
            localFlashes++;
            hasFlashed++;
          }
        }
      }
      hasFlashed--;
    }

    if (localFlashes === map.length * map[0].length) {
      return {
        synchronizedIn: step,
        flashesInSteps,
      };
    }

    flashes += localFlashes;
    flashesInSteps.set(step, flashes);
    step++;
  }
};
