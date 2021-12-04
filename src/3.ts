type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map((instr) => instr.trim());
}

export const solution = (input: Input) => {
  const report = parseInput(input);

  const analyzedReport = report.reduce((acc, curr, index, arr) => {
    for (let i = 0; i < arr[index].length; i++) {
      const b = arr[index][i] as "0" | "1";
      acc[i] = acc[i] ? [...acc[i], b] : [b];
    }

    return acc;
  }, {} as Record<number, Array<"0" | "1">>);

  const mostSignificant = Object.entries(analyzedReport).map(
    ([_, configuration]) => {
      return configuration.filter((b) => b === "1").length >
        configuration.filter((b) => b === "0").length
        ? "1"
        : "0";
    }
  );

  const lessSignificant = [...mostSignificant].map(
    (a) => ({ "0": "1", "1": "0" }[a])
  );

  return (
    parseInt(mostSignificant.join(""), 2) *
    parseInt(lessSignificant.join(""), 2)
  );
};

export const solution2 = (input: Input) => {
  let report = parseInput(input);

  let bitToLookFor = 0;
  while (report.length > 1) {
    const analyzedReport = report.reduce((acc, curr, index, arr) => {
      for (let i = 0; i < arr[index].length; i++) {
        const b = arr[index][i] as "0" | "1";
        acc[i] = acc[i] ? [...acc[i], b] : [b];
      }

      return acc;
    }, {} as Record<number, Array<"0" | "1">>);

    const bitToCompare =
      analyzedReport[bitToLookFor].filter((b) => b === "1").length >=
      analyzedReport[bitToLookFor].filter((b) => b === "0").length
        ? "1"
        : "0";

    report = report.filter((value) => {
      return value[bitToLookFor] === bitToCompare;
    });
    bitToLookFor++;
  }

  console.log(report[0]);

  return 0;
};
