import { AuthoringSpec, Rule } from "./authoringTypes";

export function toDraft(spec: AuthoringSpec): Record<string, unknown> {
  // Minimal coercion: drop undefineds and keep keys CSC expects.
  const clean = JSON.parse(JSON.stringify(spec)) as AuthoringSpec;
  const rules: Rule[] = Array.isArray(clean.behavior?.rules) ? clean.behavior.rules : [];
  return {
    identity: clean.identity ?? {},
    table: clean.table ?? {},
    profiles: Array.isArray(clean.profiles) ? clean.profiles : [],
    behavior: {
      schema_version: "1.0",
      rules: rules.map((rule) => ({
        id: rule.id,
        when: rule.when,
        then: rule.then,
        cooldown: rule.cooldown ?? undefined,
        scope: rule.scope ?? undefined,
        guards: rule.guards ?? undefined,
      })),
    },
  };
}
