import { solution } from "./14";

describe("⭐", () => {
  it(`Simple test`, () => {
    expect(
      solution(
        `NNCB

      CH -> B
      HH -> N
      CB -> H
      NH -> C
      HB -> C
      HC -> B
      HN -> C
      NN -> C
      BH -> H
      NC -> B
      NB -> B
      BN -> B
      BB -> N
      BC -> B
      CC -> N
      CN -> C`,
        10
      )
    ).toBe(1588);
  });

  it(`Input`, () => {
    expect(
      solution(
        `NNSOFOCNHBVVNOBSBHCB

      HN -> S
      FK -> N
      CH -> P
      VP -> P
      VV -> C
      PB -> H
      CP -> F
      KO -> P
      KN -> V
      NO -> K
      NF -> N
      CO -> P
      HO -> H
      VH -> V
      OV -> C
      VS -> F
      PK -> H
      OS -> S
      BF -> S
      SN -> P
      NK -> N
      SV -> O
      KB -> O
      ON -> O
      FN -> H
      FO -> N
      KV -> S
      CS -> C
      VO -> O
      SP -> O
      VK -> H
      KP -> S
      SK -> N
      NC -> B
      PN -> N
      HV -> O
      HS -> C
      CN -> N
      OO -> V
      FF -> B
      VC -> V
      HK -> K
      CC -> H
      BO -> H
      SC -> O
      HH -> C
      BV -> P
      OB -> O
      FC -> H
      PO -> C
      FV -> C
      BK -> F
      HB -> B
      NH -> P
      KF -> N
      BP -> H
      KK -> O
      OH -> K
      CB -> H
      CK -> C
      OK -> H
      NN -> F
      VF -> N
      SO -> K
      OP -> F
      NP -> B
      FS -> S
      SH -> O
      FP -> O
      SF -> V
      HF -> N
      KC -> K
      SB -> V
      FH -> N
      SS -> C
      BB -> C
      NV -> K
      OC -> S
      CV -> N
      HC -> P
      BC -> N
      OF -> K
      BH -> N
      NS -> K
      BN -> F
      PC -> C
      CF -> N
      HP -> F
      BS -> O
      PF -> S
      PV -> B
      KH -> K
      VN -> V
      NB -> N
      PH -> V
      KS -> B
      PP -> V
      PS -> C
      VB -> N
      FB -> N`,
        10
      )
    ).toBe(3906);
  });
});

describe.skip("⭐⭐", () => {
  it.only(`Simple test`, () => {
    expect(
      solution(
        `NNCB

      CH -> B
      HH -> N
      CB -> H
      NH -> C
      HB -> C
      HC -> B
      HN -> C
      NN -> C
      BH -> H
      NC -> B
      NB -> B
      BN -> B
      BB -> N
      BC -> B
      CC -> N
      CN -> C`,
        10
      )
    ).toBe(1588);
  });

  it.skip(`Input`, () => {
    expect(
      solution(
        `NNSOFOCNHBVVNOBSBHCB

      HN -> S
      FK -> N
      CH -> P
      VP -> P
      VV -> C
      PB -> H
      CP -> F
      KO -> P
      KN -> V
      NO -> K
      NF -> N
      CO -> P
      HO -> H
      VH -> V
      OV -> C
      VS -> F
      PK -> H
      OS -> S
      BF -> S
      SN -> P
      NK -> N
      SV -> O
      KB -> O
      ON -> O
      FN -> H
      FO -> N
      KV -> S
      CS -> C
      VO -> O
      SP -> O
      VK -> H
      KP -> S
      SK -> N
      NC -> B
      PN -> N
      HV -> O
      HS -> C
      CN -> N
      OO -> V
      FF -> B
      VC -> V
      HK -> K
      CC -> H
      BO -> H
      SC -> O
      HH -> C
      BV -> P
      OB -> O
      FC -> H
      PO -> C
      FV -> C
      BK -> F
      HB -> B
      NH -> P
      KF -> N
      BP -> H
      KK -> O
      OH -> K
      CB -> H
      CK -> C
      OK -> H
      NN -> F
      VF -> N
      SO -> K
      OP -> F
      NP -> B
      FS -> S
      SH -> O
      FP -> O
      SF -> V
      HF -> N
      KC -> K
      SB -> V
      FH -> N
      SS -> C
      BB -> C
      NV -> K
      OC -> S
      CV -> N
      HC -> P
      BC -> N
      OF -> K
      BH -> N
      NS -> K
      BN -> F
      PC -> C
      CF -> N
      HP -> F
      BS -> O
      PF -> S
      PV -> B
      KH -> K
      VN -> V
      NB -> N
      PH -> V
      KS -> B
      PP -> V
      PS -> C
      VB -> N
      FB -> N`,
        10
      )
    ).toBe(3906);
  });
});
