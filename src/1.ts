type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map(Number);
}

function countLargerThanPrevious(sums: Array<Number>) {
  return sums.reduce(
    ({ largerMeasurements, previous }, currentValue) => {
      return {
        largerMeasurements:
          previous < currentValue ? largerMeasurements + 1 : largerMeasurements,
        previous: currentValue,
      };
    },
    { largerMeasurements: 0, previous: sums[0] }
  ).largerMeasurements;
}

function getWindowedMeasurement(numbers: Array<number>) {
  const getSumOfThreeMeasurementSlidingWindow = (
    index: number,
    numbers: Array<number>
  ) => {
    if (index + 2 < numbers.length) {
      return numbers[index] + numbers[index + 1] + numbers[index + 2];
    }

    return null;
  };

  return numbers
    .map((_, index, arr) => getSumOfThreeMeasurementSlidingWindow(index, arr))
    .filter((sum) => sum !== null) as Array<number>;
}

export const solution = (input: Input) => {
  const numbers = parseInput(input);

  return countLargerThanPrevious(numbers);
};

export const solution2 = (input: Input) => {
  const numbers = parseInput(input);

  const moreAccurateMeasuring = getWindowedMeasurement(numbers);

  return countLargerThanPrevious(moreAccurateMeasuring);
};
