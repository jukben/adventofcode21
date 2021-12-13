type Input = string;

function parseInput(input: Input) {
  const i = input.split("\n").map((a) => a.trim());

  const delimiter = i.findIndex((a) => a === "");

  // y, x
  const foldInstruction = i.slice(delimiter + 1, i.length).map((a) => {
    const b = a.split("=");
    return [b[0][b[0].length - 1], Number(b[1])] as ["x" | "y", number];
  });

  const dots = i
    .slice(0, delimiter)
    .map((a) => a.split(",").map((a) => Number(a)));

  return {
    dots,
    foldInstruction,
    sizeOfPaper: {
      x: Math.max(
        ...dots.flatMap((a) => {
          return a[0];
        }, [])
      ),
      y: Math.max(
        ...dots.flatMap((a) => {
          return a[1];
        }, [])
      ),
    },
  };
}

export const solution = (input: Input) => {
  const { sizeOfPaper, dots, foldInstruction } = parseInput(input);

  // prepare world
  let world = [] as Array<Array<"." | "#">>;
  for (let y = 0; y <= sizeOfPaper.y; y++) {
    for (let x = 0; x <= sizeOfPaper.x; x++) {
      if (!world[y]) world[y] = [];
      world[y][x] = ".";
    }
  }

  // draw starting dots
  for (let [x, y] of dots) {
    world[y][x] = "#";
  }

  // to save progress of folding
  const folds = [];

  let oldWorld = world;
  for (let [axis, number] of foldInstruction) {
    world = [];

    if (axis === "y") {
      for (let y = 0; y < number; y++) {
        for (let x = 0; x < oldWorld[0].length; x++) {
          if (!world[y]) world[y] = [];

          if (oldWorld[oldWorld.length - 1 - y][x] === "#") {
            world[y][x] = oldWorld[oldWorld.length - 1 - y][x];
          } else {
            world[y][x] = oldWorld[y][x];
          }
        }
      }
    }

    if (axis === "x") {
      for (let y = 0; y < oldWorld.length; y++) {
        for (let x = 0; x < number; x++) {
          if (!world[y]) world[y] = [];

          if (oldWorld[y][oldWorld[0].length - 1 - x] === "#") {
            world[y][x] = oldWorld[y][oldWorld[0].length - 1 - x];
          } else {
            world[y][x] = oldWorld[y][x];
          }
        }
      }
    }

    oldWorld = world;
    folds.push(world);
  }

  return {
    firstFold: folds[0]
      .flatMap((a) => a.filter((b) => b === "#").length)
      .reduce((a, v) => a + v, 0),
    result: folds[folds.length - 1].map((a) => a.join("")).join("\n"),
  };
};
