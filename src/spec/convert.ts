import type { AuthoringSpec, Rule } from "./authoringTypes";

export function toDraft(spec: AuthoringSpec): Record<string, unknown> {
  // Shallow clean to drop undefineds while preserving shape
  const clean = JSON.parse(JSON.stringify(spec)) as AuthoringSpec;

  const rules: Rule[] = Array.isArray(clean.behavior?.rules)
    ? (clean.behavior.rules as Rule[])
    : [];

  return {
    identity: clean.identity ?? {},
    table: clean.table ?? {},
    profiles: Array.isArray(clean.profiles) ? clean.profiles : [],
    behavior: {
      schema_version: "1.0",
      rules: rules.map((r: Rule) => ({
        id: r.id,
        when: r.when,
        then: r.then,
        cooldown: r.cooldown ?? undefined,
        scope: r.scope ?? undefined,
        guards: r.guards ?? undefined,
      })),
    },
  };
}
