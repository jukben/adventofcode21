type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map(Number);
}

function countLargerThanPrevious(measurements: Array<number>) {
  return measurements.filter((measurement, index, arr) => {
    return measurement > arr[index - 1];
  }).length;
}

function getWindowedMeasurement(numbers: Array<number>) {
  // get three window slice
  const getSumOfThreeMeasurementSlidingWindow = (
    index: number,
    numbers: Array<number>
  ) => {
    if (index + 2 < numbers.length) {
      return numbers[index] + numbers[index + 1] + numbers[index + 2];
    }

    return NaN;
  };

  return numbers.map((_, index, arr) =>
    getSumOfThreeMeasurementSlidingWindow(index, arr)
  );
}

export const solution = (input: Input) => {
  const numbers = parseInput(input);

  return countLargerThanPrevious(numbers);
};

export const solution2 = (input: Input) => {
  const numbers = parseInput(input);

  return countLargerThanPrevious(getWindowedMeasurement(numbers));
};
