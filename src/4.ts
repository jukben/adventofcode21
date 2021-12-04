type Input = string;

export type Board = Array<{ number: number; marked: boolean }>;

function parseInput(input: Input) {
  return input.split("\n").reduce(
    (acc, curr, index) => {
      if (index === 0) {
        acc.numbers = curr.split(",").map(Number);
        return acc;
      }

      const c = curr.trim();
      if (c === "") {
        acc.boards.push([]);
        return acc;
      }

      acc.boards[acc.boards.length - 1].push(
        ...c.split(/\s+/).map((n) => ({ number: Number(n), marked: false }))
      );

      return acc;
    },
    {
      numbers: [],
      boards: [],
    } as unknown as { numbers: Array<number>; boards: Array<Board> }
  );
}

export function hasBoardWon(board: Board): {
  type: "column" | "row" | null;
  won: boolean;
  id?: number;
} {
  for (let y = 0; y < 5; y++) {
    let hasRow = true;
    let hasColumn = true;
    for (let x = 0; x < 5; x++) {
      const numberRow = board[5 * y + x];
      const numberColumn = board[5 * x + y];
      if (!numberRow.marked) {
        hasRow = false;
      }
      if (!numberColumn.marked) {
        hasColumn = false;
      }
    }

    if (hasColumn) {
      return { type: "column", id: y, won: true };
    }

    if (hasRow) {
      return { type: "row", id: y, won: true };
    }
  }

  return { type: null, won: false };
}

export function markNumber(board: Board, number: number) {
  return board.map((field) =>
    field.number === number ? { ...field, marked: true } : field
  );
}

function sumOfUnmarked(board: Board) {
  return board.reduce((acc, curr) => {
    if (curr.marked === false) {
      acc += curr.number;
    }

    return acc;
  }, 0);
}

export const solution = (input: Input) => {
  const { boards, numbers } = parseInput(input);

  let nextBoards = boards;
  for (let number of numbers) {
    nextBoards = nextBoards.map((board) => markNumber(board, number));
    for (let board of nextBoards) {
      if (hasBoardWon(board).won) {
        return sumOfUnmarked(board) * number;
      }
    }
  }

  return 0;
};

export const solution2 = (input: Input) => {
  const { boards, numbers } = parseInput(input);

  let winningBoards = new Map<number, Board>();
  let lastWinningBoardId = undefined;
  let lastWinningNumber = undefined;

  let nextBoards = boards;
  for (let number of numbers) {
    nextBoards = nextBoards.map((board) => markNumber(board, number));
    for (let boardId = 0; boardId < nextBoards.length; boardId++) {
      if (winningBoards.has(boardId)) {
        continue;
      }

      if (hasBoardWon(nextBoards[boardId]).won) {
        winningBoards.set(boardId, nextBoards[boardId]);
        lastWinningBoardId = boardId;
        lastWinningNumber = number;
      }
    }
  }

  if (!lastWinningBoardId || !lastWinningNumber) {
    throw Error("Something went wrong");
  }

  const winingBoard = winningBoards.get(lastWinningBoardId);

  if (!winingBoard) {
    throw Error("Something went terribly wrong");
  }

  return sumOfUnmarked(winingBoard) * lastWinningNumber;
};
