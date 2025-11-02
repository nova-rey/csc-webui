import { AuthoringSpec } from "./authoringTypes";

export const presetMolly: AuthoringSpec = {
  identity: { name: "3-Point Molly (Preset)", version: "0.1" },
  table: { min_bet: 5, max_bet: 2000, odds_profile: "3-4-5x" },
  profiles: [{ id: "prof_base", name: "Base", base_bets: [{ kind: "pass", amount: 5 }] }],
  behavior: {
    schema_version: "1.0",
    rules: [
      {
        id: "r_press_come",
        when: "point_on && come_bets_active < 2",
        then: { verb: "press", args: { target: "come", delta: 5 } },
        scope: "roll",
      },
    ],
  },
};

export const presetContraSeed: AuthoringSpec = {
  identity: { name: "ContraCruise Seed (Preset)", version: "0.1" },
  table: { min_bet: 10, max_bet: 3000, odds_profile: "3-4-5x" },
  profiles: [
    { id: "prof_contra", name: "Contra", base_bets: [{ kind: "don’t_pass", amount: 10 }] },
  ],
  behavior: {
    schema_version: "1.0",
    rules: [
      {
        id: "r_dd_regress",
        when: "drawdown > 0.15",
        then: { verb: "regress", args: { factor: 0.5 } },
        scope: "hand",
      },
    ],
  },
};

export const PRESETS = [
  { id: "molly", name: "3-Point Molly", spec: presetMolly },
  { id: "contra", name: "ContraCruise Seed", spec: presetContraSeed },
];
