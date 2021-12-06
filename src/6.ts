type Input = string;

function parseInput(input: Input) {
  return input.split(",").map(Number);
}

/**
 * This rotating array algorithm acting as a cache is learned from Thibpat. Great idea!
 * @see https://www.youtube.com/watch?v=-ihdC-AKqPM
 */
export const solution = (input: Input, daysToSimulate: number) => {
  const days = parseInput(input).reduce((day, fish) => {
    day[fish]++;
    return day;
  }, new Array(9).fill(0));

  for (let day = 0; day < daysToSimulate; day++) {
    days.push(days.shift());
    days[6] += days[days.length - 1];
  }

  return days.reduce((sum, day) => sum + day, 0);
};
