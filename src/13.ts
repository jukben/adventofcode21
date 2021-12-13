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

  const getMax = (n: "x" | "y") => {
    const map = {
      x: 0,
      y: 1,
    } as const;

    return Math.max(
      ...dots.flatMap((a) => {
        return a[map[n]];
      }, [])
    );
  };

  return {
    dots,
    foldInstruction,
    sizeOfPaper: {
      x: getMax("x"),
      y: getMax("y"),
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

    // fold configuration
    const configuration = {
      y: {
        toY: number,
        toX: oldWorld[0].length,
        foldY: (y: number) => oldWorld.length - 1 - y,
        foldX: (x: number) => x,
      },
      x: {
        toY: oldWorld.length,
        toX: number,
        foldY: (y: number) => y,
        foldX: (x: number) => oldWorld[0].length - 1 - x,
      },
    } as const;

    const { foldX, foldY, toX, toY } = configuration[axis];
    for (let y = 0; y < toY; y++) {
      for (let x = 0; x < toX; x++) {
        if (!world[y]) world[y] = [];

        if (oldWorld[foldY(y)][foldX(x)] === "#") {
          world[y][x] = oldWorld[foldY(y)][foldX(x)];
        } else {
          world[y][x] = oldWorld[y][x];
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
