import { difference } from "lodash";

type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map((i) =>
    i
      .trim()
      .split("|")
      .map((i) => i.trim().split(" "))
  ) as Array<[signalPatterns: Array<string>, outputValue: Array<string>]>;
}

export const solution = (input: Input) => {
  const configuration = parseInput(input)
    .map(([_, outputValue]) => outputValue)
    .flat()
    .filter((value) => [2, 3, 4, 7].includes(value.length));
  return configuration.length;
};

function getDifference(a: string, b: string) {
  const sortedA = [...a];
  const sortedB = [...b];

  const [inputA, inputB] =
    sortedA.length > sortedB.length ? [sortedA, sortedB] : [sortedB, sortedA];

  return difference(inputA, inputB);
}

/**
 * This was terrible. I have no idea what I'm doing.. but I can't do it anymore. :D 
 * 
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNNNNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMWOlcldx0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMKl;;;;:cdO0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXo;:::::;::coOXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMNxc;::::::::::;cxKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMXd:;:::::::::::::;:o0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMXd;:::::::::::::::;;,;dKWMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMOc;:::::::::::::;;;,,''c0WMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMM0c;::::::::::;;;;,,,,,'':0WMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMWNOl;:::::::;;;;,,,,,,'''''oNMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMWKkol:::::::;;;;,,,,,,''''''''cKMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMW0dc;;::::;;;;;,,,,,,,''''''''''lXWMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMXx:;:::;;;;;,,,,,,,'''''''''''''':odxk0NWMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMWKl;;;;;;;,,,,,,,,'''''''''''''',,;;::;;:lkXMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMXo,,,,,,,,,,,,,,'''''''''''''',;;::::::;;,,l0WMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMO:,,,,,,,,,'''''''''''''''',;;:::::::;;;,,,':0MMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMM0:',,:lodddoc;,''''''',,,;;:::::codxxxdoc;'',xWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMNd;:x0KXXXXXKOd:,,,;;;::::::::lxOKXXXXXK0xc,,kWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMWNX0kk0XNXOdox0XNX0o::::::::::;:lOXNX0xddOXNX0dlONWMMMMMMMMMMMMMMM
MMMMMMMMMMMMN0xoccdKNN0c.   .lKNN0d::::;;;;;;lONNXo'.  .:ONNKxllodOXWMMMMMMMMMMM
MMMMMMMMMMW0o:;::lONWKc      .lXWNkc;;;;;,,,;xXWNd.      ;0WN0o:;;;cxXMMMMMMMMMM
MMMMMMMMMNkc;::::oKNWO'       ,0WN0l,,,,,,,,:ONWX:       .xWWXd:;;,,,oXMMMMMMMMM
MMMMMMMMWOc;;;:::oKWWO'       ;KWW0c,,,,'''';kNWX:       .kWWXd;,,,,',xWMMMMMMMM
MMMMMMMMNd,,;;;;;cONWNo.     .dWWNx;'''''''',dXWWk'     .cXMW0l,,,,,''lXMMMMMMMM
MMMMMMMMNo,,,,,,,,l0WWNx;...;kNMWOc''''''',,;lONWWOc...,dXWWKo;,,,'''':0MMMMMMMM
MMMMMMMMWk;',,,,,,,lONWMNK0KNMWNOc,',,;;;;::::lOXWWWX0KNWWN0o;,'''''''cKMMMMMMMM
MMMMMMMMMNx;'''''''';oOXNWWWNXOdc;;;:::::::::::coOKNWWWNX0d:,'''''''''oXWMMMMMMM
MMMMMWX0Okdc,,,,,,,,,;:lddxdolc:::::::::::::;;;;;;:looolc;,''''''''',;:ox0NWMMMM
MMMXOdc:;;;::::::::::::::::::::::::::::::;;;;;;;;,,,,,,''''''''''',;;::;;;cxKWMM
MNOl;;::::::::::::::::::clooddddoodooooooooooooooooool:,'''''''',;;:::;;;,,,;dXM
Nx;;;;;::::::::::::::::::ok00KKKKKKKKKKKKKKKKKKKKKK0Od:,''''',;;:::::;;,,,,'''c0
k;,;;;;;;;;;;;;;;;;;;;;;;;cdOXNWWWWWWWWWWWWWWWWWNX0xl;'''',;;;:::::;;,,,,''''''l
c,,,,,,,,,,,,,,,,,,,,,,,,,,,;ldOKXNWWWWWMWWWWNX0xo:,'',,;;::::::;;;,,,,,''''''';
;',,,,,,,,,,,,,,,,,,,,,,,''''',,;clodxxkxxxdoc:,,',,;;;:::::::;;,,,,,'''''''''';
c'''',,',,,,,'''''''''''''''''''''''''''''''',,,;;;::::::::;;;,,,,,''''''''''''o
0c''''''''''''''''''''''''''''''''''''',,,,;;;::::::::::;;;,,,,'''''''''''''''lX
WKd:''''''''''''''''''''''''''''''',,,;;;;::::::::::;;;,,,,,'''''''''''''''';xXM
MMWXOdc:,,'''''''''',,;;:cc:::::::::::::::::;;;;;;,,,,'''''''''''''''',,;cokKWMM
MMMMMMWXK0OkkxxxxkOO0KKXNNNNXXXXXXXXXKKKK0000OOOkkkkxxxxxxxxxxxxxxkkOO0KXWWMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 */
export const solution2 = (input: Input) => {
  const configuration = parseInput(input);

  const mappings = configuration
    .flatMap(([signalPatterns, outputValue]) => [
      [...signalPatterns, ...outputValue],
    ])
    .map((signals) => {
      const signalsToLength = signals.reduce((acc, val) => {
        const sortedValue = val.split("").sort().join("");
        if (!acc[sortedValue.length]) {
          acc[sortedValue.length] = [sortedValue];
          return acc;
        }

        if (!acc[sortedValue.length].includes(sortedValue)) {
          acc[sortedValue.length] = [...acc[sortedValue.length], sortedValue];
        }

        return acc;
      }, {} as Record<number, Array<string>>);

      const mapping = {} as Record<number, string>;

      mapping[1] = signalsToLength[2][0];
      mapping[4] = signalsToLength[4][0];
      mapping[7] = signalsToLength[3][0];
      mapping[8] = signalsToLength[7][0];

      // 3
      for (let c of signalsToLength[5]) {
        if (getDifference(c, mapping[1]).length === 3) {
          mapping[3] = c;
        }
      }

      // 9
      for (let c of signalsToLength[6]) {
        if (getDifference(c, mapping[3]).length === 1) {
          mapping[9] = c;
        }
      }

      // 2
      for (let c of signalsToLength[5]) {
        if (c.includes(getDifference(mapping[9], mapping[8])[0])) {
          mapping[2] = c;
        }
      }

      // 0
      for (let c of signalsToLength[6]) {
        if (
          getDifference(c, mapping[7]).length === 3 &&
          !Object.values(mapping).includes(c)
        ) {
          mapping[0] = c;
        }
      }

      // 6
      for (let c of signalsToLength[6]) {
        if (
          getDifference(c, mapping[8]).length === 1 &&
          !Object.values(mapping).includes(c)
        ) {
          mapping[6] = c;
        }
      }

      // 5
      for (let c of signalsToLength[5]) {
        if (!Object.values(mapping).includes(c)) {
          mapping[5] = c;
        }
      }

      // map it as configuration -> number to easy access
      return Object.entries(mapping).reduce((acc, [index, val], i) => {
        acc[val] = index;

        return acc;
      }, {} as Record<string, string>);
    });

  return configuration.reduce((acc, [_, outputValue], index) => {
    const preparedOutput = parseInt(
      outputValue
        .map((a) => {
          const number = [...a].sort().join("");
          return mappings[index][number];
        })
        .join(""),
      10
    );

    return acc + preparedOutput;
  }, 0);
};
