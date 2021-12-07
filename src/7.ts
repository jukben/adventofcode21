type Input = string;

function parseInput(input: Input) {
  return input.split(",").map(Number);
}

function calculateFuelConsumption(steps: number) {
  return ((steps + 1) / 2) * steps;
}

export const solution = (input: Input, advanced = false) => {
  const crabs = parseInput(input);
  // optimization?
  const positionsToTryAlignment = Array.from(
    { length: Math.max(...crabs) + 1 },
    (_, i) => i
  );

  const fuelConsumption = new Map(positionsToTryAlignment.map((a) => [a, 0]));

  for (const position of positionsToTryAlignment) {
    for (const crab of crabs) {
      const steps = Math.abs(position - crab);
      const fuelConsumed = advanced ? calculateFuelConsumption(steps) : steps;
      const fuelConsumedSoFar = fuelConsumption.get(position)!;
      fuelConsumption.set(position, fuelConsumedSoFar + fuelConsumed);
    }
  }

  return Math.min(...fuelConsumption.values());
};
