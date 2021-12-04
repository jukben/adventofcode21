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

  function getBinaryNumber(
    report: Array<string>,
    comparator: (re: Record<number, Array<"0" | "1">>, bit: number) => "0" | "1"
  ) {
    let bitToLookFor = 0;

    while (report.length > 1) {
      const analyzedReport = report.reduce((acc, curr, index, arr) => {
        for (let i = 0; i < arr[index].length; i++) {
          const b = arr[index][i] as "0" | "1";
          acc[i] = acc[i] ? [...acc[i], b] : [b];
        }

        return acc;
      }, {} as Record<number, Array<"0" | "1">>);

      report = report.filter((value) => {
        return value[bitToLookFor] === comparator(analyzedReport, bitToLookFor);
      });
      bitToLookFor++;
    }

    return report[0];
  }

  const oxygenGeneratorRating = getBinaryNumber(
    report,
    (re: Record<number, Array<"0" | "1">>, bit: number) =>
      re[bit].filter((b) => b === "1").length >=
      re[bit].filter((b) => b === "0").length
        ? "1"
        : "0"
  );

  const cO2scrubberRating = getBinaryNumber(
    report,
    (re: Record<number, Array<"0" | "1">>, bit: number) =>
      re[bit].filter((b) => b === "1").length <
      re[bit].filter((b) => b === "0").length
        ? "1"
        : "0"
  );

  return parseInt(oxygenGeneratorRating, 2) * parseInt(cO2scrubberRating, 2);
};
