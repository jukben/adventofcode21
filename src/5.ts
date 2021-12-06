type Input = string;

type LineCoords = [[number, number], [number, number]];

function parseInput(input: Input) {
  return input.split("\n").reduce((acc, curr, index) => {
    acc.push(
      curr
        .split("->")
        .map((a) => a.split(",").map((n) => parseInt(n, 10))) as LineCoords
    );
    return acc;
  }, [] as Array<LineCoords>);
}

export function createMap(input: Input) {
  const inputLines = parseInput(input);

  const sizeOfWorld =
    Math.max(...(inputLines.flat(2) as unknown as Array<number>)) + 1;

  const map = Array.from({ length: sizeOfWorld * sizeOfWorld }, () => 0);

  function getPoint(x: number, y: number) {
    if (map[sizeOfWorld * y + x] === undefined) {
      throw Error(`out of bound (${x}, ${y})`);
    }

    return map[sizeOfWorld * y + x];
  }

  function drawPoint(x: number, y: number) {
    map[sizeOfWorld * y + x] = getPoint(x, y) + 1;
  }

  function drawLine(x1: number, y1: number, x2: number, y2: number) {
    // meh, this is dirty...
    const isDiagonal = x1 !== x2 && y1 !== y2;

    if (isDiagonal) {
      const dx = x2 - x1;
      const dy = y2 - y1;

      let nx = undefined;
      let ny = undefined;

      for (let x = 0; x < Math.abs(dx) + 1; x++) {
        if (dx < 0) {
          nx = x2 + x;
        } else {
          nx = x2 - x;
        }

        if (dy < 0) {
          ny = y2 + x;
        } else {
          ny = y2 - x;
        }

        drawPoint(nx, ny);
      }
    } else {
      const [_x1, _x2] = [x1, x2].sort((a, b) => a - b);
      const [_y1, _y2] = [y1, y2].sort((a, b) => a - b);

      for (let x = _x1; x <= _x2; x++) {
        for (let y = _y1; y <= _y2; y++) {
          drawPoint(x, y);
        }
      }
    }
  }

  function printDiagram() {
    return map
      .reduce((acc, curr, index) => {
        if (index % sizeOfWorld === 0) {
          acc.push([curr]);
        } else {
          acc[acc.length - 1].push(curr);
        }
        return acc;
      }, [] as Array<Array<number>>)
      .map((a) => a.join(""))
      .join("\n");
  }

  return {
    inputLines,
    map,
    getPoint,
    drawPoint,
    drawLine,
    printDiagram,
  };
}

export const solution = (input: Input) => {
  const { drawLine, map, inputLines, printDiagram } = createMap(input);
  for (const line of inputLines) {
    const [[x1, y1], [x2, y2]] = line;

    // For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
    if (x1 !== x2 && y1 !== y2) {
      continue;
    }

    drawLine(x1, y1, x2, y2);
  }

  const numberOfOverlaps = map.filter((x) => x >= 2).length;

  return { numberOfOverlaps, diagram: printDiagram() };
};

export const solution2 = (input: Input) => {
  const { drawLine, map, inputLines, printDiagram } = createMap(input);
  for (const line of inputLines) {
    const [[x1, y1], [x2, y2]] = line;

    drawLine(x1, y1, x2, y2);
  }

  const numberOfOverlaps = map.filter((x) => x >= 2).length;

  return { numberOfOverlaps, diagram: printDiagram() };
};
