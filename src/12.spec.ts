import { solution, solution2 } from "./12";

describe("⭐", () => {
  it(`Simple test`, () => {
    expect(
      solution(`start-A
      start-b
      A-c
      A-b
      b-d
      A-end
      b-end`)
    ).toBe(10);
  });

  it(`Simple test 2`, () => {
    expect(
      solution(`dc-end
      HN-start
      start-kj
      dc-start
      dc-HN
      LN-dc
      HN-end
      kj-sa
      kj-HN
      kj-dc`)
    ).toBe(19);
  });

  it(`Simple test 3`, () => {
    expect(
      solution(`fs-end
      he-DX
      fs-he
      start-DX
      pj-DX
      end-zg
      zg-sl
      zg-pj
      pj-he
      RW-he
      fs-DX
      pj-RW
      zg-RW
      start-pj
      he-WI
      zg-he
      pj-fs
      start-RW`)
    ).toBe(226);
  });

  it(`Input`, () => {
    expect(
      solution(`qi-UD
      jt-br
      wb-TF
      VO-aa
      UD-aa
      br-end
      end-HA
      qi-br
      br-HA
      UD-start
      TF-qi
      br-hf
      VO-hf
      start-qi
      end-aa
      hf-HA
      hf-UD
      aa-hf
      TF-hf
      VO-start
      wb-aa
      UD-wb
      KX-wb
      qi-VO
      br-TF`)
    ).toBe(3856);
  });
});

describe("⭐⭐", () => {
  it(`Simple test`, () => {
    expect(
      solution2(`start-A
      start-b
      A-c
      A-b
      b-d
      A-end
      b-end`)
    ).toBe(36);
  });

  it(`Simple test 2`, () => {
    expect(
      solution2(`dc-end
      HN-start
      start-kj
      dc-start
      dc-HN
      LN-dc
      HN-end
      kj-sa
      kj-HN
      kj-dc`)
    ).toBe(103);
  });

  it(`Input`, () => {
    expect(
      solution2(`qi-UD
      jt-br
      wb-TF
      VO-aa
      UD-aa
      br-end
      end-HA
      qi-br
      br-HA
      UD-start
      TF-qi
      br-hf
      VO-hf
      start-qi
      end-aa
      hf-HA
      hf-UD
      aa-hf
      TF-hf
      VO-start
      wb-aa
      UD-wb
      KX-wb
      qi-VO
      br-TF`)
    ).toBe(116692);
  });
});
