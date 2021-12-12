type Input = string;

function parseInput(input: Input) {
  return input.split("\n").map((a) => a.trim().split("-"));
}

function createGraph(input: Input) {
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
    specialSmallCave = null as string | null
  ) {
    const { id, links } = nodes[from];

    if (id === "end") {
      paths.push([...visited, "end"]);
      return paths;
    }

    if (
      id !== "start" &&
      visited.filter((v) => v === id).length >
        (specialSmallCave === id ? 1 : 0) &&
      id.toLowerCase() === id
    ) {
      return paths;
    }

    visited.push(id);

    for (let link of links) {
      if (link.id === "start") {
        continue;
      }

      traverse(link.id, [...visited], specialSmallCave);
    }

    return paths;
  }

  return { nodes, traverse };
}

export const solution = (input: Input) => {
  const { traverse } = createGraph(input);

  const paths = traverse();

  return paths.length;
};

export const solution2 = (input: Input) => {
  const { nodes, traverse } = createGraph(input);
  let paths = [] as Array<Array<string>>;

  // After reviewing the available paths, you realize you might have time to visit a single small cave twice.
  // Specifically, big caves can be visited any number of times, a single small cave can be visited at most twice,
  // and the remaining small caves can be visited at most once.
  const uniqueSmallCaves = [...new Set(Object.keys(nodes))];
  for (let smallCaveTwice of uniqueSmallCaves) {
    paths = paths.concat(traverse("start", [], smallCaveTwice));
  }

  // remove duplicate paths
  return [...new Set(paths.map((a) => a.join(",")))].length;
};
