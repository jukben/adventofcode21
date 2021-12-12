type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map((a) => a.trim().split("-"));
}

export const solution = (input: Input) => {
  const graphConfiguration = parseInput(input);

  type GraphNode = {
    id: string;
    links: Array<GraphNode>;
  };

  const nodes = {} as Record<string, GraphNode>;

  // configure somehow something like graph, I have no idea. I will give it hour or so and then I will study theory of graphs
  graphConfiguration.forEach(([a, b]) => {
    if (!nodes[a]) {
      nodes[a] = {
        id: a,
        links: [],
      };
    }

    if (!nodes[b]) {
      nodes[b] = {
        id: b,
        links: [],
      };
    }

    nodes[a].links.push(nodes[b]);
    nodes[b].links.push(nodes[a]);
  });

  const paths = [];

  function traverse(from: string = "start", visited = [] as Array<string>) {
    const { id, links } = nodes[from];

    if (id === "end") {
      paths.push([...visited, "end"]);
      return;
    }

    if (id !== "start" && visited.includes(id) && id.toLowerCase() === id) {
      return;
    }

    visited.push(id);

    for (let link of links) {
      if (link.id === "start") {
        continue;
      }

      traverse(link.id, [...visited]);
    }
  }

  traverse();

  return paths.length;
};

export const solution2 = (input: Input) => {
  const graphConfiguration = parseInput(input);

  type GraphNode = {
    id: string;
    links: Array<GraphNode>;
  };

  const nodes = {} as Record<string, GraphNode>;

  // configure somehow something like graph, I have no idea. I will give it hour or so and then I will study theory of graphs
  graphConfiguration.forEach(([a, b]) => {
    if (!nodes[a]) {
      nodes[a] = {
        id: a,
        links: [],
      };
    }

    if (!nodes[b]) {
      nodes[b] = {
        id: b,
        links: [],
      };
    }

    nodes[a].links.push(nodes[b]);
    nodes[b].links.push(nodes[a]);
  });

  const paths = [] as Array<Array<string>>;

  function traverse(
    from: string = "start",
    visited = [] as Array<string>,
    specialSmallCave: string
  ) {
    const { id, links } = nodes[from];

    if (id === "end") {
      paths.push([...visited, "end"]);
      return;
    }

    if (
      id !== "start" &&
      visited.filter((v) => v === id).length >
        (specialSmallCave === id ? 1 : 0) &&
      id.toLowerCase() === id
    ) {
      return;
    }

    visited.push(id);

    for (let link of links) {
      if (link.id === "start") {
        continue;
      }

      traverse(link.id, [...visited], specialSmallCave);
    }
  }

  const uniqueSmallCaves = [
    ...new Set(
      graphConfiguration
        .flatMap((a) => [...a])
        .filter((a) => !["start", "end"].includes(a) && a.toLowerCase() === a)
    ),
  ];

  for (let smallCaveTwice of uniqueSmallCaves) {
    traverse("start", [], smallCaveTwice);
  }

  return [...new Set(paths.map((a) => a.join(",")))].length;
};
