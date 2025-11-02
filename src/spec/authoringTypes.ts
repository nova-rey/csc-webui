export type ID = string;

export interface Identity {
  name: string;
  version?: string;
  notes?: string;
}

export interface TableSettings {
  min_bet?: number;
  max_bet?: number;
  odds_profile?: "3-4-5x" | "1x" | "2x" | "20x" | "custom";
}

export interface BaseBet {
  kind: "place" | "come" | "don’t_come" | "pass" | "don’t_pass" | "odds";
  number?: 4 | 5 | 6 | 8 | 9 | 10;
  amount?: number;
  working_on_comeout?: boolean;
}

export interface Profile {
  id: ID;
  name: string;
  base_bets: BaseBet[];
}

export type RuleVerb = "switch_profile" | "press" | "regress" | "apply_policy";

export interface Rule {
  id: ID;
  when: string; // simple expression string (evaluated by CSC)
  then: { verb: RuleVerb; args?: Record<string, unknown> };
  cooldown?: number;
  scope?: "roll" | "hand" | "session";
  guards?: string[];
}

export interface AuthoringSpec {
  identity: Identity;
  table: TableSettings;
  profiles: Profile[];
  behavior: {
    schema_version: "1.0";
    rules: Rule[];
  };
}
