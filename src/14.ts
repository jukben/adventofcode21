type Input = string;

function parseInput(input: Input) {
  const i = input.split("\n").map((a) => a.trim());

  const template = i.splice(0, 1)[0];

  // throw away empty line
  i.splice(0, 1);

  const rules = i.map((a) => a.split("->").map((a) => a.trim()));

  return {
    template,
    rules,
  };
}

export const solution = (input: Input, step = 10) => {
  const { template, rules } = parseInput(input);

  const insertionMap = rules
    .map(([template, insertion]) => {
      return [template, insertion];
    })
    .reduce((a, [rule, result]) => {
      a[rule] = result;
      return a;
    }, {} as Record<string, string>);

  let oldPolymer = [...template];
  while (step--) {
    const newPolymer = [...oldPolymer];
    let offset = 0;
    for (let i = 0; i < oldPolymer.length; i++) {
      const a = oldPolymer[i] ?? null;
      const b = oldPolymer[i + 1] ?? null;

      if (a && b) {
        const insertion = insertionMap[`${a}${b}`];
        newPolymer.splice(i + 1 + offset, 0, insertion);
        offset++;
      }
    }

    oldPolymer = newPolymer;
  }

  const occurrences = [...new Set(oldPolymer)].reduce((acc, v) => {
    acc[v] = oldPolymer.filter((a) => a === v).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    Math.max(...Object.values(occurrences)) -
    Math.min(...Object.values(occurrences))
  );
};
