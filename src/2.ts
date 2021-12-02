type Input = string;

type Instruction = ["forward" | "down" | "up", number];

type Program = (instructions: Array<Instruction>) => readonly [number, number];

function parseInput(input: Input) {
  return input
    .split("\n")
    .map((instr) => instr.trim().split(" "))
    .map(([instruction, steps]) => [
      instruction,
      Number(steps),
    ]) as Array<Instruction>;
}

const program1: Program = (instructions: Array<Instruction>) => {
  let horizontalPosition = 0;
  let depthPosition = 0;

  for (let [instruction, steps] of instructions) {
    switch (instruction) {
      case "down": {
        depthPosition = depthPosition + steps;
        break;
      }
      case "up": {
        depthPosition = depthPosition - steps;
        break;
      }
      case "forward": {
        horizontalPosition = horizontalPosition + steps;
        break;
      }
      default:
        throw Error("Wrong instruction");
    }
  }

  return [horizontalPosition, depthPosition] as const;
};

const program2: Program = (instructions: Array<Instruction>) => {
  let horizontalPosition = 0;
  let depthPosition = 0;
  let aim = 0;

  for (let [instruction, steps] of instructions) {
    switch (instruction) {
      case "down": {
        aim = aim + steps;
        break;
      }
      case "up": {
        aim = aim - steps;
        break;
      }
      case "forward": {
        horizontalPosition = horizontalPosition + steps;
        depthPosition = depthPosition + aim * steps;
        break;
      }
      default:
        throw Error("Wrong instruction");
    }
  }

  return [horizontalPosition, depthPosition] as const;
};

export const getResult = (input: Input, program: Program) => {
  const instructions = parseInput(input);

  const [horizontalPosition, depthPosition] = program(instructions);

  return horizontalPosition * depthPosition;
};

export const solution = (input: Input) => getResult(input, program1);

export const solution2 = (input: Input) => getResult(input, program2);
